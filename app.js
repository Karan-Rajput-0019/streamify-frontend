// ==================== DATA STRUCTURE ====================

// ========== SIMPLE HTML5 AUDIO SETUP ==========
// Using simple HTML5 audio element with working MP3 URLs!
const audio = document.getElementById('mainAudio');
let currentTime = 0;
let duration = 180;
let animationFrame = null;
let audioReady = false;
let userHasInteracted = false;

// Working audio URLs from reliable sources
const workingAudioUrls = [
  'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
  'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
  'https://www.w3schools.com/html/horse.mp3',
  'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3'
];

function getAudioUrl(songId) {
  return workingAudioUrls[songId % workingAudioUrls.length];
}

// Expanded Global Music Library
const musicLibrary = [
  // Hindi/Indian Songs
  { id: 1001, title: "Maa Tujhe Salaam", artist: "A. R. Rahman", album: "Vande Mataram", genre: "Patriotic", duration: "5:43", year: 1997, cover: "https://dummyimage.com/300x300/e74c3c/ffffff&text=Maa+Tujhe+Salaam", region: "Asia", language: "Hindi" },
  { id: 1002, title: "Tum Hi Ho", artist: "Arijit Singh", album: "Aashiqui 2", genre: "Bollywood", duration: "4:22", year: 2013, cover: "https://dummyimage.com/300x300/ff6b6b/ffffff&text=Tum+Hi+Ho", region: "Asia", language: "Hindi" },
  { id: 1003, title: "Kal Ho Naa Ho", artist: "Sonu Nigam", album: "Kal Ho Naa Ho", genre: "Bollywood", duration: "5:21", year: 2003, cover: "https://dummyimage.com/300x300/c0392b/ffffff&text=Kal+Ho+Naa+Ho", region: "Asia", language: "Hindi" },
  { id: 1004, title: "Chaiyya Chaiyya", artist: "Sukhwinder Singh & Sapna Awasthi", album: "Dil Se", genre: "Bollywood", duration: "6:28", year: 1998, cover: "https://dummyimage.com/300x300/ff6b6b/ffffff&text=Chaiyya+Chaiyya", region: "Asia", language: "Hindi" },
  { id: 1005, title: "Kun Faya Kun", artist: "A. R. Rahman, Javed Ali & Mohit Chauhan", album: "Rockstar", genre: "Sufi", duration: "7:51", year: 2011, cover: "https://dummyimage.com/300x300/c0392b/ffffff&text=Kun+Faya+Kun", region: "Asia", language: "Hindi" },
  
  // Spanish/Latin Songs
  { id: 1006, title: "Despacito", artist: "Luis Fonsi & Daddy Yankee", album: "Vida", genre: "Latin Pop", duration: "3:47", year: 2017, cover: "https://dummyimage.com/300x300/f39c12/ffffff&text=Despacito", region: "South America", language: "Spanish" },
  { id: 1007, title: "Bailando", artist: "Enrique Iglesias ft. Descemer Bueno", album: "Sex and Love", genre: "Latin Pop", duration: "4:03", year: 2014, cover: "https://dummyimage.com/300x300/e67e22/ffffff&text=Bailando", region: "Europe", language: "Spanish" },
  { id: 1008, title: "La Bamba", artist: "Ritchie Valens", album: "La Bamba", genre: "Rock and Roll", duration: "2:06", year: 1958, cover: "https://dummyimage.com/300x300/d35400/ffffff&text=La+Bamba", region: "North America", language: "Spanish" },
  { id: 1009, title: "Vivir Mi Vida", artist: "Marc Anthony", album: "3.0", genre: "Salsa", duration: "4:02", year: 2013, cover: "https://dummyimage.com/300x300/f39c12/ffffff&text=Vivir+Mi+Vida", region: "North America", language: "Spanish" },
  { id: 1010, title: "Bailamos", artist: "Enrique Iglesias", album: "Enrique", genre: "Latin Pop", duration: "3:34", year: 1999, cover: "https://dummyimage.com/300x300/e67e22/ffffff&text=Bailamos", region: "Europe", language: "Spanish" },
  
  // Korean/K-Pop Songs
  { id: 1011, title: "Gangnam Style", artist: "PSY", album: "PSY 6 (Six Rules), Part 1", genre: "K-Pop", duration: "3:39", year: 2012, cover: "https://dummyimage.com/300x300/9b59b6/ffffff&text=Gangnam+Style", region: "Asia", language: "Korean" },
  { id: 1012, title: "Dynamite", artist: "BTS", album: "BE", genre: "K-Pop", duration: "3:19", year: 2020, cover: "https://dummyimage.com/300x300/8e44ad/ffffff&text=Dynamite", region: "Asia", language: "English" },
  { id: 1013, title: "Kill This Love", artist: "BLACKPINK", album: "Kill This Love", genre: "K-Pop", duration: "3:13", year: 2019, cover: "https://dummyimage.com/300x300/7d3c98/ffffff&text=Kill+This+Love", region: "Asia", language: "Korean" },
  { id: 1014, title: "DDU-DU DDU-DU", artist: "BLACKPINK", album: "Square Up", genre: "K-Pop", duration: "3:29", year: 2018, cover: "https://dummyimage.com/300x300/9b59b6/ffffff&text=DDU-DU+DDU-DU", region: "Asia", language: "Korean" },
  { id: 1015, title: "Love Scenario", artist: "iKON", album: "Return", genre: "K-Pop", duration: "3:35", year: 2018, cover: "https://dummyimage.com/300x300/8e44ad/ffffff&text=Love+Scenario", region: "Asia", language: "Korean" },
  
  // French Songs
  { id: 1016, title: "La Vie en Rose", artist: "Édith Piaf", album: "Chansons Parisiennes", genre: "Chanson", duration: "3:07", year: 1946, cover: "https://dummyimage.com/300x300/3498db/ffffff&text=La+Vie+en+Rose", region: "Europe", language: "French" },
  { id: 1017, title: "Non, je ne regrette rien", artist: "Édith Piaf", album: "Non, je ne regrette rien", genre: "Chanson", duration: "2:13", year: 1960, cover: "https://dummyimage.com/300x300/2980b9/ffffff&text=Non+je+ne+regrette", region: "Europe", language: "French" },
  { id: 1018, title: "Tous les mêmes", artist: "Stromae", album: "Racine carrée", genre: "Electronic", duration: "3:35", year: 2013, cover: "https://dummyimage.com/300x300/f1c40f/ffffff&text=Tous+les+memes", region: "Europe", language: "French" },
  { id: 1019, title: "Papaoutai", artist: "Stromae", album: "Racine carrée", genre: "Electronic", duration: "3:52", year: 2013, cover: "https://dummyimage.com/300x300/f39c12/ffffff&text=Papaoutai", region: "Europe", language: "French" },
  { id: 1020, title: "Dernière Danse", artist: "Indila", album: "Mini World", genre: "Pop", duration: "3:35", year: 2014, cover: "https://dummyimage.com/300x300/e67e22/ffffff&text=Derniere+Danse", region: "Europe", language: "French" },
  
  // English Songs - Global
  { id: 1021, title: "Shape of You", artist: "Ed Sheeran", album: "÷ (Divide)", genre: "Pop", duration: "3:53", year: 2017, cover: "https://dummyimage.com/300x300/3498db/ffffff&text=Shape+of+You", region: "Europe", language: "English" },
  { id: 1022, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", genre: "Pop", duration: "3:22", year: 2019, cover: "https://dummyimage.com/300x300/2980b9/ffffff&text=Blinding+Lights", region: "North America", language: "English" },
  { id: 1023, title: "Someone Like You", artist: "Adele", album: "21", genre: "Pop", duration: "4:45", year: 2011, cover: "https://dummyimage.com/300x300/1abc9c/ffffff&text=Someone+Like+You", region: "Europe", language: "English" },
  { id: 1024, title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", genre: "Rock", duration: "5:55", year: 1975, cover: "https://dummyimage.com/300x300/34495e/ffffff&text=Bohemian+Rhapsody", region: "Europe", language: "English" },
  { id: 1025, title: "Hotel California", artist: "Eagles", album: "Hotel California", genre: "Rock", duration: "6:30", year: 1976, cover: "https://dummyimage.com/300x300/2c3e50/ffffff&text=Hotel+California", region: "North America", language: "English" },
  
  // Japanese Songs
  { id: 1026, title: "Sukiyaki", artist: "Kyu Sakamoto", album: "Sukiyaki and Other Japanese Hits", genre: "J-Pop", duration: "2:44", year: 1961, cover: "https://dummyimage.com/300x300/7f8c8d/ffffff&text=Sukiyaki", region: "Asia", language: "Japanese" },
  { id: 1027, title: "Pretender", artist: "Official HIGE DANdism", album: "Traveler", genre: "J-Pop", duration: "5:33", year: 2019, cover: "https://dummyimage.com/300x300/95a5a6/ffffff&text=Pretender", region: "Asia", language: "Japanese" },
  { id: 1028, title: "Lemon", artist: "Kenshi Yonezu", album: "Lemon", genre: "J-Pop", duration: "4:15", year: 2018, cover: "https://dummyimage.com/300x300/bdc3c7/ffffff&text=Lemon", region: "Asia", language: "Japanese" },
  { id: 1029, title: "Unravel", artist: "TK from Ling tosite sigure", album: "Unravel", genre: "Rock", duration: "4:02", year: 2014, cover: "https://dummyimage.com/300x300/7f8c8d/ffffff&text=Unravel", region: "Asia", language: "Japanese" },
  { id: 1030, title: "Gurenge", artist: "LiSA", album: "Gurenge", genre: "Rock", duration: "3:58", year: 2019, cover: "https://dummyimage.com/300x300/34495e/ffffff&text=Gurenge", region: "Asia", language: "Japanese" },
  
  // Arabic Songs
  { id: 1031, title: "Habibi Ya Nour El Ain", artist: "Amr Diab", album: "Nour El Ain", genre: "Arabic Pop", duration: "4:37", year: 1996, cover: "https://picsum.photos/300x300/ffcc33/ffffff?text=HYN", region: "Africa", language: "Arabic" },
  { id: 1032, title: "3 Daqat", artist: "Abu ft. Yousra", album: "3 Daqat", genre: "Arabic Pop", duration: "3:31", year: 2017, cover: "https://picsum.photos/300x300/ffdd33/ffffff?text=3D", region: "Africa", language: "Arabic" },
  { id: 1033, title: "Ana W Leila", artist: "Amr Diab", album: "Banadeek Ta3ala", genre: "Arabic Pop", duration: "4:18", year: 2017, cover: "https://picsum.photos/300x300/ffee33/ffffff?text=AWL", region: "Africa", language: "Arabic" },
  { id: 1034, title: "Tamally Maak", artist: "Amr Diab", album: "Tamally Maak", genre: "Arabic Pop", duration: "5:16", year: 2000, cover: "https://picsum.photos/300x300/ffff33/ffffff?text=TM", region: "Africa", language: "Arabic" },
  { id: 1035, title: "Ahwak", artist: "Abdel Halim Hafez", album: "Classic Songs", genre: "Arabic Classical", duration: "6:42", year: 1960, cover: "https://picsum.photos/300x300/ffcc44/ffffff?text=AHK", region: "Africa", language: "Arabic" },
  
  // Mandarin Songs
  { id: 1036, title: "The Moon Represents My Heart", artist: "Teresa Teng", album: "Island Love Songs No. 3", genre: "Mandopop", duration: "3:12", year: 1977, cover: "https://picsum.photos/300x300/ff5555/ffffff?text=TMR", region: "Asia", language: "Mandarin" },
  { id: 1037, title: "Little Apple", artist: "Chopstick Brothers", album: "Old Boys: The Way of the Dragon", genre: "Mandopop", duration: "3:33", year: 2014, cover: "https://picsum.photos/300x300/ff6655/ffffff?text=LA", region: "Asia", language: "Mandarin" },
  { id: 1038, title: "Big Fish", artist: "Zhou Shen", album: "Big Fish & Begonia OST", genre: "Mandopop", duration: "4:14", year: 2016, cover: "https://picsum.photos/300x300/ff7755/ffffff?text=BF", region: "Asia", language: "Mandarin" },
  { id: 1039, title: "Nunchucks", artist: "Jay Chou", album: "Fantasy", genre: "Mandopop", duration: "3:17", year: 2001, cover: "https://picsum.photos/300x300/ff8855/ffffff?text=NC", region: "Asia", language: "Mandarin" },
  { id: 1040, title: "Love Transfer", artist: "Eason Chan", album: "What's Going On...?", genre: "Cantopop", duration: "3:55", year: 2007, cover: "https://picsum.photos/300x300/ff9955/ffffff?text=LT", region: "Asia", language: "Mandarin" },
  
  // Russian Songs
  { id: 1041, title: "Kalinka", artist: "Ivan Larionov", album: "Russian Folk Songs", genre: "Folk", duration: "3:24", year: 1860, cover: "https://picsum.photos/300x300/dd3333/ffffff?text=KLK", region: "Europe", language: "Russian" },
  { id: 1042, title: "Moscow Nights", artist: "Vladimir Troshin", album: "Soviet Songs", genre: "Romance", duration: "3:18", year: 1956, cover: "https://picsum.photos/300x300/dd4433/ffffff?text=MN", region: "Europe", language: "Russian" },
  { id: 1043, title: "Million Roses", artist: "Alla Pugacheva", album: "Million Roses", genre: "Pop", duration: "4:32", year: 1982, cover: "https://picsum.photos/300x300/dd5533/ffffff?text=MR", region: "Europe", language: "Russian" },
  { id: 1044, title: "Gruppa Krovi", artist: "Kino", album: "Gruppa Krovi", genre: "Rock", duration: "4:46", year: 1988, cover: "https://picsum.photos/300x300/dd6633/ffffff?text=GK", region: "Europe", language: "Russian" },
  { id: 1045, title: "Lyubov Pokhozha na Son", artist: "Bi-2", album: "Inomarki", genre: "Rock", duration: "4:12", year: 2004, cover: "https://picsum.photos/300x300/dd7733/ffffff?text=LPS", region: "Europe", language: "Russian" },
  
  // German Songs
  { id: 1046, title: "99 Luftballons", artist: "Nena", album: "Nena", genre: "New Wave", duration: "3:52", year: 1983, cover: "https://picsum.photos/300x300/33aa33/ffffff?text=99L", region: "Europe", language: "German" },
  { id: 1047, title: "Du Hast", artist: "Rammstein", album: "Sehnsucht", genre: "Industrial Metal", duration: "3:54", year: 1997, cover: "https://picsum.photos/300x300/44aa33/ffffff?text=DH", region: "Europe", language: "German" },
  { id: 1048, title: "Atemlos durch die Nacht", artist: "Helene Fischer", album: "Farbenspiel", genre: "Schlager", duration: "3:45", year: 2013, cover: "https://picsum.photos/300x300/55aa33/ffffff?text=ADN", region: "Europe", language: "German" },
  { id: 1049, title: "Auf uns", artist: "Andreas Bourani", album: "Hey", genre: "Pop", duration: "3:50", year: 2014, cover: "https://picsum.photos/300x300/66aa33/ffffff?text=AU", region: "Europe", language: "German" },
  { id: 1050, title: "Major Tom", artist: "Peter Schilling", album: "Error in the System", genre: "New Wave", duration: "4:54", year: 1983, cover: "https://picsum.photos/300x300/77aa33/ffffff?text=MT", region: "Europe", language: "German" },
  
  // Portuguese Songs (Brazil)
  { id: 1051, title: "Mas Que Nada", artist: "Sérgio Mendes & Brasil '66", album: "Herb Alpert Presents", genre: "Bossa Nova", duration: "2:35", year: 1966, cover: "https://picsum.photos/300x300/3399ff/ffffff?text=MQN", region: "South America", language: "Portuguese" },
  { id: 1052, title: "Garota de Ipanema", artist: "Antônio Carlos Jobim", album: "Getz/Gilberto", genre: "Bossa Nova", duration: "5:26", year: 1964, cover: "https://picsum.photos/300x300/4499ff/ffffff?text=GDI", region: "South America", language: "Portuguese" },
  { id: 1053, title: "Evidências", artist: "Chitãozinho & Xororó", album: "Cowboy do Asfalto", genre: "Sertanejo", duration: "4:50", year: 1990, cover: "https://picsum.photos/300x300/5599ff/ffffff?text=EVD", region: "South America", language: "Portuguese" },
  { id: 1054, title: "Aquarela do Brasil", artist: "Ary Barroso", album: "Classic Samba", genre: "Samba", duration: "3:47", year: 1939, cover: "https://picsum.photos/300x300/6699ff/ffffff?text=ADB", region: "South America", language: "Portuguese" },
  { id: 1055, title: "Ai Se Eu Te Pego", artist: "Michel Teló", album: "Michel na Balada", genre: "Sertanejo", duration: "2:54", year: 2011, cover: "https://picsum.photos/300x300/7799ff/ffffff?text=ASETP", region: "South America", language: "Portuguese" },
  
  // Italian Songs
  { id: 1056, title: "Volare", artist: "Domenico Modugno", album: "Nel Blu Dipinto Di Blu", genre: "Pop", duration: "3:31", year: 1958, cover: "https://picsum.photos/300x300/cc5599/ffffff?text=VLR", region: "Europe", language: "Italian" },
  { id: 1057, title: "Con te partirò", artist: "Andrea Bocelli", album: "Romanza", genre: "Opera Pop", duration: "4:28", year: 1995, cover: "https://picsum.photos/300x300/dd5599/ffffff?text=CTP", region: "Europe", language: "Italian" },
  { id: 1058, title: "Gloria", artist: "Umberto Tozzi", album: "Tu", genre: "Pop", duration: "4:53", year: 1979, cover: "https://picsum.photos/300x300/ee5599/ffffff?text=GLR", region: "Europe", language: "Italian" },
  { id: 1059, title: "L'Italiano", artist: "Toto Cutugno", album: "L'Italiano", genre: "Pop", duration: "4:27", year: 1983, cover: "https://picsum.photos/300x300/ff5599/ffffff?text=LITL", region: "Europe", language: "Italian" },
  { id: 1060, title: "Ti Amo", artist: "Umberto Tozzi", album: "Ti Amo", genre: "Pop", duration: "4:32", year: 1977, cover: "https://picsum.photos/300x300/ff6699/ffffff?text=TA", region: "Europe", language: "Italian" },
  
  // Turkish Songs
  { id: 1061, title: "Unutamadım", artist: "Sezen Aksu", album: "Sezen Aksu'88", genre: "Turkish Pop", duration: "4:18", year: 1988, cover: "https://picsum.photos/300x300/aa33cc/ffffff?text=UTM", region: "Asia", language: "Turkish" },
  { id: 1062, title: "Şımarık", artist: "Tarkan", album: "Ölürüm Sana", genre: "Turkish Pop", duration: "3:59", year: 1997, cover: "https://picsum.photos/300x300/bb33cc/ffffff?text=SMR", region: "Asia", language: "Turkish" },
  { id: 1063, title: "Aşk", artist: "Tarkan", album: "Aacayipsin", genre: "Turkish Pop", duration: "4:15", year: 1994, cover: "https://picsum.photos/300x300/cc33cc/ffffff?text=ASK", region: "Asia", language: "Turkish" },
  { id: 1064, title: "Yalan", artist: "Sertab Erener", album: "Lal", genre: "Turkish Pop", duration: "4:42", year: 2000, cover: "https://picsum.photos/300x300/dd33cc/ffffff?text=YLN", region: "Asia", language: "Turkish" },
  { id: 1065, title: "Deli", artist: "Kenan Doğulu", album: "Kenan Doğulu 7", genre: "Turkish Pop", duration: "3:38", year: 2002, cover: "https://picsum.photos/300x300/ee33cc/ffffff?text=DLI", region: "Asia", language: "Turkish" },
  
  // Punjabi Songs
  { id: 1066, title: "Tunak Tunak Tun", artist: "Daler Mehndi", album: "Tunak Tunak Tun", genre: "Punjabi Pop", duration: "3:54", year: 1998, cover: "https://picsum.photos/300x300/ffaa00/ffffff?text=TTT", region: "Asia", language: "Punjabi" },
  { id: 1067, title: "Mundian To Bach Ke", artist: "Panjabi MC", album: "Legalised", genre: "Bhangra", duration: "4:38", year: 1998, cover: "https://picsum.photos/300x300/ffbb00/ffffff?text=MTBK", region: "Asia", language: "Punjabi" },
  { id: 1068, title: "Laung Laachi", artist: "Mannat Noor", album: "Laung Laachi", genre: "Punjabi Pop", duration: "3:52", year: 2018, cover: "https://picsum.photos/300x300/ffcc00/ffffff?text=LL", region: "Asia", language: "Punjabi" },
  { id: 1069, title: "Lehanga", artist: "Jass Manak", album: "Lehanga", genre: "Punjabi Pop", duration: "2:52", year: 2018, cover: "https://picsum.photos/300x300/ffdd00/ffffff?text=LHG", region: "Asia", language: "Punjabi" },
  { id: 1070, title: "Brown Munde", artist: "AP Dhillon", album: "Brown Munde", genre: "Punjabi Pop", duration: "3:04", year: 2020, cover: "https://picsum.photos/300x300/ffee00/ffffff?text=BM", region: "Asia", language: "Punjabi" },
  
  // Tamil Songs
  { id: 1071, title: "Kannalane", artist: "A. R. Rahman", album: "Bombay", genre: "Tamil Film", duration: "5:21", year: 1995, cover: "https://picsum.photos/300x300/00aaff/ffffff?text=KNL", region: "Asia", language: "Tamil" },
  { id: 1072, title: "Rowdy Baby", artist: "Dhanush & Dhee", album: "Maari 2", genre: "Tamil Film", duration: "4:41", year: 2018, cover: "https://picsum.photos/300x300/00bbff/ffffff?text=RB", region: "Asia", language: "Tamil" },
  { id: 1073, title: "Vaseegara", artist: "Bombay Jayashri", album: "Minnale", genre: "Tamil Film", duration: "5:18", year: 2001, cover: "https://picsum.photos/300x300/00ccff/ffffff?text=VSG", region: "Asia", language: "Tamil" },
  { id: 1074, title: "Why This Kolaveri Di", artist: "Dhanush", album: "3", genre: "Tamil Film", duration: "3:56", year: 2011, cover: "https://picsum.photos/300x300/00ddff/ffffff?text=WTKD", region: "Asia", language: "Tamil" },
  { id: 1075, title: "Munbe Vaa", artist: "Naresh Iyer & Andrea Jeremiah", album: "Sillunu Oru Kaadhal", genre: "Tamil Film", duration: "5:09", year: 2006, cover: "https://picsum.photos/300x300/00eeff/ffffff?text=MV", region: "Asia", language: "Tamil" },
  
  // Bengali Songs
  { id: 1076, title: "Ekla Chalo Re", artist: "Rabindranath Tagore", album: "Rabindra Sangeet", genre: "Folk", duration: "3:42", year: 1905, cover: "https://picsum.photos/300x300/aa5500/ffffff?text=ECR", region: "Asia", language: "Bengali" },
  { id: 1077, title: "Amar Sonar Bangla", artist: "Rabindranath Tagore", album: "Rabindra Sangeet", genre: "Folk", duration: "2:53", year: 1906, cover: "https://picsum.photos/300x300/bb5500/ffffff?text=ASB", region: "Asia", language: "Bengali" },
  { id: 1078, title: "Bhalobashar Morshum", artist: "Tahsan", album: "Kothopokothon", genre: "Bengali Pop", duration: "4:28", year: 2008, cover: "https://picsum.photos/300x300/cc5500/ffffff?text=BM", region: "Asia", language: "Bengali" },
  { id: 1079, title: "Boshe Achi", artist: "Ayub Bachchu", album: "LRB 5", genre: "Bengali Rock", duration: "5:17", year: 2004, cover: "https://picsum.photos/300x300/dd5500/ffffff?text=BA", region: "Asia", language: "Bengali" },
  { id: 1080, title: "Cholo Bodle Jai", artist: "Arnob", album: "Hok Kolorob", genre: "Bengali Pop", duration: "3:51", year: 2006, cover: "https://picsum.photos/300x300/ee5500/ffffff?text=CBJ", region: "Asia", language: "Bengali" },
  
  // Swahili/African Songs
  { id: 1081, title: "Pata Pata", artist: "Miriam Makeba", album: "Pata Pata", genre: "Afropop", duration: "2:51", year: 1967, cover: "https://picsum.photos/300x300/ff9933/ffffff?text=PP", region: "Africa", language: "Swahili" },
  { id: 1082, title: "Malaika", artist: "Miriam Makeba", album: "World of Miriam Makeba", genre: "Afropop", duration: "3:18", year: 1974, cover: "https://picsum.photos/300x300/ffaa33/ffffff?text=MLK", region: "Africa", language: "Swahili" },
  { id: 1083, title: "Jambo Bwana", artist: "Them Mushrooms", album: "Jambo Bwana", genre: "Afropop", duration: "4:02", year: 1982, cover: "https://picsum.photos/300x300/ffbb33/ffffff?text=JB", region: "Africa", language: "Swahili" },
  { id: 1084, title: "Wavin' Flag", artist: "K'naan", album: "Troubadour", genre: "Hip-Hop", duration: "3:42", year: 2009, cover: "https://picsum.photos/300x300/ffcc33/ffffff?text=WF", region: "Africa", language: "English" },
  { id: 1085, title: "Waka Waka", artist: "Shakira", album: "Sale el Sol", genre: "Pop", duration: "3:22", year: 2010, cover: "https://picsum.photos/300x300/ffdd33/ffffff?text=WW", region: "South America", language: "English" },
  
  // More English Songs - Various Artists
  { id: 1086, title: "Lose Yourself", artist: "Eminem", album: "8 Mile Soundtrack", genre: "Hip-Hop", duration: "5:26", year: 2002, cover: "https://picsum.photos/300x300/6f6f6f/ffffff?text=LY", region: "North America", language: "English" },
  { id: 1087, title: "HUMBLE.", artist: "Kendrick Lamar", album: "DAMN.", genre: "Hip-Hop", duration: "2:57", year: 2017, cover: "https://picsum.photos/300x300/7f7f7f/ffffff?text=H", region: "North America", language: "English" },
  { id: 1088, title: "Rolling in the Deep", artist: "Adele", album: "21", genre: "Pop", duration: "3:48", year: 2010, cover: "https://picsum.photos/300x300/8f8f8f/ffffff?text=RID", region: "Europe", language: "English" },
  { id: 1089, title: "Smells Like Teen Spirit", artist: "Nirvana", album: "Nevermind", genre: "Rock", duration: "5:01", year: 1991, cover: "https://picsum.photos/300x300/9f9f9f/ffffff?text=SLTS", region: "North America", language: "English" },
  { id: 1090, title: "Stairway to Heaven", artist: "Led Zeppelin", album: "Led Zeppelin IV", genre: "Rock", duration: "8:02", year: 1971, cover: "https://picsum.photos/300x300/af9f9f/ffffff?text=STH", region: "Europe", language: "English" },
  
  // Classical - Various Composers
  { id: 1091, title: "Symphony No. 9", artist: "Ludwig van Beethoven", album: "Beethoven Symphony No. 9", genre: "Classical", duration: "14:36", year: 1824, cover: "https://picsum.photos/300x300/556b2f/ffffff?text=S9", region: "Europe", language: "Instrumental" },
  { id: 1092, title: "Claire de Lune", artist: "Claude Debussy", album: "Suite Bergamasque", genre: "Classical", duration: "4:30", year: 1905, cover: "https://picsum.photos/300x300/8f8f8f/ffffff?text=CDL", region: "Europe", language: "Instrumental" },
  { id: 1093, title: "The Four Seasons: Spring", artist: "Antonio Vivaldi", album: "Le quattro stagioni", genre: "Classical", duration: "10:15", year: 1725, cover: "https://picsum.photos/300x300/9f9f9f/ffffff?text=FS", region: "Europe", language: "Instrumental" },
  { id: 1094, title: "Canon in D", artist: "Johann Pachelbel", album: "Canon and Gigue", genre: "Classical", duration: "5:43", year: 1680, cover: "https://picsum.photos/300x300/af9f8f/ffffff?text=CID", region: "Europe", language: "Instrumental" },
  { id: 1095, title: "Eine kleine Nachtmusik", artist: "Wolfgang Amadeus Mozart", album: "Serenade No. 13", genre: "Classical", duration: "17:42", year: 1787, cover: "https://picsum.photos/300x300/bf9f8f/ffffff?text=EKN", region: "Europe", language: "Instrumental" },
  
  // Jazz Classics
  { id: 1096, title: "What a Wonderful World", artist: "Louis Armstrong", album: "What a Wonderful World", genre: "Jazz", duration: "2:21", year: 1967, cover: "https://picsum.photos/300x300/cf3f3f/ffffff?text=WWW", region: "North America", language: "English" },
  { id: 1097, title: "Take Five", artist: "Dave Brubeck Quartet", album: "Time Out", genre: "Jazz", duration: "5:24", year: 1959, cover: "https://picsum.photos/300x300/df4f4f/ffffff?text=TF", region: "North America", language: "Instrumental" },
  { id: 1098, title: "Summertime", artist: "Ella Fitzgerald", album: "Porgy and Bess", genre: "Jazz", duration: "3:15", year: 1958, cover: "https://picsum.photos/300x300/ef4f4f/ffffff?text=ST", region: "North America", language: "English" },
  { id: 1099, title: "So What", artist: "Miles Davis", album: "Kind of Blue", genre: "Jazz", duration: "9:22", year: 1959, cover: "https://picsum.photos/300x300/ff4f4f/ffffff?text=SW", region: "North America", language: "Instrumental" },
  { id: 1100, title: "Fly Me to the Moon", artist: "Frank Sinatra", album: "It Might as Well Be Swing", genre: "Jazz", duration: "2:28", year: 1964, cover: "https://picsum.photos/300x300/ff5f4f/ffffff?text=FMTTM", region: "North America", language: "English" },
  
  // Electronic/EDM
  { id: 1101, title: "One More Time", artist: "Daft Punk", album: "Discovery", genre: "Electronic", duration: "5:20", year: 2000, cover: "https://picsum.photos/300x300/af1f1f/ffffff?text=OMT", region: "Europe", language: "English" },
  { id: 1102, title: "Levels", artist: "Avicii", album: "Levels", genre: "Electronic", duration: "3:18", year: 2011, cover: "https://picsum.photos/300x300/bf2f2f/ffffff?text=L", region: "Europe", language: "Instrumental" },
  { id: 1103, title: "Titanium", artist: "David Guetta ft. Sia", album: "Nothing but the Beat", genre: "Electronic", duration: "4:05", year: 2011, cover: "https://picsum.photos/300x300/cf2f2f/ffffff?text=TTN", region: "Europe", language: "English" },
  { id: 1104, title: "Wake Me Up", artist: "Avicii", album: "True", genre: "Electronic", duration: "4:09", year: 2013, cover: "https://picsum.photos/300x300/df2f2f/ffffff?text=WMU", region: "Europe", language: "English" },
  { id: 1105, title: "Sandstorm", artist: "Darude", album: "Before the Storm", genre: "Electronic", duration: "3:43", year: 1999, cover: "https://picsum.photos/300x300/ef2f2f/ffffff?text=SS", region: "Europe", language: "Instrumental" },
  
  // Country Music
  { id: 1106, title: "Friends in Low Places", artist: "Garth Brooks", album: "No Fences", genre: "Country", duration: "4:27", year: 1990, cover: "https://picsum.photos/300x300/ef5f5f/ffffff?text=FLP", region: "North America", language: "English" },
  { id: 1107, title: "The Dance", artist: "Garth Brooks", album: "Garth Brooks", genre: "Country", duration: "3:42", year: 1989, cover: "https://picsum.photos/300x300/ff6f6f/ffffff?text=TD", region: "North America", language: "English" },
  { id: 1108, title: "Jolene", artist: "Dolly Parton", album: "Jolene", genre: "Country", duration: "2:42", year: 1973, cover: "https://picsum.photos/300x300/ff7f6f/ffffff?text=JLN", region: "North America", language: "English" },
  { id: 1109, title: "Ring of Fire", artist: "Johnny Cash", album: "Ring of Fire: The Best of Johnny Cash", genre: "Country", duration: "2:37", year: 1963, cover: "https://picsum.photos/300x300/ff8f6f/ffffff?text=ROF", region: "North America", language: "English" },
  { id: 1110, title: "Before He Cheats", artist: "Carrie Underwood", album: "Some Hearts", genre: "Country", duration: "3:18", year: 2006, cover: "https://picsum.photos/300x300/ff9f6f/ffffff?text=BHC", region: "North America", language: "English" },
  
  // R&B and Soul
  { id: 1111, title: "Respect", artist: "Aretha Franklin", album: "I Never Loved a Man", genre: "R&B", duration: "2:28", year: 1967, cover: "https://picsum.photos/300x300/1f7f7f/ffffff?text=R", region: "North America", language: "English" },
  { id: 1112, title: "Superstition", artist: "Stevie Wonder", album: "Talking Book", genre: "R&B", duration: "4:26", year: 1972, cover: "https://picsum.photos/300x300/2f8f8f/ffffff?text=SUP", region: "North America", language: "English" },
  { id: 1113, title: "I Will Always Love You", artist: "Whitney Houston", album: "The Bodyguard OST", genre: "R&B", duration: "4:31", year: 1992, cover: "https://picsum.photos/300x300/3f9f9f/ffffff?text=IWALY", region: "North America", language: "English" },
  { id: 1114, title: "Let's Stay Together", artist: "Al Green", album: "Let's Stay Together", genre: "R&B", duration: "3:18", year: 1971, cover: "https://picsum.photos/300x300/4fafaf/ffffff?text=LST", region: "North America", language: "English" },
  { id: 1115, title: "Ain't No Sunshine", artist: "Bill Withers", album: "Just As I Am", genre: "R&B", duration: "2:03", year: 1971, cover: "https://picsum.photos/300x300/5fbfbf/ffffff?text=ANS", region: "North America", language: "English" },
  
  // Reggae and Caribbean
  { id: 1116, title: "No Woman, No Cry", artist: "Bob Marley & The Wailers", album: "Natty Dread", genre: "Reggae", duration: "3:44", year: 1974, cover: "https://picsum.photos/300x300/22dd22/ffffff?text=NWNC", region: "North America", language: "English" },
  { id: 1117, title: "Three Little Birds", artist: "Bob Marley & The Wailers", album: "Exodus", genre: "Reggae", duration: "3:00", year: 1977, cover: "https://picsum.photos/300x300/33dd22/ffffff?text=TLB", region: "North America", language: "English" },
  { id: 1118, title: "One Love", artist: "Bob Marley & The Wailers", album: "Exodus", genre: "Reggae", duration: "2:52", year: 1977, cover: "https://picsum.photos/300x300/44dd22/ffffff?text=OL", region: "North America", language: "English" },
  { id: 1119, title: "Could You Be Loved", artist: "Bob Marley & The Wailers", album: "Uprising", genre: "Reggae", duration: "3:56", year: 1980, cover: "https://picsum.photos/300x300/55dd22/ffffff?text=CYBL", region: "North America", language: "English" },
  { id: 1120, title: "Hot Hot Hot", artist: "Arrow", album: "Hot Hot Hot", genre: "Soca", duration: "3:38", year: 1982, cover: "https://picsum.photos/300x300/66dd22/ffffff?text=HHH", region: "North America", language: "English" },
  
  // Australian/Oceania Songs
  { id: 1121, title: "Down Under", artist: "Men at Work", album: "Business as Usual", genre: "Rock", duration: "3:42", year: 1981, cover: "https://picsum.photos/300x300/3366ff/ffffff?text=DU", region: "Oceania", language: "English" },
  { id: 1122, title: "I Still Call Australia Home", artist: "Peter Allen", album: "Taught by Experts", genre: "Pop", duration: "4:04", year: 1980, cover: "https://picsum.photos/300x300/4466ff/ffffff?text=ISCAH", region: "Oceania", language: "English" },
  { id: 1123, title: "Somebody That I Used to Know", artist: "Gotye ft. Kimbra", album: "Making Mirrors", genre: "Pop", duration: "4:04", year: 2011, cover: "https://picsum.photos/300x300/5566ff/ffffff?text=STITK", region: "Oceania", language: "English" },
  { id: 1124, title: "Royals", artist: "Lorde", album: "Pure Heroine", genre: "Pop", duration: "3:10", year: 2013, cover: "https://picsum.photos/300x300/6666ff/ffffff?text=RYL", region: "Oceania", language: "English" },
  { id: 1125, title: "Riptide", artist: "Vance Joy", album: "Dream Your Life Away", genre: "Indie", duration: "3:24", year: 2013, cover: "https://picsum.photos/300x300/7766ff/ffffff?text=RT", region: "Oceania", language: "English" },
  
  // More Global Hits - Mixed
  { id: 1126, title: "Thriller", artist: "Michael Jackson", album: "Thriller", genre: "Pop", duration: "5:57", year: 1982, cover: "https://picsum.photos/300x300/aa00aa/ffffff?text=THR", region: "North America", language: "English" },
  { id: 1127, title: "Billie Jean", artist: "Michael Jackson", album: "Thriller", genre: "Pop", duration: "4:54", year: 1982, cover: "https://picsum.photos/300x300/bb00aa/ffffff?text=BJ", region: "North America", language: "English" },
  { id: 1128, title: "Beat It", artist: "Michael Jackson", album: "Thriller", genre: "Pop", duration: "4:18", year: 1982, cover: "https://picsum.photos/300x300/cc00aa/ffffff?text=BI", region: "North America", language: "English" },
  { id: 1129, title: "Imagine", artist: "John Lennon", album: "Imagine", genre: "Rock", duration: "3:01", year: 1971, cover: "https://picsum.photos/300x300/dd00aa/ffffff?text=IMG", region: "Europe", language: "English" },
  { id: 1130, title: "Hey Jude", artist: "The Beatles", album: "Hey Jude", genre: "Rock", duration: "7:11", year: 1968, cover: "https://picsum.photos/300x300/ee00aa/ffffff?text=HJ", region: "Europe", language: "English" },
  
  // Additional Diverse Songs (131-200)
  { id: 1131, title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", album: "Uptown Special", genre: "Pop", duration: "4:30", year: 2014, cover: "https://picsum.photos/300x300/ff1100/ffffff?text=UF", region: "North America", language: "English" },
  { id: 1132, title: "Happy", artist: "Pharrell Williams", album: "Girl", genre: "Pop", duration: "3:53", year: 2013, cover: "https://picsum.photos/300x300/ff2200/ffffff?text=HPY", region: "North America", language: "English" },
  { id: 1133, title: "Can't Stop the Feeling!", artist: "Justin Timberlake", album: "Trolls OST", genre: "Pop", duration: "3:56", year: 2016, cover: "https://picsum.photos/300x300/ff3300/ffffff?text=CSTF", region: "North America", language: "English" },
  { id: 1134, title: "Hallelujah", artist: "Leonard Cohen", album: "Various Positions", genre: "Folk", duration: "4:36", year: 1984, cover: "https://picsum.photos/300x300/ff4400/ffffff?text=HLJ", region: "North America", language: "English" },
  { id: 1135, title: "Sweet Child O' Mine", artist: "Guns N' Roses", album: "Appetite for Destruction", genre: "Rock", duration: "5:56", year: 1987, cover: "https://picsum.photos/300x300/ff5500/ffffff?text=SCOM", region: "North America", language: "English" },
  { id: 1136, title: "November Rain", artist: "Guns N' Roses", album: "Use Your Illusion I", genre: "Rock", duration: "8:57", year: 1991, cover: "https://picsum.photos/300x300/ff6600/ffffff?text=NR", region: "North America", language: "English" },
  { id: 1137, title: "Africa", artist: "Toto", album: "Toto IV", genre: "Rock", duration: "4:55", year: 1982, cover: "https://picsum.photos/300x300/ff7700/ffffff?text=AFR", region: "North America", language: "English" },
  { id: 1138, title: "Don't Stop Believin'", artist: "Journey", album: "Escape", genre: "Rock", duration: "4:09", year: 1981, cover: "https://picsum.photos/300x300/ff8800/ffffff?text=DSB", region: "North America", language: "English" },
  { id: 1139, title: "Wonderwall", artist: "Oasis", album: "(What's the Story) Morning Glory?", genre: "Rock", duration: "4:18", year: 1995, cover: "https://picsum.photos/300x300/ff9900/ffffff?text=WW", region: "Europe", language: "English" },
  { id: 1140, title: "Champagne Supernova", artist: "Oasis", album: "(What's the Story) Morning Glory?", genre: "Rock", duration: "7:27", year: 1995, cover: "https://picsum.photos/300x300/ffaa00/ffffff?text=CS", region: "Europe", language: "English" },
  { id: 1141, title: "Creep", artist: "Radiohead", album: "Pablo Honey", genre: "Rock", duration: "3:58", year: 1992, cover: "https://picsum.photos/300x300/ffbb00/ffffff?text=CRP", region: "Europe", language: "English" },
  { id: 1142, title: "Paradise City", artist: "Guns N' Roses", album: "Appetite for Destruction", genre: "Rock", duration: "6:46", year: 1987, cover: "https://picsum.photos/300x300/ffcc00/ffffff?text=PC", region: "North America", language: "English" },
  { id: 1143, title: "Eye of the Tiger", artist: "Survivor", album: "Eye of the Tiger", genre: "Rock", duration: "4:05", year: 1982, cover: "https://picsum.photos/300x300/ffdd00/ffffff?text=EOTT", region: "North America", language: "English" },
  { id: 1144, title: "We Will Rock You", artist: "Queen", album: "News of the World", genre: "Rock", duration: "2:02", year: 1977, cover: "https://picsum.photos/300x300/ffee00/ffffff?text=WWRY", region: "Europe", language: "English" },
  { id: 1145, title: "We Are the Champions", artist: "Queen", album: "News of the World", genre: "Rock", duration: "2:59", year: 1977, cover: "https://picsum.photos/300x300/ffff00/ffffff?text=WATC", region: "Europe", language: "English" },
  { id: 1146, title: "Another One Bites the Dust", artist: "Queen", album: "The Game", genre: "Rock", duration: "3:35", year: 1980, cover: "https://picsum.photos/300x300/eeff00/ffffff?text=AOBTD", region: "Europe", language: "English" },
  { id: 1147, title: "Livin' on a Prayer", artist: "Bon Jovi", album: "Slippery When Wet", genre: "Rock", duration: "4:09", year: 1986, cover: "https://picsum.photos/300x300/ddff00/ffffff?text=LOAP", region: "North America", language: "English" },
  { id: 1148, title: "You Give Love a Bad Name", artist: "Bon Jovi", album: "Slippery When Wet", genre: "Rock", duration: "3:42", year: 1986, cover: "https://picsum.photos/300x300/ccff00/ffffff?text=YGLABN", region: "North America", language: "English" },
  { id: 1149, title: "Sweet Dreams (Are Made of This)", artist: "Eurythmics", album: "Sweet Dreams", genre: "Pop", duration: "3:36", year: 1983, cover: "https://picsum.photos/300x300/bbff00/ffffff?text=SD", region: "Europe", language: "English" },
  { id: 1150, title: "Every Breath You Take", artist: "The Police", album: "Synchronicity", genre: "Rock", duration: "4:13", year: 1983, cover: "https://picsum.photos/300x300/aaff00/ffffff?text=EBYT", region: "Europe", language: "English" },
  { id: 1151, title: "Purple Rain", artist: "Prince", album: "Purple Rain", genre: "Rock", duration: "8:41", year: 1984, cover: "https://picsum.photos/300x300/99ff00/ffffff?text=PR", region: "North America", language: "English" },
  { id: 1152, title: "Like a Prayer", artist: "Madonna", album: "Like a Prayer", genre: "Pop", duration: "5:41", year: 1989, cover: "https://picsum.photos/300x300/88ff00/ffffff?text=LAP", region: "North America", language: "English" },
  { id: 1153, title: "Material Girl", artist: "Madonna", album: "Like a Virgin", genre: "Pop", duration: "4:00", year: 1984, cover: "https://picsum.photos/300x300/77ff00/ffffff?text=MG", region: "North America", language: "English" },
  { id: 1154, title: "Like a Virgin", artist: "Madonna", album: "Like a Virgin", genre: "Pop", duration: "3:38", year: 1984, cover: "https://picsum.photos/300x300/66ff00/ffffff?text=LAV", region: "North America", language: "English" },
  { id: 1155, title: "Total Eclipse of the Heart", artist: "Bonnie Tyler", album: "Faster Than the Speed of Night", genre: "Pop", duration: "4:28", year: 1983, cover: "https://picsum.photos/300x300/55ff00/ffffff?text=TEOTH", region: "Europe", language: "English" },
  { id: 1156, title: "Time After Time", artist: "Cyndi Lauper", album: "She's So Unusual", genre: "Pop", duration: "4:00", year: 1983, cover: "https://picsum.photos/300x300/44ff00/ffffff?text=TAT", region: "North America", language: "English" },
  { id: 1157, title: "Girls Just Want to Have Fun", artist: "Cyndi Lauper", album: "She's So Unusual", genre: "Pop", duration: "3:58", year: 1983, cover: "https://picsum.photos/300x300/33ff00/ffffff?text=GJWTHF", region: "North America", language: "English" },
  { id: 1158, title: "Take On Me", artist: "a-ha", album: "Hunting High and Low", genre: "Pop", duration: "3:46", year: 1985, cover: "https://picsum.photos/300x300/22ff00/ffffff?text=TOM", region: "Europe", language: "English" },
  { id: 1159, title: "Careless Whisper", artist: "George Michael", album: "Make It Big", genre: "Pop", duration: "5:00", year: 1984, cover: "https://picsum.photos/300x300/11ff00/ffffff?text=CW", region: "Europe", language: "English" },
  { id: 1160, title: "Faith", artist: "George Michael", album: "Faith", genre: "Pop", duration: "3:16", year: 1987, cover: "https://picsum.photos/300x300/00ff11/ffffff?text=FTH", region: "Europe", language: "English" },
  { id: 1161, title: "Dancing Queen", artist: "ABBA", album: "Arrival", genre: "Pop", duration: "3:51", year: 1976, cover: "https://picsum.photos/300x300/00ff22/ffffff?text=DQ", region: "Europe", language: "English" },
  { id: 1162, title: "Mamma Mia", artist: "ABBA", album: "ABBA", genre: "Pop", duration: "3:32", year: 1975, cover: "https://picsum.photos/300x300/00ff33/ffffff?text=MM", region: "Europe", language: "English" },
  { id: 1163, title: "Waterloo", artist: "ABBA", album: "Waterloo", genre: "Pop", duration: "2:44", year: 1974, cover: "https://picsum.photos/300x300/00ff44/ffffff?text=WTR", region: "Europe", language: "English" },
  { id: 1164, title: "Fernando", artist: "ABBA", album: "Greatest Hits", genre: "Pop", duration: "4:13", year: 1976, cover: "https://picsum.photos/300x300/00ff55/ffffff?text=FRN", region: "Europe", language: "English" },
  { id: 1165, title: "Mr. Brightside", artist: "The Killers", album: "Hot Fuss", genre: "Rock", duration: "3:42", year: 2003, cover: "https://picsum.photos/300x300/00ff66/ffffff?text=MRB", region: "North America", language: "English" },
  { id: 1166, title: "Somebody Told Me", artist: "The Killers", album: "Hot Fuss", genre: "Rock", duration: "3:17", year: 2004, cover: "https://picsum.photos/300x300/00ff77/ffffff?text=STM", region: "North America", language: "English" },
  { id: 1167, title: "Seven Nation Army", artist: "The White Stripes", album: "Elephant", genre: "Rock", duration: "3:52", year: 2003, cover: "https://picsum.photos/300x300/00ff88/ffffff?text=SNA", region: "North America", language: "English" },
  { id: 1168, title: "Crazy", artist: "Gnarls Barkley", album: "St. Elsewhere", genre: "Pop", duration: "2:58", year: 2006, cover: "https://picsum.photos/300x300/00ff99/ffffff?text=CRZ", region: "North America", language: "English" },
  { id: 1169, title: "Apologize", artist: "OneRepublic", album: "Dreaming Out Loud", genre: "Pop", duration: "3:28", year: 2007, cover: "https://picsum.photos/300x300/00ffaa/ffffff?text=APL", region: "North America", language: "English" },
  { id: 1170, title: "Counting Stars", artist: "OneRepublic", album: "Native", genre: "Pop", duration: "4:17", year: 2013, cover: "https://picsum.photos/300x300/00ffbb/ffffff?text=CS", region: "North America", language: "English" },
  { id: 1171, title: "Radioactive", artist: "Imagine Dragons", album: "Night Visions", genre: "Rock", duration: "3:06", year: 2012, cover: "https://picsum.photos/300x300/00ffcc/ffffff?text=RAD", region: "North America", language: "English" },
  { id: 1172, title: "Believer", artist: "Imagine Dragons", album: "Evolve", genre: "Rock", duration: "3:24", year: 2017, cover: "https://picsum.photos/300x300/00ffdd/ffffff?text=BLV", region: "North America", language: "English" },
  { id: 1173, title: "Thunder", artist: "Imagine Dragons", album: "Evolve", genre: "Rock", duration: "3:07", year: 2017, cover: "https://picsum.photos/300x300/00ffee/ffffff?text=THD", region: "North America", language: "English" },
  { id: 1174, title: "Viva La Vida", artist: "Coldplay", album: "Viva la Vida or Death and All His Friends", genre: "Rock", duration: "4:02", year: 2008, cover: "https://picsum.photos/300x300/00ffff/ffffff?text=VLV", region: "Europe", language: "English" },
  { id: 1175, title: "The Scientist", artist: "Coldplay", album: "A Rush of Blood to the Head", genre: "Rock", duration: "5:09", year: 2002, cover: "https://picsum.photos/300x300/00eeff/ffffff?text=TS", region: "Europe", language: "English" },
  { id: 1176, title: "Clocks", artist: "Coldplay", album: "A Rush of Blood to the Head", genre: "Rock", duration: "5:07", year: 2002, cover: "https://picsum.photos/300x300/00ddff/ffffff?text=CLK", region: "Europe", language: "English" },
  { id: 1177, title: "Fix You", artist: "Coldplay", album: "X&Y", genre: "Rock", duration: "4:54", year: 2005, cover: "https://picsum.photos/300x300/00ccff/ffffff?text=FY", region: "Europe", language: "English" },
  { id: 1178, title: "Yellow", artist: "Coldplay", album: "Parachutes", genre: "Rock", duration: "4:26", year: 2000, cover: "https://picsum.photos/300x300/00bbff/ffffff?text=YLW", region: "Europe", language: "English" },
  { id: 1179, title: "Use Somebody", artist: "Kings of Leon", album: "Only by the Night", genre: "Rock", duration: "3:51", year: 2008, cover: "https://picsum.photos/300x300/00aaff/ffffff?text=US", region: "North America", language: "English" },
  { id: 1180, title: "Sex on Fire", artist: "Kings of Leon", album: "Only by the Night", genre: "Rock", duration: "3:23", year: 2008, cover: "https://picsum.photos/300x300/0099ff/ffffff?text=SOF", region: "North America", language: "English" },
  { id: 1181, title: "Pumped Up Kicks", artist: "Foster the People", album: "Torches", genre: "Indie", duration: "3:59", year: 2010, cover: "https://picsum.photos/300x300/0088ff/ffffff?text=PUK", region: "North America", language: "English" },
  { id: 1182, title: "Shut Up and Dance", artist: "Walk the Moon", album: "Talking Is Hard", genre: "Pop", duration: "3:19", year: 2014, cover: "https://picsum.photos/300x300/0077ff/ffffff?text=SUAD", region: "North America", language: "English" },
  { id: 1183, title: "Ho Hey", artist: "The Lumineers", album: "The Lumineers", genre: "Folk", duration: "2:43", year: 2012, cover: "https://picsum.photos/300x300/0066ff/ffffff?text=HH", region: "North America", language: "English" },
  { id: 1184, title: "Little Talks", artist: "Of Monsters and Men", album: "My Head Is an Animal", genre: "Indie", duration: "4:24", year: 2011, cover: "https://picsum.photos/300x300/0055ff/ffffff?text=LT", region: "Europe", language: "English" },
  { id: 1185, title: "Budapest", artist: "George Ezra", album: "Wanted on Voyage", genre: "Pop", duration: "3:23", year: 2014, cover: "https://picsum.photos/300x300/0044ff/ffffff?text=BDP", region: "Europe", language: "English" },
  { id: 1186, title: "Shotgun", artist: "George Ezra", album: "Staying at Tamara's", genre: "Pop", duration: "3:24", year: 2018, cover: "https://picsum.photos/300x300/0033ff/ffffff?text=SHT", region: "Europe", language: "English" },
  { id: 1187, title: "Stitches", artist: "Shawn Mendes", album: "Handwritten", genre: "Pop", duration: "3:26", year: 2015, cover: "https://picsum.photos/300x300/0022ff/ffffff?text=STC", region: "North America", language: "English" },
  { id: 1188, title: "Treat You Better", artist: "Shawn Mendes", album: "Illuminate", genre: "Pop", duration: "3:07", year: 2016, cover: "https://picsum.photos/300x300/0011ff/ffffff?text=TYB", region: "North America", language: "English" },
  { id: 1189, title: "Senorita", artist: "Shawn Mendes & Camila Cabello", album: "Senorita", genre: "Pop", duration: "3:11", year: 2019, cover: "https://picsum.photos/300x300/1100ff/ffffff?text=SNR", region: "North America", language: "English" },
  { id: 1190, title: "Havana", artist: "Camila Cabello ft. Young Thug", album: "Camila", genre: "Pop", duration: "3:37", year: 2017, cover: "https://picsum.photos/300x300/2200ff/ffffff?text=HVN", region: "North America", language: "English" },
  { id: 1191, title: "Without Me", artist: "Halsey", album: "Manic", genre: "Pop", duration: "3:31", year: 2018, cover: "https://picsum.photos/300x300/3300ff/ffffff?text=WM", region: "North America", language: "English" },
  { id: 1192, title: "Bad Guy", artist: "Billie Eilish", album: "When We All Fall Asleep, Where Do We Go?", genre: "Pop", duration: "3:14", year: 2019, cover: "https://picsum.photos/300x300/4400ff/ffffff?text=BG", region: "North America", language: "English" },
  { id: 1193, title: "Ocean Eyes", artist: "Billie Eilish", album: "Don't Smile at Me", genre: "Pop", duration: "3:20", year: 2016, cover: "https://picsum.photos/300x300/5500ff/ffffff?text=OE", region: "North America", language: "English" },
  { id: 1194, title: "Lovely", artist: "Billie Eilish & Khalid", album: "13 Reasons Why Season 2 OST", genre: "Pop", duration: "3:20", year: 2018, cover: "https://picsum.photos/300x300/6600ff/ffffff?text=LVY", region: "North America", language: "English" },
  { id: 1195, title: "Thank U, Next", artist: "Ariana Grande", album: "Thank U, Next", genre: "Pop", duration: "3:27", year: 2018, cover: "https://picsum.photos/300x300/7700ff/ffffff?text=TUN", region: "North America", language: "English" },
  { id: 1196, title: "7 Rings", artist: "Ariana Grande", album: "Thank U, Next", genre: "Pop", duration: "2:58", year: 2019, cover: "https://picsum.photos/300x300/8800ff/ffffff?text=7R", region: "North America", language: "English" },
  { id: 1197, title: "Positions", artist: "Ariana Grande", album: "Positions", genre: "Pop", duration: "2:52", year: 2020, cover: "https://picsum.photos/300x300/9900ff/ffffff?text=POS", region: "North America", language: "English" },
  { id: 1198, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", genre: "Pop", duration: "3:23", year: 2020, cover: "https://picsum.photos/300x300/aa00ff/ffffff?text=LEV", region: "Europe", language: "English" },
  { id: 1199, title: "Don't Start Now", artist: "Dua Lipa", album: "Future Nostalgia", genre: "Pop", duration: "3:03", year: 2019, cover: "https://picsum.photos/300x300/bb00ff/ffffff?text=DSN", region: "Europe", language: "English" },
  { id: 1200, title: "Drivers License", artist: "Olivia Rodrigo", album: "SOUR", genre: "Pop", duration: "4:02", year: 2021, cover: "https://picsum.photos/300x300/cc00ff/ffffff?text=DL", region: "North America", language: "English" }
];

const genres = [
  { name: "Pop", description: "Popular mainstream music", icon: "🎤" },
  { name: "Rock", description: "Rock and alternative music", icon: "🎸" },
  { name: "Hip-Hop", description: "Rap and hip-hop music", icon: "🎧" },
  { name: "Classical", description: "Classical and orchestral music", icon: "🎻" },
  { name: "Electronic", description: "Electronic and dance music", icon: "🎹" },
  { name: "Jazz", description: "Jazz and blues music", icon: "🎺" },
  { name: "Country", description: "Country and folk music", icon: "🪕" },
  { name: "R&B", description: "R&B and soul music", icon: "🎵" },
  { name: "Bollywood", description: "Indian film music", icon: "🎬" },
  { name: "K-Pop", description: "Korean pop music", icon: "💖" },
  { name: "Latin Pop", description: "Latin and Spanish music", icon: "💃" },
  { name: "J-Pop", description: "Japanese pop music", icon: "🗾" },
  { name: "Arabic Pop", description: "Arabic and Middle Eastern music", icon: "🕌" },
  { name: "Reggae", description: "Reggae and Caribbean music", icon: "🌴" },
  { name: "Folk", description: "Traditional and folk music", icon: "🎻" },
  { name: "Afropop", description: "African pop music", icon: "🌍" }
];

// Get unique languages and regions from library
const languages = [...new Set(musicLibrary.map(song => song.language))].sort();
const regions = [...new Set(musicLibrary.map(song => song.region))].sort();

// ==================== MOCK API LAYER ====================

const API = {
  requestCount: 0,
  cache: {},
  
  async request(endpoint, data = null, options = {}) {
    const delay = options.delay || (200 + Math.random() * 300);
    const useCache = options.cache !== false;
    const method = options.method || 'GET';
    
    // Check cache
    const cacheKey = endpoint + JSON.stringify(data);
    if (useCache && this.cache[cacheKey]) {
      console.log(`[API] Cache hit: ${endpoint}`);
      return this.cache[cacheKey];
    }
    
    // Rate limiting simulation (100 requests per minute)
    this.requestCount++;
    if (this.requestCount > 100) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    
    // Show loading
    if (options.showLoading !== false) {
      showLoading(options.loadingText);
    }
    
    console.log(`[API] ${method} ${endpoint}`, data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Simulate random errors (1% chance)
    if (Math.random() < 0.01) {
      hideLoading();
      throw new Error('Network error. Please check your connection.');
    }
    
    // Hide loading
    if (options.showLoading !== false) {
      hideLoading();
    }
    
    // Return success
    const response = { success: true, data };
    
    // Cache response
    if (useCache) {
      this.cache[cacheKey] = response;
    }
    
    return response;
  },
  
  clearCache() {
    this.cache = {};
    console.log('[API] Cache cleared');
  }
};

// Reset rate limit counter every minute
setInterval(() => {
  API.requestCount = 0;
}, 60000);

// ==================== TOAST NOTIFICATIONS ====================

function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  
  const titles = {
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Info'
  };
  
  toast.innerHTML = `
    <div class="toast-icon">${icons[type]}</div>
    <div class="toast-content">
      <div class="toast-title">${titles[type]}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s reverse';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function showLoading(text = 'Loading...') {
  const overlay = document.getElementById('loading-overlay');
  const loadingText = document.getElementById('loading-text');
  loadingText.textContent = text;
  overlay.classList.add('active');
}

function hideLoading() {
  const overlay = document.getElementById('loading-overlay');
  overlay.classList.remove('active');
}

// ==================== STATE MANAGEMENT ====================

let currentUser = null;
let users = [
  { 
    id: 1,
    username: "demo", 
    email: "demo@streamify.com", 
    password: "demo123", 
    playlists: [], 
    likedSongs: [], 
    downloads: [], 
    history: [],
    playCounts: {},
    totalListeningTime: 0,
    settings: {
      audioQuality: 'medium',
      downloadQuality: 'high',
      crossfade: 0,
      gaplessPlayback: true,
      normalizeAudio: false,
      publicProfile: true,
      showActivity: true,
      explicitFilter: false,
      autoDownloadLiked: false,
      theme: 'auto'
    },
    createdAt: new Date('2024-01-01')
  }
];

let currentSong = null;
let currentPlaylist = [];
let currentPlaylistIndex = 0;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 0; // 0: no repeat, 1: repeat all, 2: repeat one
let volume = 70;
let isMuted = false;
let selectedGenre = null;
let currentView = 'home';
let selectedPlaylist = null;
let songToAdd = null;
let searchTimeout = null;
let passwordStrength = 0;

// ========== AUDIO EVENT LISTENERS FOR DEBUGGING ==========
if (audio) {
  audio.addEventListener('loadstart', () => console.log('🔄 Loading started'));
  audio.addEventListener('loadeddata', () => console.log('✓ Data loaded'));
  audio.addEventListener('canplay', () => {
    console.log('✓ Can play');
    audioReady = true;
  });
  audio.addEventListener('canplaythrough', () => console.log('✓ Can play through'));
  audio.addEventListener('playing', () => console.log('▶️ Playing'));
  audio.addEventListener('pause', () => console.log('⏸️ Paused'));
  audio.addEventListener('ended', () => {
    console.log('⏹️ Ended');
    if (repeatMode === 2) {
      audio.currentTime = 0;
      audio.play();
    } else if (repeatMode === 1 || currentPlaylistIndex < currentPlaylist.length - 1) {
      nextSong();
    } else {
      isPlaying = false;
      updatePlayerUI();
    }
  });
  audio.addEventListener('error', (e) => {
    console.error('❌ Audio error:', e);
    console.error('Error code:', audio.error?.code);
    console.error('Error message:', audio.error?.message);
    showToast('Audio error: ' + (audio.error?.message || 'Unknown error'), 'error');
  });
  
  // Update progress bar
  audio.addEventListener('timeupdate', function() {
    if (audio.duration && !isNaN(audio.duration)) {
      const progress = (audio.currentTime / audio.duration) * 100;
      
      const progressFill = document.getElementById('progress-fill');
      if (progressFill) {
        progressFill.style.width = progress + '%';
      }
      
      const currentTimeEl = document.getElementById('current-time');
      if (currentTimeEl) {
        currentTimeEl.textContent = formatTime(Math.floor(audio.currentTime));
      }
      
      const totalTimeEl = document.getElementById('total-time');
      if (totalTimeEl) {
        totalTimeEl.textContent = formatTime(Math.floor(audio.duration));
      }
    }
  });
}

console.log('=== STREAMIFY AUDIO READY ===');
console.log('Using HTML5 audio element with working MP3 URLs!');
console.log('Audio element:', audio);
console.log('Ready to play!');

// ==================== PASSWORD STRENGTH ====================

function checkPasswordStrength() {
  const password = document.getElementById('signup-password')?.value || '';
  const strengthBar = document.querySelector('.strength-bar');
  const strengthText = document.querySelector('.strength-text');
  
  if (!strengthBar || !strengthText) return;
  
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[^a-zA-Z0-9]/)) strength++;
  
  passwordStrength = strength;
  
  strengthBar.className = 'strength-bar';
  if (strength === 0) {
    strengthText.textContent = '';
  } else if (strength <= 2) {
    strengthBar.classList.add('weak');
    strengthText.textContent = 'Weak password';
  } else if (strength === 3) {
    strengthBar.classList.add('medium');
    strengthText.textContent = 'Medium password';
  } else {
    strengthBar.classList.add('strong');
    strengthText.textContent = 'Strong password';
  }
}

// ==================== AUTHENTICATION ====================

function toggleAuthForm(event) {
  event.preventDefault();
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  loginForm.classList.toggle('active');
  signupForm.classList.toggle('active');
}

async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const rememberMe = document.getElementById('remember-me').checked;

  try {
    await API.request('/auth/login', { email, password }, {
      loadingText: 'Logging in...',
      cache: false
    });
    
    const user = users.find(u => (u.email === email || u.username === email) && u.password === password);

    if (user) {
      currentUser = user;
      
      if (rememberMe) {
        try {
          // Simulate remember me (using in-memory storage)
          window.rememberedUser = user.username;
        } catch (e) {
          console.log('Remember me failed:', e);
        }
      }
      
      showToast('Welcome back, ' + user.username + '!', 'success');
      showMainApp();
    } else {
      showToast('Invalid email/username or password', 'error');
    }
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function handleSignup(event) {
  event.preventDefault();
  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;

  if (password !== confirmPassword) {
    showToast('Passwords do not match', 'error');
    return;
  }
  
  if (passwordStrength < 2) {
    showToast('Please use a stronger password', 'warning');
    return;
  }

  if (users.find(u => u.email === email || u.username === username)) {
    showToast('User with this email or username already exists', 'error');
    return;
  }

  try {
    await API.request('/auth/signup', { username, email, password }, {
      loadingText: 'Creating account...',
      cache: false
    });
    
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password,
      playlists: [],
      likedSongs: [],
      downloads: [],
      history: [],
      playCounts: {},
      totalListeningTime: 0,
      settings: {
        audioQuality: 'medium',
        downloadQuality: 'high',
        crossfade: 0,
        gaplessPlayback: true,
        normalizeAudio: false,
        publicProfile: true,
        showActivity: true,
        explicitFilter: false,
        autoDownloadLiked: false,
        theme: 'auto'
      },
      createdAt: new Date()
    };

    users.push(newUser);
    currentUser = newUser;
    
    showToast('Account created successfully! Verification email sent.', 'success', 5000);
    setTimeout(() => {
      showToast('Email verified automatically (simulation)', 'info');
    }, 2000);
    
    showMainApp();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function handleLogout() {
  try {
    await API.request('/auth/logout', null, {
      loadingText: 'Logging out...',
      cache: false
    });
    
    currentUser = null;
    currentSong = null;
    isPlaying = false;
    document.getElementById('auth-page').style.display = 'flex';
    document.getElementById('main-app').style.display = 'none';
    document.getElementById('music-player').style.display = 'none';
    
    showToast('Logged out successfully', 'success');
  } catch (error) {
    showToast(error.message, 'error');
  }
}

function showMainApp() {
  document.getElementById('auth-page').style.display = 'none';
  document.getElementById('main-app').style.display = 'grid';
  document.getElementById('user-name').textContent = currentUser.username;
  
  // Set initial volume on audio element and UI
  if (audio) {
    audio.volume = volume / 100;
  }
  const volumeSlider = document.getElementById('volume-slider');
  if (volumeSlider) {
    volumeSlider.value = volume;
  }
  updateVolumeIcon();
  
  initializeApp();
  
  // Show Enable Audio button after a short delay
  setTimeout(() => {
    const enableAudioBtn = document.createElement('button');
    enableAudioBtn.textContent = '🔊 Click Here to Enable Audio';
    enableAudioBtn.id = 'enable-audio-btn';
    enableAudioBtn.style.cssText = 'position:fixed;top:100px;left:50%;transform:translateX(-50%);z-index:10000;padding:20px 40px;background:#1FB8CD;color:white;border:none;border-radius:30px;font-size:18px;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.3);font-weight:600;';
    
    enableAudioBtn.addEventListener('click', function() {
      console.log('Enable audio button clicked');
      if (audio) {
        audio.load();
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            audio.pause();
            audio.currentTime = 0;
          }).catch(() => {});
        }
      }
      this.remove();
      showToast('Audio enabled! Now click any play button to start music.', 'success', 3000);
    });
    
    document.body.appendChild(enableAudioBtn);
  }, 500);
}

// ==================== SETTINGS ====================

function loadSettings() {
  if (!currentUser) return;
  
  document.getElementById('settings-username').value = currentUser.username;
  document.getElementById('settings-email').value = currentUser.email;
  document.getElementById('audio-quality').value = currentUser.settings.audioQuality;
  document.getElementById('download-quality').value = currentUser.settings.downloadQuality;
  document.getElementById('crossfade').value = currentUser.settings.crossfade;
  document.getElementById('crossfade-value').textContent = currentUser.settings.crossfade + 's';
  document.getElementById('gapless-playback').checked = currentUser.settings.gaplessPlayback;
  document.getElementById('normalize-audio').checked = currentUser.settings.normalizeAudio;
  document.getElementById('public-profile').checked = currentUser.settings.publicProfile;
  document.getElementById('show-activity').checked = currentUser.settings.showActivity;
  document.getElementById('explicit-filter').checked = currentUser.settings.explicitFilter;
  document.getElementById('auto-download-liked').checked = currentUser.settings.autoDownloadLiked;
  document.getElementById('theme-select').value = currentUser.settings.theme;
  
  updateStorageUsed();
}

function saveSettings() {
  if (!currentUser) return;
  
  currentUser.settings.audioQuality = document.getElementById('audio-quality').value;
  currentUser.settings.downloadQuality = document.getElementById('download-quality').value;
  currentUser.settings.crossfade = parseInt(document.getElementById('crossfade').value);
  document.getElementById('crossfade-value').textContent = currentUser.settings.crossfade + 's';
  currentUser.settings.gaplessPlayback = document.getElementById('gapless-playback').checked;
  currentUser.settings.normalizeAudio = document.getElementById('normalize-audio').checked;
  currentUser.settings.publicProfile = document.getElementById('public-profile').checked;
  currentUser.settings.showActivity = document.getElementById('show-activity').checked;
  currentUser.settings.explicitFilter = document.getElementById('explicit-filter').checked;
  currentUser.settings.autoDownloadLiked = document.getElementById('auto-download-liked').checked;
  
  showToast('Settings saved successfully', 'success');
}

function changeTheme() {
  const theme = document.getElementById('theme-select').value;
  currentUser.settings.theme = theme;
  
  if (theme === 'auto') {
    document.documentElement.removeAttribute('data-color-scheme');
  } else {
    document.documentElement.setAttribute('data-color-scheme', theme);
  }
  
  showToast('Theme changed to ' + theme, 'success');
}

function updateStorageUsed() {
  const downloadCount = currentUser.downloads.length;
  const avgSize = 5; // MB per song
  const used = downloadCount * avgSize;
  const total = 5000; // 5 GB
  document.getElementById('storage-used').textContent = `${used} MB / ${(total/1000).toFixed(1)} GB`;
}

function editProfile() {
  const newUsername = prompt('Enter new username:', currentUser.username);
  if (newUsername && newUsername.trim()) {
    currentUser.username = newUsername.trim();
    document.getElementById('user-name').textContent = currentUser.username;
    document.getElementById('settings-username').value = currentUser.username;
    showToast('Profile updated successfully', 'success');
  }
}

// ==================== STATISTICS ====================

function updateStatistics() {
  if (!currentUser) return;
  
  // Update basic stats
  document.getElementById('stat-total-plays').textContent = currentUser.history.length;
  document.getElementById('stat-total-time').textContent = Math.floor(currentUser.totalListeningTime / 60) + 'h';
  document.getElementById('stat-liked-songs').textContent = currentUser.likedSongs.length;
  document.getElementById('stat-playlists').textContent = currentUser.playlists.length;
  
  // Calculate top artists
  const artistCounts = {};
  currentUser.history.forEach(songId => {
    const song = musicLibrary.find(s => s.id === songId);
    if (song) {
      artistCounts[song.artist] = (artistCounts[song.artist] || 0) + 1;
    }
  });
  
  const topArtists = Object.entries(artistCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  document.getElementById('top-artists').innerHTML = topArtists.map((item, index) => `
    <div class="top-list-item">
      <div class="top-list-rank">${index + 1}</div>
      <div class="top-list-info">
        <div class="top-list-name">${item[0]}</div>
        <div class="top-list-detail">${item[1]} plays</div>
      </div>
    </div>
  `).join('') || '<p style="color: var(--color-text-secondary);">No data yet</p>';
  
  // Calculate top songs
  const songCounts = {};
  currentUser.history.forEach(songId => {
    songCounts[songId] = (songCounts[songId] || 0) + 1;
  });
  
  const topSongs = Object.entries(songCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(item => {
      const song = musicLibrary.find(s => s.id === parseInt(item[0]));
      return song ? { song, count: item[1] } : null;
    })
    .filter(Boolean);
  
  document.getElementById('top-songs').innerHTML = topSongs.map((item, index) => `
    <div class="top-list-item">
      <div class="top-list-rank">${index + 1}</div>
      <div class="top-list-info">
        <div class="top-list-name">${item.song.title}</div>
        <div class="top-list-detail">${item.song.artist} · ${item.count} plays</div>
      </div>
    </div>
  `).join('') || '<p style="color: var(--color-text-secondary);">No data yet</p>';
  
  // Calculate top genres
  const genreCounts = {};
  currentUser.history.forEach(songId => {
    const song = musicLibrary.find(s => s.id === songId);
    if (song) {
      genreCounts[song.genre] = (genreCounts[song.genre] || 0) + 1;
    }
  });
  
  const topGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  
  document.getElementById('top-genres').innerHTML = topGenres.map(item => `
    <div class="genre-stat-item">
      <div class="genre-stat-name">${item[0]}</div>
      <div class="genre-stat-count">${item[1]}</div>
    </div>
  `).join('') || '<p style="color: var(--color-text-secondary);">No data yet</p>';
}

// ==================== APP INITIALIZATION ====================

async function initializeApp() {
  try {
    console.log('=== STREAMIFY INITIALIZATION ===');
    console.log('Total songs in library:', musicLibrary.length);
    console.log('Using HTML5 audio element with working URLs');
    console.log('First 5 songs:', musicLibrary.slice(0, 5).map(s => ({ id: s.id, title: s.title })));
    
    await API.request('/app/init', null, {
      loadingText: 'Initializing app...',
      cache: false
    });
    
    renderFeaturedSongs();
    renderRecommendedSongs();
    renderTrendingSongs();
    renderRegionalCharts();
    renderGenres();
    renderLibrary();
    renderPlaylists();
    renderLikedSongs();
    renderDownloads();
    updateSidebarPlaylists();
    populateLanguageFilters();
    updateGlobalStats();
    loadSettings();
    updateStatistics();
    
    console.log('App initialized successfully');
    console.log('Audio ready:', audio ? 'Yes' : 'No');
    console.log('Click any song play button to start listening!');
    showToast('Welcome to Streamify! Click the Enable Audio button, then play any song.', 'success', 5000);
  } catch (error) {
    console.error('Init error:', error);
    showToast(error.message, 'error');
  }
}

function updateGlobalStats() {
  document.getElementById('total-songs-count').textContent = `${musicLibrary.length.toLocaleString()}+`;
}

function populateLanguageFilters() {
  const languageFilter = document.getElementById('language-filter');
  const searchLanguageFilter = document.getElementById('search-language-filter');
  
  const languageOptions = languages.map(lang => `<option value="${lang}">${lang}</option>`).join('');
  
  if (languageFilter) {
    languageFilter.innerHTML = '<option value="">All Languages</option>' + languageOptions;
  }
  if (searchLanguageFilter) {
    searchLanguageFilter.innerHTML = '<option value="">All Languages</option>' + languageOptions;
  }
}

function renderRegionalCharts() {
  // India Charts
  const indiaContainer = document.getElementById('india-charts');
  const indiaSongs = musicLibrary.filter(s => s.region === 'Asia' && (s.language === 'Hindi' || s.language === 'Tamil' || s.language === 'Punjabi' || s.language === 'Bengali')).slice(0, 6);
  if (indiaContainer) {
    indiaContainer.innerHTML = indiaSongs.map(song => createSongCard(song)).join('');
  }
  
  // Latin Hits
  const latinContainer = document.getElementById('latin-charts');
  const latinSongs = musicLibrary.filter(s => s.language === 'Spanish' || s.language === 'Portuguese').slice(0, 6);
  if (latinContainer) {
    latinContainer.innerHTML = latinSongs.map(song => createSongCard(song)).join('');
  }
  
  // K-Pop
  const kpopContainer = document.getElementById('kpop-charts');
  const kpopSongs = musicLibrary.filter(s => s.genre === 'K-Pop' || s.language === 'Korean').slice(0, 6);
  if (kpopContainer) {
    kpopContainer.innerHTML = kpopSongs.map(song => createSongCard(song)).join('');
  }
}

function renderFeaturedSongs() {
  const container = document.getElementById('featured-songs');
  const featured = musicLibrary.slice(0, 6);
  container.innerHTML = featured.map(song => createSongCard(song)).join('');
}

function renderRecommendedSongs() {
  const container = document.getElementById('recommended-songs');
  let recommended = [];

  if (currentUser.history.length > 0) {
    // Enhanced recommendation algorithm
    const genreWeights = {};
    const artistWeights = {};
    const languageWeights = {};
    
    // Calculate weights based on listening history (recent songs weighted more)
    currentUser.history.forEach((songId, index) => {
      const song = musicLibrary.find(s => s.id === songId);
      if (song) {
        const weight = index / currentUser.history.length; // Recency weight
        genreWeights[song.genre] = (genreWeights[song.genre] || 0) + weight;
        artistWeights[song.artist] = (artistWeights[song.artist] || 0) + weight;
        languageWeights[song.language] = (languageWeights[song.language] || 0) + weight;
      }
    });
    
    // Get top preferences
    const topGenres = Object.keys(genreWeights).sort((a, b) => genreWeights[b] - genreWeights[a]).slice(0, 3);
    const topArtists = Object.keys(artistWeights).sort((a, b) => artistWeights[b] - artistWeights[a]).slice(0, 3);
    const topLanguages = Object.keys(languageWeights).sort((a, b) => languageWeights[b] - languageWeights[a]).slice(0, 2);
    
    // Find songs matching preferences (excluding already played)
    const candidates = musicLibrary.filter(song => 
      !currentUser.history.includes(song.id) && (
        topGenres.includes(song.genre) ||
        topArtists.includes(song.artist) ||
        topLanguages.includes(song.language)
      )
    );
    
    // Score and sort candidates
    const scored = candidates.map(song => {
      let score = 0;
      if (topGenres.includes(song.genre)) score += 3;
      if (topArtists.includes(song.artist)) score += 2;
      if (topLanguages.includes(song.language)) score += 1;
      return { song, score };
    }).sort((a, b) => b.score - a.score);
    
    recommended = scored.slice(0, 6).map(item => item.song);
  }

  if (recommended.length === 0) {
    recommended = musicLibrary.slice(6, 12);
  }

  container.innerHTML = recommended.map(song => createSongCard(song)).join('');
}

function renderTrendingSongs() {
  const container = document.getElementById('trending-songs');
  // Mix of popular songs from different regions
  const trending = [
    ...musicLibrary.filter(s => s.language === 'English').slice(0, 2),
    ...musicLibrary.filter(s => s.language === 'Spanish').slice(0, 1),
    ...musicLibrary.filter(s => s.language === 'Korean').slice(0, 1),
    ...musicLibrary.filter(s => s.language === 'Hindi').slice(0, 1),
    ...musicLibrary.filter(s => s.language === 'Japanese').slice(0, 1)
  ];
  if (container) {
    container.innerHTML = trending.map(song => createSongCard(song)).join('');
  }
}

function renderGenres() {
  const container = document.getElementById('genre-grid');
  container.innerHTML = genres.map(genre => `
    <div class="genre-card" onclick="filterByGenre('${genre.name}')">
      <div class="genre-icon">${genre.icon}</div>
      <div class="genre-name">${genre.name}</div>
      <div class="genre-description">${genre.description}</div>
    </div>
  `).join('');
}

function renderLibrary() {
  const container = document.getElementById('library-songs');
  container.innerHTML = musicLibrary.map(song => createSongCard(song)).join('');
}

function renderPlaylists() {
  const container = document.getElementById('playlists-grid');
  if (currentUser.playlists.length === 0) {
    container.innerHTML = '<p style="color: var(--color-text-secondary);">No playlists yet. Create your first playlist!</p>';
    return;
  }
  container.innerHTML = currentUser.playlists.map(playlist => `
    <div class="playlist-card" onclick="showPlaylistDetail(${playlist.id})">
      <div class="playlist-cover">
        <i class="fas fa-music"></i>
      </div>
      <div class="playlist-name">${playlist.name}</div>
      <div class="playlist-description">${playlist.description || 'No description'}</div>
      <div class="playlist-count">${playlist.songs.length} songs</div>
    </div>
  `).join('');
}

function renderLikedSongs() {
  const container = document.getElementById('liked-songs');
  const likedSongs = musicLibrary.filter(song => currentUser.likedSongs.includes(song.id));
  if (likedSongs.length === 0) {
    container.innerHTML = '<p style="color: var(--color-text-secondary);">No liked songs yet. Start liking songs!</p>';
    return;
  }
  container.innerHTML = likedSongs.map(song => createSongCard(song)).join('');
}

function renderDownloads() {
  const container = document.getElementById('downloaded-songs');
  const downloads = musicLibrary.filter(song => currentUser.downloads.includes(song.id));
  if (downloads.length === 0) {
    container.innerHTML = '<p style="color: var(--color-text-secondary);">No downloaded songs yet. Start downloading!</p>';
    return;
  }
  container.innerHTML = downloads.map(song => createSongCard(song)).join('');
}

function createSongCard(song) {
  const isLiked = currentUser.likedSongs.includes(song.id);
  const isDownloaded = currentUser.downloads.includes(song.id);
  
  // Generate fallback cover URL with encoded title
  const encodedTitle = encodeURIComponent(song.title.substring(0, 20));
  const genreColors = {
    'Pop': '3498db', 'Rock': '34495e', 'Hip-Hop': '45B7D1', 'Classical': '95a5a6',
    'Electronic': 'f1c40f', 'Jazz': 'd35400', 'Country': 'F4A261', 'Bollywood': 'ff6b6b',
    'K-Pop': '9b59b6', 'Latin Pop': 'f39c12', 'J-Pop': '7f8c8d', 'Arabic Pop': 'ffcc33',
    'Reggae': '22dd22', 'Folk': 'D2B48C', 'Afropop': 'ff9933', 'R&B': '1f7f7f',
    'Sufi': 'c0392b', 'Patriotic': 'e74c3c', 'Chanson': '2980b9'
  };
  const bgColor = genreColors[song.genre] || '1FB8CD';
  const fallbackCover = `https://dummyimage.com/300x300/${bgColor}/ffffff&text=${encodedTitle}`;
  
  return `
    <div class="song-card">
      <div class="song-cover">
        <img src="${song.cover}" alt="${song.title}" 
             onerror="this.onerror=null; this.src='${fallbackCover}';" 
             loading="lazy">
      </div>
      <div class="song-title">${song.title}</div>
      <div class="song-artist">${song.artist}</div>
      <div class="song-actions">
        <button class="icon-btn" onclick="playSong(${song.id})" title="Play">
          <i class="fas fa-play"></i>
        </button>
        <button class="icon-btn ${isLiked ? 'active' : ''}" onclick="toggleLikeSong(${song.id})" title="Like">
          <i class="fas fa-heart"></i>
        </button>
        <button class="icon-btn" onclick="showAddToPlaylist(${song.id})" title="Add to playlist">
          <i class="fas fa-plus"></i>
        </button>
        <button class="icon-btn ${isDownloaded ? 'active' : ''}" onclick="downloadSong(${song.id})" title="Download">
          <i class="fas fa-download"></i>
        </button>
        <button class="icon-btn" onclick="event.stopPropagation(); shareSong(${song.id})" title="Share">
          <i class="fas fa-share-alt"></i>
        </button>
      </div>
    </div>
  `;
}

// ==================== NAVIGATION ====================

function showView(viewName) {
  const views = document.querySelectorAll('.content-view');
  views.forEach(view => view.classList.remove('active'));

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  const targetView = document.getElementById(`${viewName}-view`);
  if (targetView) {
    targetView.classList.add('active');
  }

  const activeNav = Array.from(navItems).find(item => item.getAttribute('onclick')?.includes(viewName));
  if (activeNav) {
    activeNav.classList.add('active');
  }

  currentView = viewName;

  // Re-render content if needed
  if (viewName === 'home') {
    renderRecommendedSongs();
  } else if (viewName === 'playlists') {
    renderPlaylists();
  } else if (viewName === 'liked') {
    renderLikedSongs();
  } else if (viewName === 'downloaded') {
    renderDownloads();
  } else if (viewName === 'library') {
    renderLibrary();
  } else if (viewName === 'statistics') {
    updateStatistics();
  } else if (viewName === 'settings') {
    loadSettings();
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

function toggleUserMenu() {
  const dropdown = document.getElementById('user-dropdown');
  dropdown.classList.toggle('active');
}

function toggleTheme() {
  const currentScheme = document.documentElement.getAttribute('data-color-scheme');
  if (currentScheme === 'dark') {
    document.documentElement.setAttribute('data-color-scheme', 'light');
  } else {
    document.documentElement.setAttribute('data-color-scheme', 'dark');
  }
}

function showProfile() {
  alert(`Profile: ${currentUser.username}\nEmail: ${currentUser.email}\nPlaylists: ${currentUser.playlists.length}\nLiked Songs: ${currentUser.likedSongs.length}`);
}

// ==================== SEARCH ====================

function handleSearch() {
  // Debounce search
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(performSearch, 500);
}

async function performSearch() {
  const query = document.getElementById('search-input').value.toLowerCase();
  if (query.length === 0) {
    if (currentView === 'search') {
      showView('home');
    }
    return;
  }

  const regionFilter = document.getElementById('search-region-filter')?.value || '';
  const languageFilter = document.getElementById('search-language-filter')?.value || '';

  let results = musicLibrary.filter(song =>
    song.title.toLowerCase().includes(query) ||
    song.artist.toLowerCase().includes(query) ||
    song.album.toLowerCase().includes(query) ||
    song.genre.toLowerCase().includes(query) ||
    song.language.toLowerCase().includes(query) ||
    song.region.toLowerCase().includes(query)
  );

  if (regionFilter) {
    results = results.filter(song => song.region === regionFilter);
  }
  
  if (languageFilter) {
    results = results.filter(song => song.language === languageFilter);
  }

  try {
    await API.request('/search', { query, regionFilter, languageFilter }, {
      loadingText: 'Searching...',
      showLoading: false
    });
    
    const container = document.getElementById('search-results');
    if (results.length === 0) {
      container.innerHTML = '<p style="color: var(--color-text-secondary);">No results found. Try different filters or search terms.</p>';
    } else {
      container.innerHTML = results.map(song => createSongCard(song)).join('');
      showToast(`Found ${results.length} results`, 'success');
    }

    showView('search');
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function applyFilters() {
  const regionFilter = document.getElementById('region-filter')?.value || '';
  const languageFilter = document.getElementById('language-filter')?.value || '';
  
  let filteredSongs = musicLibrary;
  
  if (regionFilter) {
    filteredSongs = filteredSongs.filter(song => song.region === regionFilter);
  }
  
  if (languageFilter) {
    filteredSongs = filteredSongs.filter(song => song.language === languageFilter);
  }
  
  try {
    await API.request('/browse/filter', { regionFilter, languageFilter }, {
      showLoading: false
    });
    
    const container = document.getElementById('browse-results');
    if (filteredSongs.length === 0) {
      container.innerHTML = '<p style="color: var(--color-text-secondary);">No songs found with selected filters.</p>';
    } else {
      container.innerHTML = filteredSongs.slice(0, 24).map(song => createSongCard(song)).join('');
      showToast(`Found ${filteredSongs.length} songs`, 'success');
    }
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function filterByGenre(genreName) {
  try {
    await API.request('/browse/genre', { genre: genreName }, {
      showLoading: false
    });
    
    selectedGenre = genreName;
    const songs = musicLibrary.filter(song => song.genre === genreName);
    const container = document.getElementById('browse-results');
    if (container) {
      container.innerHTML = songs.map(song => createSongCard(song)).join('');
      showToast(`Showing ${songs.length} ${genreName} songs`, 'success');
    }
    
    // Clear other filters
    const regionFilter = document.getElementById('region-filter');
    const languageFilter = document.getElementById('language-filter');
    if (regionFilter) regionFilter.value = '';
    if (languageFilter) languageFilter.value = '';
  } catch (error) {
    showToast(error.message, 'error');
  }
}

// ==================== MUSIC PLAYER ====================

async function playSong(songId, playlistSongs = null) {
  const song = musicLibrary.find(s => s.id === songId);
  if (!song) return;

  try {
    await API.request('/player/play', { songId }, {
      loadingText: 'Loading song...',
      cache: false,
      showLoading: false
    });
    
    console.log('=== PLAY SONG CALLED ===');
    console.log('Song:', song.title, 'by', song.artist);
    console.log('Song ID:', songId);
    
    // Set audio source to a working URL
    const audioUrl = getAudioUrl(songId);
    console.log('Setting audio src to:', audioUrl);
    audio.src = audioUrl;
    
    // Stop current playback
    audio.pause();
    audio.currentTime = 0;
    
    currentSong = song;

    // Add to history
    currentUser.history.push(songId);
    
    // Track play count
    currentUser.playCounts[songId] = (currentUser.playCounts[songId] || 0) + 1;
    
    // Update listening time
    duration = parseDuration(song.duration);
    currentUser.totalListeningTime += duration;

    // Set up playlist
    if (playlistSongs) {
      currentPlaylist = playlistSongs;
      currentPlaylistIndex = currentPlaylist.findIndex(id => id === songId);
    } else if (currentPlaylist.length === 0) {
      currentPlaylist = musicLibrary.map(s => s.id);
      currentPlaylistIndex = currentPlaylist.findIndex(id => id === songId);
    } else {
      currentPlaylistIndex = currentPlaylist.findIndex(id => id === songId);
    }
    
    // Load and play
    audio.load();
    
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('✓✓✓ AUDIO IS PLAYING! ✓✓✓');
          isPlaying = true;
          updatePlayerUI();
          showToast('Now playing: ' + song.title, 'success', 2000);
        })
        .catch(error => {
          console.error('❌ Play failed:', error);
          showToast('Play failed: ' + error.message + '. Please click play again.', 'error');
          isPlaying = false;
        });
    }
    
    updateStatistics();
    
    // Update recommended songs after play
    if (currentView === 'home') {
      renderRecommendedSongs();
    }
  } catch (error) {
    console.error('Play song error:', error);
    showToast('Failed to play song: ' + error.message, 'error');
  }
}

function updatePlayerUI() {
  if (!currentSong) return;

  const player = document.getElementById('music-player');
  player.style.display = 'flex';
  
  const coverImg = document.getElementById('player-cover');
  coverImg.src = currentSong.cover;
  coverImg.onerror = function() {
    console.warn('Player cover failed to load, using fallback');
    const encodedTitle = encodeURIComponent(currentSong.title.substring(0, 15));
    this.src = `https://dummyimage.com/60x60/1FB8CD/ffffff&text=${encodedTitle}`;
  };
  
  document.getElementById('player-title').textContent = currentSong.title;
  document.getElementById('player-artist').textContent = currentSong.artist;
  document.getElementById('total-time').textContent = formatTime(duration);
  document.getElementById('current-time').textContent = formatTime(Math.floor(currentTime));

  const playBtn = document.getElementById('play-btn');
  const isAudioPlaying = audio && !audio.paused;
  playBtn.innerHTML = isAudioPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';

  const likeBtn = document.getElementById('like-btn');
  likeBtn.innerHTML = currentUser.likedSongs.includes(currentSong.id) ?
    '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';

  document.getElementById('shuffle-btn').classList.toggle('active', isShuffle);
  document.getElementById('repeat-btn').classList.toggle('active', repeatMode > 0);
  
  console.log('Player UI updated - Playing:', isPlaying);
}

function togglePlay() {
  if (!currentSong) return;
  
  if (audio.paused) {
    audio.play()
      .then(() => {
        console.log('✓ Playing');
        isPlaying = true;
        updatePlayerUI();
      })
      .catch(err => {
        console.error('❌ Play error:', err);
        showToast('Play error: ' + err.message, 'error');
      });
  } else {
    audio.pause();
    console.log('⏸️ Paused');
    isPlaying = false;
    updatePlayerUI();
  }
}

function nextSong() {
  if (currentPlaylist.length === 0) return;
  
  if (isShuffle) {
    currentPlaylistIndex = Math.floor(Math.random() * currentPlaylist.length);
  } else {
    currentPlaylistIndex = (currentPlaylistIndex + 1) % currentPlaylist.length;
  }

  playSong(currentPlaylist[currentPlaylistIndex]);
}

function previousSong() {
  if (currentPlaylist.length === 0) return;
  
  currentPlaylistIndex = currentPlaylistIndex - 1;
  if (currentPlaylistIndex < 0) {
    currentPlaylistIndex = currentPlaylist.length - 1;
  }

  playSong(currentPlaylist[currentPlaylistIndex]);
}

function toggleShuffle() {
  isShuffle = !isShuffle;
  document.getElementById('shuffle-btn').classList.toggle('active', isShuffle);
}

function toggleRepeat() {
  repeatMode = (repeatMode + 1) % 3;
  const repeatBtn = document.getElementById('repeat-btn');
  if (repeatMode === 0) {
    repeatBtn.classList.remove('active');
    repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
  } else if (repeatMode === 1) {
    repeatBtn.classList.add('active');
    repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
  } else {
    repeatBtn.classList.add('active');
    repeatBtn.innerHTML = '<i class="fas fa-redo"></i><span style="font-size: 10px;">1</span>';
  }
}

function toggleLike() {
  if (!currentSong) return;
  toggleLikeSong(currentSong.id);
}

async function toggleLikeSong(songId) {
  const index = currentUser.likedSongs.indexOf(songId);
  const isLiking = index === -1;
  
  try {
    await API.request('/songs/like', { songId, action: isLiking ? 'like' : 'unlike' }, {
      showLoading: false,
      cache: false
    });
    
    if (index > -1) {
      currentUser.likedSongs.splice(index, 1);
      showToast('Removed from liked songs', 'success');
    } else {
      currentUser.likedSongs.push(songId);
      showToast('Added to liked songs', 'success');
      
      // Auto-download if enabled
      if (currentUser.settings.autoDownloadLiked && !currentUser.downloads.includes(songId)) {
        setTimeout(() => downloadSong(songId), 500);
      }
    }
    
    updatePlayerUI();
    renderLikedSongs();
    updateStatistics();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

function seekTo(event) {
  if (!currentSong || !audio.duration) return;
  
  const progressBar = event.currentTarget;
  const rect = progressBar.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const width = rect.width;
  const seekTime = (clickX / width) * audio.duration;
  
  audio.currentTime = seekTime;
  console.log('Seeked to:', seekTime);
}

function changeVolume() {
  const slider = document.getElementById('volume-slider');
  if (!slider) return;
  
  volume = parseInt(slider.value);
  audio.volume = volume / 100;
  isMuted = false;
  updateVolumeIcon();
  
  console.log('Volume changed to:', volume + '%');
}

function toggleMute() {
  isMuted = !isMuted;
  audio.volume = isMuted ? 0 : volume / 100;
  updateVolumeIcon();
}

function updateVolumeIcon() {
  const btn = document.getElementById('volume-btn');
  if (isMuted || volume == 0) {
    btn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else if (volume < 50) {
    btn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    btn.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
}

// Remove simulatePlayback - using real audio now

function parseDuration(duration) {
  const parts = duration.split(':');
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function toggleQueue() {
  const modal = document.getElementById('queue-modal');
  modal.classList.toggle('active');

  if (modal.classList.contains('active')) {
    renderQueue();
  }
}

function renderQueue() {
  const container = document.getElementById('queue-list');
  const queueSongs = currentPlaylist.map(id => musicLibrary.find(s => s.id === id)).filter(Boolean);

  if (queueSongs.length === 0) {
    container.innerHTML = '<p style="color: var(--color-text-secondary); text-align: center; padding: 20px;">Queue is empty</p>';
    return;
  }

  container.innerHTML = queueSongs.map((song, index) => `
    <div class="song-list-item ${currentPlaylistIndex === index ? 'active' : ''}" onclick="playSong(${song.id})">
      <div class="song-list-cover">
        <img src="${song.cover}" alt="${song.title}" loading="lazy">
      </div>
      <div class="song-list-info">
        <div class="song-title">${song.title}</div>
        <div class="song-artist">${song.artist}</div>
      </div>
      <div class="song-list-actions">
        <span style="color: var(--color-text-secondary);">${song.duration}</span>
      </div>
    </div>
  `).join('');
}

// ==================== PLAYLISTS ====================

function showCreatePlaylist() {
  closeModal('add-to-playlist-modal');
  openModal('create-playlist-modal');
  document.getElementById('playlist-name').value = '';
  document.getElementById('playlist-description').value = '';
  document.getElementById('playlist-public').checked = false;
}

async function createPlaylist(event) {
  event.preventDefault();
  const name = document.getElementById('playlist-name').value;
  const description = document.getElementById('playlist-description').value;
  const isPublic = document.getElementById('playlist-public').checked;

  try {
    await API.request('/playlists/create', { name, description, isPublic }, {
      loadingText: 'Creating playlist...',
      cache: false
    });
    
    const playlist = {
      id: Date.now(),
      name,
      description,
      songs: songToAdd ? [songToAdd] : [],
      isPublic,
      collaborative: false,
      followers: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    currentUser.playlists.push(playlist);
    closeModal('create-playlist-modal');
    renderPlaylists();
    updateSidebarPlaylists();
    updateStatistics();
    songToAdd = null;
    
    showToast('Playlist created successfully', 'success');

    if (currentView === 'playlists') {
      showView('playlists');
    }
  } catch (error) {
    showToast(error.message, 'error');
  }
}

function showAddToPlaylist(songId) {
  songToAdd = songId;
  openModal('add-to-playlist-modal');
  renderPlaylistList();
}

function renderPlaylistList() {
  const container = document.getElementById('playlist-list');
  if (currentUser.playlists.length === 0) {
    container.innerHTML = '<p style="color: var(--color-text-secondary); text-align: center; padding: 20px;">No playlists yet</p>';
    return;
  }

  container.innerHTML = currentUser.playlists.map(playlist => `
    <div class="playlist-list-item" onclick="addToPlaylist(${playlist.id})">
      <i class="fas fa-music" style="color: var(--color-primary);"></i>
      <div>
        <div style="font-weight: 500;">${playlist.name}</div>
        <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">${playlist.songs.length} songs</div>
      </div>
    </div>
  `).join('');
}

async function addToPlaylist(playlistId) {
  const playlist = currentUser.playlists.find(p => p.id === playlistId);
  if (!playlist) return;

  if (playlist.songs.includes(songToAdd)) {
    showToast('Song already in playlist', 'warning');
    closeModal('add-to-playlist-modal');
    return;
  }

  try {
    await API.request('/playlists/add', { playlistId, songId: songToAdd }, {
      showLoading: false,
      cache: false
    });
    
    playlist.songs.push(songToAdd);
    playlist.updatedAt = new Date();

    closeModal('add-to-playlist-modal');
    songToAdd = null;
    renderPlaylists();
    
    showToast('Added to ' + playlist.name, 'success');
  } catch (error) {
    showToast(error.message, 'error');
  }
}

function updateSidebarPlaylists() {
  const container = document.getElementById('sidebar-playlists-list');
  container.innerHTML = currentUser.playlists.map(playlist => `
    <a href="#" class="sidebar-playlist-item" onclick="showPlaylistDetail(${playlist.id}); return false;">
      ${playlist.name}
    </a>
  `).join('');
}

function showPlaylistDetail(playlistId) {
  selectedPlaylist = currentUser.playlists.find(p => p.id === playlistId);
  if (!selectedPlaylist) return;

  document.getElementById('playlist-detail-name').textContent = selectedPlaylist.name;
  document.getElementById('playlist-detail-desc').textContent = selectedPlaylist.description || 'No description';
  document.getElementById('playlist-detail-count').textContent = selectedPlaylist.songs.length;

  const container = document.getElementById('playlist-detail-songs');
  const songs = selectedPlaylist.songs.map(id => musicLibrary.find(s => s.id === id)).filter(Boolean);

  if (songs.length === 0) {
    container.innerHTML = '<p style="color: var(--color-text-secondary); text-align: center; padding: 20px;">No songs in this playlist</p>';
  } else {
    container.innerHTML = songs.map(song => `
      <div class="song-list-item" onclick="playSong(${song.id}, [${selectedPlaylist.songs.join(',')}])">
        <div class="song-list-cover">
          <img src="${song.cover}" alt="${song.title}" onerror="this.style.display='none'">
        </div>
        <div class="song-list-info">
          <div class="song-title">${song.title}</div>
          <div class="song-artist">${song.artist}</div>
        </div>
        <div class="song-list-actions">
          <button class="icon-btn" onclick="event.stopPropagation(); removeFromPlaylist(${song.id})" title="Remove">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  showView('playlist-detail');
}

function playPlaylist() {
  if (!selectedPlaylist || selectedPlaylist.songs.length === 0) return;
  playSong(selectedPlaylist.songs[0], selectedPlaylist.songs);
}

async function removeFromPlaylist(songId) {
  if (!selectedPlaylist) return;
  
  try {
    await API.request('/playlists/remove', { playlistId: selectedPlaylist.id, songId }, {
      showLoading: false,
      cache: false
    });
    
    const index = selectedPlaylist.songs.indexOf(songId);
    if (index > -1) {
      selectedPlaylist.songs.splice(index, 1);
      selectedPlaylist.updatedAt = new Date();
      showPlaylistDetail(selectedPlaylist.id);
      renderPlaylists();
      showToast('Removed from playlist', 'success');
    }
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function showEditPlaylist() {
  if (!selectedPlaylist) return;
  const newName = prompt('Enter new playlist name:', selectedPlaylist.name);
  if (newName && newName.trim()) {
    try {
      await API.request('/playlists/update', { 
        playlistId: selectedPlaylist.id, 
        name: newName.trim() 
      }, {
        showLoading: false,
        cache: false
      });
      
      selectedPlaylist.name = newName.trim();
      const newDesc = prompt('Enter new description:', selectedPlaylist.description);
      if (newDesc !== null) {
        selectedPlaylist.description = newDesc.trim();
      }
      selectedPlaylist.updatedAt = new Date();
      showPlaylistDetail(selectedPlaylist.id);
      renderPlaylists();
      updateSidebarPlaylists();
      showToast('Playlist updated', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
  }
}

function showLibraryTab(tab) {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');

  const container = document.getElementById('library-songs');
  if (tab === 'all') {
    container.innerHTML = musicLibrary.map(song => createSongCard(song)).join('');
  } else if (tab === 'recent') {
    const recentSongs = currentUser.history.slice(-12).reverse()
      .map(id => musicLibrary.find(s => s.id === id))
      .filter(Boolean);
    if (recentSongs.length === 0) {
      container.innerHTML = '<p style="color: var(--color-text-secondary);">No recently played songs</p>';
    } else {
      container.innerHTML = recentSongs.map(song => createSongCard(song)).join('');
    }
  }
}

// ==================== DOWNLOAD ====================

async function downloadSong(songId) {
  const song = musicLibrary.find(s => s.id === songId);
  if (!song) return;

  if (currentUser.downloads.includes(songId)) {
    showToast('Already downloaded', 'info');
    return;
  }
  
  // Check storage limit (5GB = ~1000 songs at 5MB each)
  if (currentUser.downloads.length >= 1000) {
    showToast('Storage limit reached. Delete some downloads first.', 'warning');
    return;
  }

  document.getElementById('download-song-name').textContent = `${song.title} - ${song.artist}`;
  openModal('download-modal');

  let progress = 0;
  const quality = currentUser.settings.downloadQuality;
  const interval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      document.getElementById('download-status').textContent = 'Download complete!';
      currentUser.downloads.push(songId);
      setTimeout(() => {
        closeModal('download-modal');
        renderDownloads();
        updateStorageUsed();
        showToast('Downloaded in ' + quality + ' quality', 'success');
      }, 1000);
    }
    document.getElementById('download-progress').style.width = progress + '%';
    document.getElementById('download-status').textContent = `Downloading (${quality})... ${Math.floor(progress)}%`;
  }, 300);
}

// ==================== MODALS ====================

function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

// Close modals when clicking outside
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('active');
  }
});

// ==================== INITIALIZATION ====================

// ==================== KEYBOARD SHORTCUTS ====================

document.addEventListener('keydown', (e) => {
  // Space bar - play/pause
  if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    e.preventDefault();
    togglePlay();
  }
  
  // Arrow keys - next/previous
  if (e.code === 'ArrowRight' && e.ctrlKey) {
    e.preventDefault();
    nextSong();
  }
  if (e.code === 'ArrowLeft' && e.ctrlKey) {
    e.preventDefault();
    previousSong();
  }
  
  // L key - like current song
  if (e.code === 'KeyL' && e.ctrlKey && currentSong) {
    e.preventDefault();
    toggleLike();
  }
  
  // S key - shuffle
  if (e.code === 'KeyS' && e.ctrlKey) {
    e.preventDefault();
    toggleShuffle();
  }
  
  // R key - repeat
  if (e.code === 'KeyR' && e.ctrlKey) {
    e.preventDefault();
    toggleRepeat();
  }
  
  // M key - mute
  if (e.code === 'KeyM' && e.ctrlKey) {
    e.preventDefault();
    toggleMute();
  }
});

// ==================== AUTO-SAVE ====================

// Periodically save user data
setInterval(() => {
  if (currentUser) {
    console.log('[AUTO-SAVE] User data saved');
    // In a real app, this would sync to backend
  }
}, 30000); // Every 30 seconds

// ==================== NETWORK STATUS ====================

let isOnline = true;

window.addEventListener('online', () => {
  isOnline = true;
  showToast('Back online', 'success');
  API.clearCache();
});

window.addEventListener('offline', () => {
  isOnline = false;
  showToast('You are offline. Downloaded songs still available.', 'warning', 5000);
});

// ==================== ERROR HANDLING WITH RETRY ====================

async function retryRequest(requestFn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = Math.pow(2, i) * 1000; // Exponential backoff
      showToast(`Request failed. Retrying in ${delay/1000}s...`, 'warning');
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// ==================== PERFORMANCE OPTIMIZATIONS ====================

// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  // Observe images when they're added
  const observeImages = () => {
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  };
  
  // Run on load and when content changes
  window.addEventListener('load', observeImages);
}

// ==================== ADVANCED PLAYER FEATURES ====================

let sleepTimer = null;

function setSleepTimer(minutes) {
  if (sleepTimer) {
    clearTimeout(sleepTimer);
  }
  
  if (minutes > 0) {
    sleepTimer = setTimeout(() => {
      if (isPlaying) {
        togglePlay();
        showToast('Sleep timer ended', 'info');
      }
      sleepTimer = null;
    }, minutes * 60 * 1000);
    
    showToast(`Sleep timer set for ${minutes} minutes`, 'success');
  }
}

function showSleepTimerDialog() {
  const minutes = prompt('Set sleep timer (minutes):', '30');
  if (minutes && !isNaN(minutes)) {
    setSleepTimer(parseInt(minutes));
  }
}

// Add sleep timer button to player (would need UI update)
if (document.getElementById('music-player')) {
  // Could add button dynamically here
}

// ==================== SHARE FUNCTIONALITY ====================

function shareSong(songId) {
  const song = musicLibrary.find(s => s.id === songId);
  if (!song) return;
  
  const shareUrl = `${window.location.origin}${window.location.pathname}#song/${songId}`;
  const shareText = `Check out "${song.title}" by ${song.artist} on Streamify!`;
  
  if (navigator.share) {
    navigator.share({
      title: song.title,
      text: shareText,
      url: shareUrl
    }).then(() => {
      showToast('Shared successfully', 'success');
    }).catch(() => {
      copyToClipboard(shareUrl);
    });
  } else {
    copyToClipboard(shareUrl);
  }
}

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    showToast('Link copied to clipboard', 'success');
  } catch (err) {
    showToast('Could not copy link', 'error');
  }
  
  document.body.removeChild(textarea);
}

// ==================== EXPORT PLAYLIST ====================

function exportPlaylist(playlistId) {
  const playlist = currentUser.playlists.find(p => p.id === playlistId);
  if (!playlist) return;
  
  const songs = playlist.songs.map(id => {
    const song = musicLibrary.find(s => s.id === id);
    return song ? `${song.title} - ${song.artist}` : '';
  }).filter(Boolean);
  
  const exportData = {
    name: playlist.name,
    description: playlist.description,
    songs: songs,
    createdAt: playlist.createdAt,
    songCount: songs.length
  };
  
  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${playlist.name.replace(/[^a-z0-9]/gi, '_')}.json`;
  link.click();
  
  URL.revokeObjectURL(url);
  showToast('Playlist exported', 'success');
}

// ========== ENABLE AUDIO BUTTON ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
  console.log('=== STREAMIFY LOADED ===');
  console.log('Audio element:', audio);
  console.log('Total songs:', musicLibrary.length);
  console.log('Working audio URLs:', workingAudioUrls.length);
  
  // Wait for ANY user interaction to initialize audio
  document.addEventListener('click', function initAudioOnFirstClick() {
    if (!userHasInteracted) {
      userHasInteracted = true;
      if (audio) {
        audio.load();
        console.log('✓ Audio initialized on user interaction');
      }
    }
  }, { once: true });
});

// Check for demo account quick login
if (window.location.hash === '#demo') {
  document.getElementById('login-email').value = 'demo';
  document.getElementById('login-password').value = 'demo123';
}

// Handle deep links
if (window.location.hash.startsWith('#song/')) {
  const songId = parseInt(window.location.hash.split('/')[1]);
  if (songId) {
    // Will play after login
    window.autoPlaySongId = songId;
  }
}

// Play song from deep link after login
if (currentUser && window.autoPlaySongId) {
  playSong(window.autoPlaySongId);
  delete window.autoPlaySongId;
}