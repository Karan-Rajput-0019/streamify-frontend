const API_BASE = "http://localhost:5000/api";
let token = localStorage.getItem("token") || null;

// Utility for showing errors
function showError(msg) {
  const el = document.getElementById("auth-error") || document.getElementById("error") || document.body;
  el.textContent = msg || "";
}

// Show/hide auth/main
function setAuthView(visible) {
  document.getElementById("auth-page").style.display = visible ? "" : "none";
  document.getElementById("main-content").style.display = visible ? "none" : "";
}

// Login
window.handleLogin = async function (event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!data.token) return showError(data.message || "Login failed!");
  token = data.token; localStorage.setItem("token", token);
  showError("");
  setAuthView(false);
  await fetchSongs();
}

// Register
window.handleSignup = async function (event) {
  event.preventDefault();
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ username, email, password })
  });
  const data = await res.json();
  if (!data.token) return showError(data.message || "Register failed!");
  token = data.token; localStorage.setItem("token", token);
  showError("");
  setAuthView(false);
  await fetchSongs();
}

// Logout
window.handleLogout = function() {
  token = null; localStorage.removeItem("token");
  setAuthView(true);
  const musicList = document.getElementById("music-list");
  if (musicList) musicList.innerHTML = "";
}

// Fetch and render songs
async function fetchSongs() {
  const res = await fetch(`${API_BASE}/music`);
  const data = await res.json();
  renderSongs(data.songs || []);
}

// Render
function renderSongs(songs) {
  const musicList = document.getElementById("music-list");
  if (!musicList) return;
  musicList.innerHTML = songs.map(song => `
    <div class="song-item">
      <img class="song-cover" src="${song.coverImage || ''}" alt="">
      <div class="song-info">
        <div class="song-title">${song.title}</div>
        <div class="song-artist">by ${song.artist} (${song.album || ""})</div>
      </div>
      <button class="play-btn" onclick="playSong('${song.audioFile}')">Play</button>
    </div>
  `).join("");
}

// Play
window.playSong = function(url) {
  let audio = document.getElementById("mainAudio") || document.getElementById("audio-player") || document.querySelector("audio");
  if (!audio) alert("No audio player found!");
  else { audio.src = url; audio.play(); }
}

// On load: attach auth handler, show correct view
window.onload = function() {
  // Replace your onsubmit handlers if forms exist
  if (document.getElementById("login-form")) {
    document.getElementById("login-form").onsubmit = handleLogin;
  }
  if (document.getElementById("signup-form")) {
    document.getElementById("signup-form").onsubmit = handleSignup;
  }
  if (document.getElementById("logout-btn")) {
    document.getElementById("logout-btn").onclick = handleLogout;
  }

  if (token) {
    setAuthView(false);
    fetchSongs();
  } else {
    setAuthView(true);
  }
};
