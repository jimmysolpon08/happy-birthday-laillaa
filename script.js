// ===================================================
// Ultra-Smooth 90fps Touch-Driven Birthday Experience
// Seamless 4-Season Collage: One-by-One Spawn & Flare Bloom
// + Cute 5-Second Countdown Video Scene After Collage
// ===================================================

document.addEventListener('DOMContentLoaded', function () {
  var stage = document.getElementById('stage');
  var collageContainer = document.getElementById('collageContainer');
  var particlesContainer = document.getElementById('particles');
  var seasonalPetalsContainer = document.getElementById('seasonalPetals');

  var videoScene = document.getElementById('videoScene');
  var birthdayVideo = document.getElementById('birthdayVideo');
  var countdownNumber = document.getElementById('countdownNumber');
  var arrivalBurst = document.getElementById('arrivalBurst');
  var birthdayMsg = document.getElementById('birthdayMessageOverlay');
  var videoBgHearts = document.getElementById('videoBgHearts');
  var bgAudio = document.getElementById('bgAudio');
  if (bgAudio) {
    bgAudio.volume = 1.0;
  }

  function playAudio() {
    if (!bgAudio) return;
    if (currentState < 4) {
      var promise = bgAudio.play();
      if (promise !== undefined) {
        promise.catch(function (err) {
          console.warn("Autoplay was prevented by browser:", err);
        });
      }
    }
  }

  // Attempt initial playback immediately
  playAudio();

  // Modern browsers strictly block unmuted audio until ANY user interaction.
  // We capture any pointerdown, click, touch, or key interaction immediately.
  function unlockAudio() {
    playAudio();
    ['pointerdown', 'touchstart', 'mousedown', 'click', 'keydown'].forEach(function (name) {
      window.removeEventListener(name, unlockAudio, true);
      document.removeEventListener(name, unlockAudio, true);
    });
  }

  ['pointerdown', 'touchstart', 'mousedown', 'click', 'keydown'].forEach(function (name) {
    window.addEventListener(name, unlockAudio, { capture: true, passive: true });
    document.addEventListener(name, unlockAudio, { capture: true, passive: true });
  });

  var panels = [
    document.getElementById('panelAutumn'),
    document.getElementById('panelJacaranda'),
    document.getElementById('panelBeach'),
    document.getElementById('panelLake')
  ];

  var currentState = 0;
  var autoTimer = null;
  var spawnStepTimer = null;
  var finaleTimer = null;
  var currentSpawnIndex = 0;
  var isActionLocked = false;
  var bounceActive = false;
  var videoCountdownHold = null;
  var videoCountdownFade = null;

  function createSparkles(count) {
    count = count || 12;
    particlesContainer.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var p = document.createElement('div');
      p.className = 'particle';
      p.style.left = (Math.floor(Math.random() * 88) + 6) + '%';
      p.style.top = (Math.floor(Math.random() * 75) + 20) + '%';
      var sz = (Math.floor(Math.random() * 3) + 2.5) + 'px';
      p.style.width = sz;
      p.style.height = sz;
      p.style.setProperty('--delay', (Math.random() * 2).toFixed(2) + 's');
      fragment.appendChild(p);
    }
    particlesContainer.appendChild(fragment);
  }

  function spawnAutumnLeaves(count) {
    if (!seasonalPetalsContainer) return;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < (count || 6); i++) {
      var el = document.createElement('div');
      el.className = 'seasonal-particle particle-autumn-leaf';
      el.style.left = (Math.floor(Math.random() * 42) + 4) + '%';
      el.style.top = (Math.floor(Math.random() * 38) + 4) + '%';
      el.style.animationDuration = (3.4 + Math.random() * 2.2).toFixed(2) + 's';
      el.style.animationDelay = (Math.random() * 1.5).toFixed(2) + 's';
      frag.appendChild(el);
    }
    seasonalPetalsContainer.appendChild(frag);
  }

  function spawnJacarandaPetals(count) {
    if (!seasonalPetalsContainer) return;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < (count || 6); i++) {
      var el = document.createElement('div');
      el.className = 'seasonal-particle particle-jacaranda-petal';
      el.style.left = (Math.floor(Math.random() * 42) + 52) + '%';
      el.style.top = (Math.floor(Math.random() * 38) + 4) + '%';
      el.style.animationDuration = (3.6 + Math.random() * 2.0).toFixed(2) + 's';
      el.style.animationDelay = (Math.random() * 1.8).toFixed(2) + 's';
      frag.appendChild(el);
    }
    seasonalPetalsContainer.appendChild(frag);
  }

  function spawnBeachSparkles(count) {
    if (!seasonalPetalsContainer) return;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < (count || 7); i++) {
      var el = document.createElement('div');
      el.className = 'seasonal-particle particle-golden-sparkle';
      var s2 = Math.floor(Math.random() * 4) + 3;
      el.style.width = s2 + 'px';
      el.style.height = s2 + 'px';
      el.style.left = (Math.floor(Math.random() * 42) + 4) + '%';
      el.style.top = (Math.floor(Math.random() * 42) + 52) + '%';
      el.style.animationDuration = (2.0 + Math.random() * 1.6).toFixed(2) + 's';
      el.style.animationDelay = (Math.random() * 1.5).toFixed(2) + 's';
      frag.appendChild(el);
    }
    seasonalPetalsContainer.appendChild(frag);
  }

  function spawnSakuraPetals(count) {
    if (!seasonalPetalsContainer) return;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < (count || 6); i++) {
      var el = document.createElement('div');
      el.className = 'seasonal-particle particle-sakura-petal';
      el.style.left = (Math.floor(Math.random() * 42) + 52) + '%';
      el.style.top = (Math.floor(Math.random() * 42) + 52) + '%';
      el.style.animationDuration = (3.5 + Math.random() * 2.0).toFixed(2) + 's';
      el.style.animationDelay = (Math.random() * 1.6).toFixed(2) + 's';
      frag.appendChild(el);
    }
    seasonalPetalsContainer.appendChild(frag);
  }

  function spawnFirstOverlay() {
    if (isActionLocked) return;
    isActionLocked = true;
    currentState = 1;

    playAudio();

    stage.classList.add('spawned');
    createSparkles(12);
    setTimeout(function () { isActionLocked = false; }, 350);
    autoTimer = setTimeout(function () {
      if (currentState === 1) startPanoramicSequence();
    }, 2800);
  }

  function startPanoramicSequence() {
    if (currentState >= 2) return;
    currentState = 2;
    isActionLocked = true;
    clearTimeout(autoTimer);
    clearTimeout(spawnStepTimer);
    clearTimeout(finaleTimer);
    stage.classList.add('collage-active');
    collageContainer.classList.add('active');
    panels.forEach(function (p) { if (p) p.classList.remove('spawned'); });
    currentSpawnIndex = 0;
    setTimeout(function () { spawnNextPanel(); }, 150);
  }

  function spawnNextPanel() {
    if (currentSpawnIndex >= panels.length) { triggerFinale(); return; }
    var index = currentSpawnIndex;
    var panel = panels[index];
    currentSpawnIndex++;
    if (panel) {
      panel.classList.add('spawned');
      if (index === 0) spawnAutumnLeaves(5);
      else if (index === 1) spawnJacarandaPetals(6);
      else if (index === 2) spawnBeachSparkles(7);
      else if (index === 3) spawnSakuraPetals(6);
    }
    if (currentSpawnIndex < panels.length) {
      spawnStepTimer = setTimeout(function () { spawnNextPanel(); }, 850);
    } else {
      finaleTimer = setTimeout(function () { triggerFinale(); }, 750);
    }
  }

  function spawnNextPanelImmediately() {
    clearTimeout(spawnStepTimer);
    clearTimeout(finaleTimer);
    spawnNextPanel();
  }

  function triggerFinale() {
    clearTimeout(spawnStepTimer);
    clearTimeout(finaleTimer);
    panels.forEach(function (p) { if (p) p.classList.add('spawned'); });
    collageContainer.classList.add('all-spawned');
    currentState = 3;
    setTimeout(function () {
      isActionLocked = false;
      startVideoScene();
    }, 1800);
  }

  var HEARTS_LIST = ['💕', '💖', '💗', '🌸', '🌺', '🎀', '⭐', '💞', '🌹', '✨'];
  var BURST_LIST = ['💕', '🎁', '🌸', '✨', '💖', '⭐', '🎀', '🌺', '🎊', '🌹'];
  var CRACKER_LIST = ['🎆', '🎇', '✨', '🎊', '🎉', '🧨', '🪅', '🎆', '🎇', '🎊', '🎉', '✨', '🎆', '🧨', '🎇', '🎉', '🎊', '✨', '🪅', '🎆'];
  var crackerInterval = null;

  function spawnVideoBgHearts() {
    videoBgHearts.innerHTML = '';
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 14; i++) {
      var h = document.createElement('div');
      h.className = 'vid-heart';
      h.textContent = HEARTS_LIST[i % HEARTS_LIST.length];
      h.style.left = (Math.floor(Math.random() * 90) + 5) + '%';
      h.style.bottom = Math.floor(Math.random() * 30) + '%';
      h.style.setProperty('--dur', (3.5 + Math.random() * 3).toFixed(2) + 's');
      h.style.setProperty('--del', (Math.random() * 4).toFixed(2) + 's');
      frag.appendChild(h);
    }
    videoBgHearts.appendChild(frag);
  }

  function triggerArrivalBurst() {
    arrivalBurst.innerHTML = '';
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 12; i++) {
      var el = document.createElement('div');
      el.className = 'burst-heart';
      el.textContent = BURST_LIST[i % BURST_LIST.length];
      el.style.left = (10 + Math.random() * 80) + '%';
      el.style.top = (20 + Math.random() * 60) + '%';
      el.style.fontSize = (14 + Math.random() * 18) + 'px';
      el.style.animationDelay = (Math.random() * 0.45).toFixed(2) + 's';
      frag.appendChild(el);
    }
    arrivalBurst.appendChild(frag);
  }

  // === VIDEO-SYNCED OVERLAY SYSTEM ===
  // Uses video timeupdate for pixel-perfect sync with video timestamps
  var vidTimeHandler = null;
  var shownNumbers = {};
  var bdayShown = false;
  var bdayHidden = false;
  var floatingActive = false;
  var floatingTimer = null;

  // Timestamp map: video second → countdown number to flash
  var STAMP_MAP = { 1: 5, 2: 4, 4: 3, 6: 2, 8: 1 };

  function flashNumber(num) {
    clearTimeout(videoCountdownHold);
    clearTimeout(videoCountdownFade);
    countdownNumber.className = 'countdown-number';
    countdownNumber.textContent = String(num);
    void countdownNumber.offsetWidth;
    countdownNumber.classList.add('pop-in');
    videoCountdownHold = setTimeout(function () {
      countdownNumber.classList.remove('pop-in');
      countdownNumber.classList.add('pop-out');
      videoCountdownFade = setTimeout(function () {
        countdownNumber.className = 'countdown-number';
        countdownNumber.textContent = '';
      }, 200);
    }, 750);
  }

  // Floating celebration words (14-17s)
  var FLOAT_WORDS = ['Yayy!', 'Yippee!', 'HBD!', 'Yayyy!', 'Woohoo!', 'Hehe!', 'Yayy!', 'Yippee!'];
  var FLOAT_COLORS = ['#ff6eb4', '#c084fc', '#fbbf24', '#34d399', '#fb7185', '#60a5fa', '#f97316', '#e879f9', '#a3e635', '#f472b6'];
  var FLOAT_FONTS = [
    "'Pacifico', cursive",
    "'Dancing Script', cursive",
    "'Comic Sans MS', cursive",
    "'Georgia', serif",
    "'Trebuchet MS', sans-serif"
  ];

  function spawnFloatingWord() {
    var el = document.createElement('div');
    el.className = 'floating-word';
    el.textContent = FLOAT_WORDS[Math.floor(Math.random() * FLOAT_WORDS.length)];
    el.style.color = FLOAT_COLORS[Math.floor(Math.random() * FLOAT_COLORS.length)];
    el.style.fontFamily = FLOAT_FONTS[Math.floor(Math.random() * FLOAT_FONTS.length)];
    el.style.fontSize = (11 + Math.random() * 14) + 'px';
    el.style.left = (4 + Math.random() * 86) + '%';
    el.style.top = (6 + Math.random() * 78) + '%';
    var dur = (1.8 + Math.random() * 1.4).toFixed(2);
    el.style.setProperty('--fdur', dur + 's');
    el.style.setProperty('--fdy', -(30 + Math.random() * 60).toFixed(0) + 'px');
    videoScene.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, parseFloat(dur) * 1000 + 400);
  }

  function startFloatingWords() {
    floatingActive = true;
    // Initial burst
    for (var k = 0; k < 14; k++) {
      setTimeout(spawnFloatingWord, k * 180);
    }
    // Keep spawning
    floatingTimer = setInterval(spawnFloatingWord, 250);
    // Stop at 3s (17-14=3)
    setTimeout(function () {
      clearInterval(floatingTimer);
      floatingTimer = null;
    }, 3000);
  }

  function onVideoTimeUpdate() {
    var t = Math.floor(birthdayVideo.currentTime);

    // Countdown numbers synced to timestamps
    if (t >= 1 && !shownNumbers[5]) { shownNumbers[5] = true; flashNumber(5); }
    if (t >= 2 && !shownNumbers[4]) { shownNumbers[4] = true; flashNumber(4); }
    if (t >= 4 && !shownNumbers[3]) { shownNumbers[3] = true; flashNumber(3); }
    if (t >= 6 && !shownNumbers[2]) { shownNumbers[2] = true; flashNumber(2); }
    if (t >= 8 && !shownNumbers[1]) { shownNumbers[1] = true; flashNumber(1); }

    // 10-12s: "Happy Birthday Love" overlay (no bg)
    if (t >= 10 && !bdayShown) {
      bdayShown = true;
      birthdayMsg.classList.add('show');
    }
    if (t >= 12 && !bdayHidden && bdayShown) {
      bdayHidden = true;
      birthdayMsg.classList.remove('show');
    }

    // 14-17s: floating cute words
    if (t >= 14 && !floatingActive) {
      startFloatingWords();
    }
  }

  function startVideoScene() {
    currentState = 4;
    // Stop background audio as countdown video begins
    if (bgAudio) {
      bgAudio.pause();
      bgAudio.currentTime = 0;
    }
    // Reset sync state
    shownNumbers = {};
    bdayShown = false;
    bdayHidden = false;
    floatingActive = false;
    clearInterval(floatingTimer);
    floatingTimer = null;

    videoScene.classList.add('active');
    spawnVideoBgHearts();
    countdownNumber.className = 'countdown-number';
    countdownNumber.textContent = '';
    birthdayMsg.classList.remove('show');
    arrivalBurst.innerHTML = '';

    // Remove any stale listener before attaching
    birthdayVideo.removeEventListener('timeupdate', onVideoTimeUpdate);
    birthdayVideo.addEventListener('timeupdate', onVideoTimeUpdate);
    birthdayVideo.currentTime = 0;
    birthdayVideo.play().catch(function () { });
  }

  function resetAll() {
    if (isActionLocked) return;
    isActionLocked = true;
    clearTimeout(autoTimer);
    clearTimeout(spawnStepTimer);
    clearTimeout(finaleTimer);
    clearTimeout(videoCountdownHold);
    clearTimeout(videoCountdownFade);
    clearInterval(floatingTimer);
    floatingTimer = null;
    birthdayVideo.removeEventListener('timeupdate', onVideoTimeUpdate);
    videoScene.classList.remove('active');
    birthdayMsg.classList.remove('show');
    birthdayVideo.pause();
    birthdayVideo.currentTime = 0;
    countdownNumber.className = 'countdown-number';
    countdownNumber.textContent = '';
    arrivalBurst.innerHTML = '';
    videoBgHearts.innerHTML = '';
    // Remove any floating words
    var floaters = videoScene.querySelectorAll('.floating-word');
    floaters.forEach(function (f) { f.parentNode && f.parentNode.removeChild(f); });
    collageContainer.classList.remove('active');
    collageContainer.classList.remove('all-spawned');
    stage.classList.remove('spawned');
    stage.classList.remove('collage-active');
    setTimeout(function () {
      panels.forEach(function (p) { if (p) p.classList.remove('spawned'); });
      particlesContainer.innerHTML = '';
      if (seasonalPetalsContainer) seasonalPetalsContainer.innerHTML = '';
      currentSpawnIndex = 0;
      currentState = 0;
      isActionLocked = false;
      playAudio();
    }, 600);
  }

  panels.forEach(function (panel) {
    if (!panel) return;
    panel.addEventListener('pointerdown', function (e) {
      if (currentState !== 3) return;
      e.stopPropagation();
      bounceActive = true;
      panel.classList.add('tapped');
      setTimeout(function () {
        panel.classList.remove('tapped');
        setTimeout(function () { bounceActive = false; }, 150);
      }, 450);
    });
  });

  function handleTap(e) {
    playAudio();
    if (e) e.preventDefault();
    if (currentState === 0) {
      spawnFirstOverlay();
    } else if (currentState === 1) {
      startPanoramicSequence();
    } else if (currentState === 2) {
      spawnNextPanelImmediately();
    } else if (currentState === 3) {
      // auto-transitioning to video
    } else if (currentState === 4) {
      if (!isActionLocked) resetAll();
    }
  }

  stage.addEventListener('pointerup', handleTap, { passive: false });
});
