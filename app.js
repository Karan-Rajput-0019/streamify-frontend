const API_BASE = "http://localhost:5000/api";
let token = localStorage.getItem("token") || null;
let userData = null, allSongs = [], playlists = [], recommendedSongs = [];

function showLogin() {
  document.getElementById("auth-section").style.display = "";
  document.getElementById("signup-section").style.display = "none";
  document.getElementById("main-content").style.display = "none";
}
function showSignup() {
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("signup-section").style.display = "";
  document.getElementById("main-content").style.display = "none";
}
function showMain() {
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("signup-section").style.display = "none";
  document.getElementById("main-content").style.display = "";
}

function showError(id, msg) { document.getElementById(id).innerText = msg || ""; }

async function fetchProfile() {
  if (!token) return;
  const res = await fetch(`${API_BASE}/users/profile`, { headers: { "Authorization": "Bearer " + token }});
  userData = await res.json();
  renderProfile(userData);
}

async function fetchRecommendations() {
  if (!token) return;
  const res = await fetch(`${API_BASE}/recommendations/for-you`, { headers: { "Authorization": "Bearer " + token }});
  const data = await res.json();
  recommendedSongs = data.songs || [];
  renderRecommendations(recommendedSongs);
}

async function login(event) {
  event.preventDefault();
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;
  let res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email, password }),
  });
  let data = await res.json();
  if (!data.token) return showError("auth-error", data.message || "Login failed");
  token = data.token; localStorage.setItem("token", token);
  showError("auth-error", "");
  showMain(); 
  await fetchProfile(); 
  await fetchRecommendations();
  loadMusic();
  loadPlaylists();
}
window.login = login;

async function signup(event) {
  event.preventDefault();
  let username = document.getElementById("signup-username").value;
  let email = document.getElementById("signup-email").value;
  let password = document.getElementById("signup-password").value;
  let res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ username, email, password }),
  });
  let data = await res.json();
  if (!data.token) return showError("signup-error", data.message || "Signup failed");
  token = data.token; localStorage.setItem("token", token);
  showError("signup-error", "");
  showMain(); 
  await fetchProfile(); 
  await fetchRecommendations();
  loadMusic();
  loadPlaylists();
}
window.signup = signup;

function logout() {
  token = null; localStorage.removeItem("token");
  showLogin();
  document.getElementById("music-list").innerHTML = "";
  document.getElementById("playlist-list").innerHTML = "";
  document.getElementById("user-profile").innerHTML = "";
  document.getElementById("recommend-list").innerHTML = "";
}
window.logout = logout;

// LOAD SONGS
async function loadMusic() {
  let res = await fetch(`${API_BASE}/music`);
  let data = await res.json();
  allSongs = data.songs || [];
  renderSongs(allSongs);
}

// LOAD RECOMMENDATIONS
function renderRecommendations(songs) {
  let html = songs.map(song => `
    <div class="song-card">
      <img class="song-cover" src="${song.coverImage || ''}" alt="">
      <div class="song-info">
        <div class="song-title">${song.title}</div>
        <div class="song-artist">by ${song.artist} (${song.album || ""})</div>
      </div>
      <div>
        <button class="btn btn--primary play-btn" onclick="playSong('${song.audioFile}')">Play</button>
        <button class="btn like-btn${userData && userData.likedSongs && userData.likedSongs.includes(song._id) ? ' liked' : ''}" onclick="toggleLike('${song._id}',this)">♥</button>
        <button class="btn add-btn" onclick="openAddModal('${song._id}')">Add to Playlist</button>
      </div>
    </div>
  `).join("");
  document.getElementById("recommend-list").innerHTML = html;
}

// LIKES
async function toggleLike(songId, btn) {
  if (!token) return alert("Login required!");
  await fetch(`${API_BASE}/music/${songId}/like`, {
    method: "POST",
    headers: { "Authorization": "Bearer " + token },
  });
  btn.classList.toggle("liked");
  await fetchProfile();
}

// SONG SEARCH
function applySongFilter() {
  const val = (document.getElementById("search-input").value + "").toLowerCase();
  if (!val) return renderSongs(allSongs);
  let filtered = allSongs.filter(song =>
    song.title.toLowerCase().includes(val) ||
    (song.artist || "").toLowerCase().includes(val) ||
    (song.album || "").toLowerCase().includes(val)
  );
  renderSongs(filtered);
}
window.applySongFilter = applySongFilter;

// RENDER SONGS w/ Add to Playlist
function renderSongs(songs) {
  let html = songs.map(song => `
    <div class="song-card">
      <img class="song-cover" src="${song.coverImage || ''}" alt="">
      <div class="song-info">
        <div class="song-title">${song.title}</div>
        <div class="song-artist">by ${song.artist} (${song.album || ""})</div>
      </div>
      <div>
        <button class="btn btn--primary play-btn" onclick="playSong('${song.audioFile}')">Play</button>
        <button class="btn like-btn${userData && userData.likedSongs && userData.likedSongs.includes(song._id) ? ' liked' : ''}" onclick="toggleLike('${song._id}',this)">♥</button>
        <button class="btn add-btn" onclick="openAddModal('${song._id}')">Add to Playlist</button>
      </div>
    </div>
  `).join("");
  document.getElementById("music-list").innerHTML = html;
}

async function loadPlaylists() {
  if (!token) return;
  let res = await fetch(`${API_BASE}/playlists/my`, {
    headers: { "Authorization": "Bearer " + token }
  });
  let data = await res.json();
  playlists = data.playlists || [];
  renderPlaylists(playlists);
}

async function createPlaylist(event) {
  event.preventDefault();
  if (!token) return alert("Login required!");
  let name = document.getElementById("playlist-name").value;
  let res = await fetch(`${API_BASE}/playlists`, {
    method: "POST",
    headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  await loadPlaylists();
  document.getElementById("playlist-name").value = "";
}

function renderPlaylists(playlists) {
  let html = playlists.map(pl => `
    <div class="playlist-card">
      <b>${pl.name}</b>
      <div>Songs: ${pl.songs.length}</div>
      <div>Created: ${new Date(pl.createdAt).toLocaleDateString()}</div>
      <button class="btn btn--secondary" onclick="viewPlaylist('${pl._id}')">View Songs</button>
    </div>
  `).join("");
  document.getElementById("playlist-list").innerHTML = html;
}

// MODAL: View playlist+songs
window.viewPlaylist = async function (playlistId) {
  let res = await fetch(`${API_BASE}/playlists/${playlistId}`, {
    headers: { "Authorization": "Bearer " + token }
  });
  let pl = await res.json();
  document.getElementById("modal-playlist-name").innerText = pl.name;
  document.getElementById("modal-songs").innerHTML = pl.songs.map((song, i) => `
    <div>
      <b>#${i+1}</b> ${song.title} <span style="color:#888;">by</span> ${song.artist}
      <button class="btn btn--primary play-btn" onclick="playSong('${song.audioFile}')">▶</button>
      <button class="btn remove-btn" onclick="removeFromPlaylist('${pl._id}','${song._id}')">Remove</button>
    </div>
  `).join("");
  document.getElementById("playlist-modal").style.display = "";
};
window.closeModal = function() {
  document.getElementById("playlist-modal").style.display = "none";
};

// MODAL: Add to playlist
window.openAddModal = function(songId) {
  if (!token) return alert("Login required!");
  if (!playlists.length) return alert("Create a playlist first!");
  document.getElementById("add-modal-list").innerHTML = playlists.map(pl => `
    <button class="btn btn--primary" onclick="addToPlaylist('${pl._id}','${songId}')">${pl.name}</button>
  `).join("");
  document.getElementById("add-modal").style.display = "";
};
window.closeAddModal = function() {
  document.getElementById("add-modal").style.display = "none";
};

window.addToPlaylist = async function(plId, songId) {
  await fetch(`${API_BASE}/playlists/${plId}/songs`, {
    method: "POST",
    headers: {"Authorization":"Bearer "+token,"Content-Type":"application/json"},
    body: JSON.stringify({ songId })
  });
  closeAddModal();
  await loadPlaylists();
};
window.removeFromPlaylist = async function(plId, songId) {
  await fetch(`${API_BASE}/playlists/${plId}/songs/${songId}`, {
    method: "DELETE",
    headers: {"Authorization":"Bearer "+token}
  });
  await viewPlaylist(plId);
  await loadPlaylists();
};

function renderProfile(user) {
  document.getElementById("user-profile").innerHTML = `
    <div>
      <span class="profile-label">User:</span>
      <span class="profile-value">${user.username}</span>
    </div>
    <div>
      <span class="profile-label">Email:</span>
      <span class="profile-value">${user.email}</span>
    </div>
    <div>
      <span class="profile-label">Type:</span>
      <span class="profile-value">${user.subscriptionType || "free"}</span>
    </div>
    <div>
      <span class="profile-label">Liked Songs:</span>
      <span class="profile-value">${user.likedSongs.length}</span>
    </div>
    <div>
      <span class="profile-label">Playlists:</span>
      <span class="profile-value">${user.playlists.length}</span>
    </div>
  `;
}

window.playSong = function(url) {
  let audio = document.getElementById("audio-player");
  audio.src = url; audio.play();
};

window.onload = function() {
  document.getElementById("login-form").onsubmit = login;
  document.getElementById("signup-form").onsubmit = signup;
  document.getElementById("logout-btn").onclick = logout;
  document.getElementById("playlist-form").onsubmit = createPlaylist;
  document.getElementById("search-input").oninput = applySongFilter;
  if (token) { showMain(); fetchProfile(); fetchRecommendations(); loadMusic(); loadPlaylists(); }
  else { showLogin(); }
};
