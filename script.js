// script.js - Calming Sanctuary Interactive Controller

document.addEventListener("DOMContentLoaded", () => {
  initGreetings();
  initBreathingWidget();
  initAdmirationCards();
  initSupportTabs();
  initLoveNoteJar();
  initSecretGarden();
  initPolaroidScrapbook();
  initEnvelopeOpener();
  initScrollSpy();
  initAudioSynth();
  initThemeToggle();
  initSecretHeart();
  initPetals();
  initBirthdayFeature();
});

/* FALLING PETALS */
function initPetals() {
  const container = document.getElementById('petals-container');
  if (!container) return;

  const types = ['🌸', '🌸', '🌸', '🌷', '🌼'];
  const count = 22;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = types[Math.floor(Math.random() * types.length)];

    const size     = (0.7 + Math.random() * 1.1).toFixed(2);
    const left     = (Math.random() * 100).toFixed(1);
    const duration = (10 + Math.random() * 14).toFixed(1);
    const delay    = (-Math.random() * 20).toFixed(1); // already mid-fall on load
    const sway     = ((Math.random() - 0.5) * 180).toFixed(0);
    const rot      = (180 + Math.random() * 360).toFixed(0);

    petal.style.cssText = `
      font-size: ${size}rem;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      --sway: ${sway}px;
      --rot: ${rot}deg;
    `;

    container.appendChild(petal);
  }
}

/* 2. TIME-AWARE GREETING & HERO WELCOME */
function initGreetings() {
  const greetingEl = document.getElementById("greeting-text");
  const messageEl = document.getElementById("welcome-message");
  
  if (!greetingEl || !messageEl) return;
  
  const hour = new Date().getHours();
  let greetingText = "";
  
  if (hour >= 5 && hour < 12) {
    greetingText = CONFIG.greetings.morning;
  } else if (hour >= 12 && hour < 17) {
    greetingText = CONFIG.greetings.afternoon;
  } else if (hour >= 17 && hour < 21) {
    greetingText = CONFIG.greetings.evening;
  } else {
    greetingText = CONFIG.greetings.night;
  }
  
  greetingEl.innerHTML = greetingText;
  messageEl.innerHTML = CONFIG.welcomeMessage;
}

/* 3. GUIDED BREATHING WIDGET (4-7-8 Rhythm) */
function initBreathingWidget() {
  const openBtn = document.getElementById("start-breathing-btn");
  const overlay = document.getElementById("breathing-overlay");
  const closeBtn = document.getElementById("close-breathing-btn");
  const circle = document.getElementById("breathing-circle");
  const instruction = document.getElementById("breathing-instruction");
  
  if (!openBtn || !overlay || !closeBtn || !circle || !instruction) return;
  
  let breathingTimeout;
  let isBreathingActive = false;
  
  function setBreathingState(state, text, nextDuration, callback) {
    if (!isBreathingActive) return;
    
    // Remove existing states
    circle.className = "breathing-circle";
    // Trigger layout reflow to restart transition
    void circle.offsetWidth;
    // Add current state class
    circle.classList.add(state);
    instruction.textContent = text;
    
    breathingTimeout = setTimeout(callback, nextDuration);
  }
  
  function breathingCycle() {
    if (!isBreathingActive) return;
    
    // 1. Inhale (4 seconds)
    setBreathingState("inhale", "Breathe In...", 4000, () => {
      // 2. Hold (7 seconds)
      setBreathingState("hold", "Hold...", 7000, () => {
        // 3. Exhale (8 seconds)
        setBreathingState("exhale", "Breathe Out...", 8000, () => {
          // Restart cycle
          breathingCycle();
        });
      });
    });
  }
  
  openBtn.addEventListener("click", () => {
    overlay.classList.add("active");
    isBreathingActive = true;
    breathingCycle();
  });
  
  function stopBreathing() {
    overlay.classList.remove("active");
    isBreathingActive = false;
    clearTimeout(breathingTimeout);
    circle.className = "breathing-circle";
    instruction.textContent = "";
  }
  
  closeBtn.addEventListener("click", stopBreathing);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      stopBreathing();
    }
  });
}

/* 4. ADMIRATION CARDS FLIP */
function initAdmirationCards() {
  const grid = document.getElementById("admire-cards-grid");
  if (!grid) return;
  
  // Render cards from CONFIG
  grid.innerHTML = "";
  CONFIG.admireCards.forEach((card) => {
    const cardEl = document.createElement("div");
    cardEl.className = "admire-card";
    
    cardEl.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <h3>${card.title}</h3>
          <span class="card-tap-hint">Tap to flip</span>
        </div>
        <div class="card-back">
          <p>${card.detail}</p>
        </div>
      </div>
    `;
    
    // Toggle flip class
    cardEl.addEventListener("click", () => {
      cardEl.classList.toggle("flipped");
    });
    
    grid.appendChild(cardEl);
  });
}

/* 5. HARD TIMES TABS */
function initSupportTabs() {
  const tabContainer = document.getElementById("support-tabs");
  const contentEl = document.getElementById("support-message");
  
  if (!tabContainer || !contentEl) return;
  
  const tabs = [
    { id: "exams", label: "Exams Stress", icon: "📚" },
    { id: "work", label: "Tiring Shift", icon: "💼" },
    { id: "home", label: "Missing Home", icon: "🏠" },
    { id: "overwhelmed", label: "Overwhelmed", icon: "😔" }
  ];
  
  tabContainer.innerHTML = "";
  
  tabs.forEach((tab, index) => {
    const btn = document.createElement("button");
    btn.className = "tab-btn";
    if (index === 0) btn.classList.add("active");
    btn.dataset.id = tab.id;
    
    btn.innerHTML = `
      <span class="tab-icon">${tab.icon}</span>
      <span class="tab-text">${tab.label}</span>
    `;
    
    btn.addEventListener("click", () => {
      // Toggle active classes
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      // Update text with animation
      const message = CONFIG.hardTimes[tab.id];
      contentEl.innerHTML = `<p class="support-message">${message}</p>`;
    });
    
    tabContainer.appendChild(btn);
  });
  
  // Set initial text
  contentEl.innerHTML = `<p class="support-message">${CONFIG.hardTimes.exams}</p>`;
}

/* 6. THE LOVE NOTE JAR */
function initLoveNoteJar() {
  const jarSvg = document.getElementById("love-jar-svg");
  const displayEl = document.getElementById("jar-note-display");
  const foldedHeart = document.getElementById("folded-heart");
  const noteContent = document.getElementById("jar-note-content");
  
  if (!jarSvg || !displayEl || !foldedHeart || !noteContent) return;
  
  let lastNoteIndex = -1;
  let isUnfolded = false;
  let currentNote = "";
  
  jarSvg.addEventListener("click", () => {
    // Trigger shake animation
    jarSvg.classList.add("shake");
    
    // Hide previous note content while shaking/spawning
    noteContent.classList.remove("visible");
    foldedHeart.classList.remove("unfolded");
    displayEl.classList.remove("active");
    isUnfolded = false;
    
    setTimeout(() => {
      jarSvg.classList.remove("shake");
      
      // Select a random romantic note
      const notes = CONFIG.loveNotes;
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * notes.length);
      } while (randomIndex === lastNoteIndex && notes.length > 1);
      
      lastNoteIndex = randomIndex;
      currentNote = notes[randomIndex];
      
      // Display the heart note container
      displayEl.classList.add("active");
    }, 600);
  });
  
  foldedHeart.addEventListener("click", () => {
    if (isUnfolded) return;
    isUnfolded = true;
    
    // Unfold heart
    foldedHeart.classList.add("unfolded");
    
    // Show the message content
    setTimeout(() => {
      noteContent.textContent = currentNote;
      noteContent.classList.add("visible");
    }, 450);
  });
}

/* 7. GROW A SECRET GARDEN OF PROMISES */
function initSecretGarden() {
  const pots = document.querySelectorAll(".garden-pot");
  const promiseBox = document.getElementById("garden-promise-box");
  if (!pots.length || !promiseBox) return;
  
  pots.forEach(pot => {
    const waterBtn = pot.querySelector(".water-btn");
    const flowerType = pot.dataset.flower;
    
    if (!waterBtn) return;
    
    waterBtn.addEventListener("click", () => {
      if (pot.classList.contains("bloomed")) return;
      
      // Create water droplet element above pot
      const droplet = document.createElement("span");
      droplet.className = "water-droplet";
      droplet.textContent = "💧";
      // Center it horizontally
      droplet.style.left = "calc(50% - 10px)";
      pot.appendChild(droplet);
      
      // Wait for droplet animation, then grow
      setTimeout(() => {
        droplet.remove();
        pot.classList.add("bloomed");
        
        // Show promise message
        const promise = CONFIG.gardenPromises[flowerType];
        promiseBox.innerHTML = `<strong>${pot.querySelector(".pot-label").textContent}:</strong> ${promise}`;
        promiseBox.classList.add("visible");
      }, 800);
    });
  });
}

/* 7.5. OUR POLAROID SCRAPBOOK */
function initPolaroidScrapbook() {
  const grid = document.getElementById("polaroid-grid");
  if (!grid) return;
  
  grid.innerHTML = "";
  CONFIG.scrapbookMemories.forEach(memory => {
    const card = document.createElement("div");
    card.className = "polaroid-card";
    
    card.innerHTML = `
      <div class="polaroid-inner">
        <div class="polaroid-front">
          <div class="polaroid-photo-area">${memory.emoji}</div>
          <div class="polaroid-caption">${memory.title}</div>
        </div>
        <div class="polaroid-back">
          <p class="polaroid-back-text">${memory.caption}</p>
        </div>
      </div>
    `;
    
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
    
    grid.appendChild(card);
  });
}

/* 8. ENVELOPE OPENER */
function initEnvelopeOpener() {
  const envelope = document.getElementById("envelope-wrapper");
  const paperCard = document.getElementById("envelope-paper-card");
  
  if (!envelope || !paperCard) return;
  
  // Render letter from CONFIG
  paperCard.innerHTML = `
    <h3 class="letter-title">${CONFIG.finalLetter.title}</h3>
    <div class="letter-body">${CONFIG.finalLetter.content}</div>
  `;
  
  envelope.addEventListener("click", function handler() {
    if (!envelope.classList.contains("open")) {
      envelope.classList.add("open");
      // Prevent further trigger clicks unless we want to reset
      envelope.style.cursor = "default";
    }
  });
}

/* 9. SCROLL SPY & INTERSECTION OBSERVER */
function initScrollSpy() {
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-item");
  
  // Fade sections in as they appear
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.15 });
  
  sections.forEach(section => {
    fadeObserver.observe(section);
  });
  
  // Highlight navigation dock items based on active section
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute("id");
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });
}

/* 10. WEB AUDIO API LOFI MUSIC SYNTHESIZER */
function initAudioSynth() {
  const musicBtn = document.getElementById("audio-music-btn");
  if (!musicBtn) return;

  let audioCtx = null;

  function ensureAudioContext(callback) {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume().then(callback);
    } else {
      callback();
    }
  }


  // 2. LOFI CHORD SYNTHESIZER
  // Spread voicing across 3 octaves for fullness
  const CHORDS = [
    [110.00, 220.00, 261.63, 329.63, 392.00], // Am7
    [87.31,  174.61, 220.00, 261.63, 349.23], // Fmaj7
    [130.81, 261.63, 329.63, 392.00, 493.88], // Cmaj7
    [98.00,  196.00, 246.94, 293.66, 369.99], // G
  ];
  // A minor pentatonic for melody
  const PENTATONIC = [440, 523.25, 587.33, 659.25, 783.99, 880.00];
  const CHORD_DUR = 8;

  let isMusicPlaying = false;
  let musicBus = null;
  let musicLoopTimer = null;
  let crackleSource = null;
  let crackleGainNode = null;

  function playChord(freqs, t) {
    const g = audioCtx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.09, t + 2);
    g.gain.setValueAtTime(0.09, t + CHORD_DUR - 2);
    g.gain.linearRampToValueAtTime(0, t + CHORD_DUR);
    g.connect(musicBus);

    freqs.forEach((freq, i) => {
      const stagger = i * 0.07; // slight strum feel

      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const og = audioCtx.createGain();
      og.gain.value = 0.5;
      osc.connect(og); og.connect(g);
      osc.start(t + stagger); osc.stop(t + CHORD_DUR + 0.1);

      // Quiet detuned sawtooth adds harmonic body
      const osc2 = audioCtx.createOscillator();
      osc2.type = 'sawtooth';
      osc2.frequency.value = freq * 1.006;
      const og2 = audioCtx.createGain();
      og2.gain.value = 0.07;
      osc2.connect(og2); og2.connect(g);
      osc2.start(t + stagger); osc2.stop(t + CHORD_DUR + 0.1);
    });
  }

  function playMelodyNote(freq, t) {
    const g = audioCtx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.07, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.001, t + 2.2);
    g.connect(musicBus);

    // Tiny pitch slide at attack = organic pluck character
    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 1.018, t);
    osc.frequency.exponentialRampToValueAtTime(freq, t + 0.06);
    osc.connect(g);
    osc.start(t); osc.stop(t + 2.5);

    // Quiet overtone for bell shimmer
    const osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = freq * 2.003;
    const g2 = audioCtx.createGain();
    g2.gain.setValueAtTime(0, t);
    g2.gain.linearRampToValueAtTime(0.018, t + 0.01);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
    g2.connect(musicBus);
    osc2.connect(g2);
    osc2.start(t); osc2.stop(t + 1);
  }

  function scheduleMelody(barStart) {
    if (!isMusicPlaying) return;
    const count = 4 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      const t = barStart + 1.5 + i * (CHORD_DUR / count) + (Math.random() - 0.5) * 0.5;
      const freq = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)];
      playMelodyNote(freq, t);
    }
  }

  function scheduleLoop(t) {
    if (!isMusicPlaying) return;
    CHORDS.forEach((chord, i) => {
      playChord(chord, t + i * CHORD_DUR);
      scheduleMelody(t + i * CHORD_DUR);
    });
    const total = CHORDS.length * CHORD_DUR;
    musicLoopTimer = setTimeout(() => scheduleLoop(t + total), (total - 1) * 1000);
  }

  function startLofi() {
    musicBus = audioCtx.createGain();
    musicBus.gain.value = 1;

    // 900 Hz lowpass = the defining muffled warmth of lofi
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    filter.Q.value = 0.7;

    const delay = audioCtx.createDelay(0.5);
    delay.delayTime.value = 0.38;
    const fb = audioCtx.createGain();
    fb.gain.value = 0.28;
    const delayOut = audioCtx.createGain();
    delayOut.gain.value = 0.22;

    musicBus.connect(filter);
    musicBus.connect(delay);
    delay.connect(fb);
    fb.connect(delay);
    delay.connect(delayOut);
    delayOut.connect(filter);
    filter.connect(audioCtx.destination);

    // Vinyl crackle: sparse random impulses
    const buf = audioCtx.createBuffer(1, 2 * audioCtx.sampleRate, audioCtx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() < 0.0003 ? (Math.random() * 2 - 1) : 0;
    }
    crackleSource = audioCtx.createBufferSource();
    crackleSource.buffer = buf;
    crackleSource.loop = true;
    crackleGainNode = audioCtx.createGain();
    crackleGainNode.gain.value = 0.035;
    crackleSource.connect(crackleGainNode);
    crackleGainNode.connect(audioCtx.destination);
    crackleSource.start();

    isMusicPlaying = true;
    musicBtn.classList.add("active");
    scheduleLoop(audioCtx.currentTime + 0.05);
  }

  function stopLofi() {
    isMusicPlaying = false;
    clearTimeout(musicLoopTimer);
    if (musicBus) {
      try {
        musicBus.gain.setValueAtTime(musicBus.gain.value, audioCtx.currentTime);
        musicBus.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.0);
      } catch (e) {
        musicBus.gain.value = 0;
      }
      const localBus = musicBus;
      setTimeout(() => {
        try { localBus.disconnect(); } catch (e) {}
        if (musicBus === localBus) musicBus = null;
      }, 1100);
    }
    if (crackleGainNode) {
      try {
        crackleGainNode.gain.setValueAtTime(crackleGainNode.gain.value, audioCtx.currentTime);
        crackleGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.0);
      } catch (e) {
        crackleGainNode.gain.value = 0;
      }
      const localCrackle = crackleSource;
      const localCrackleGain = crackleGainNode;
      setTimeout(() => {
        try { localCrackle.stop(); } catch (e) {}
        try { localCrackleGain.disconnect(); } catch (e) {}
        crackleSource = null;
        crackleGainNode = null;
      }, 1100);
    }
    musicBtn.classList.remove("active");
  }

  function toggleMusic() {
    if (!isMusicPlaying) {
      ensureAudioContext(() => startLofi());
    } else {
      stopLofi();
    }
  }
  
  // Splash entry: clicking the overlay starts music and dismisses the screen
  let splashDismissed = false;
  const splash = document.getElementById('splash-overlay');
  if (splash) {
    splash.addEventListener('click', (e) => {
      if (e.target.closest('.theme-toggle-btn')) return;
      if (splashDismissed) return;
      splashDismissed = true;
      
      ensureAudioContext(() => startLofi());
      splash.classList.add('fade-out');
      applyTheme(); // restore saved preference as splash fades out
      setTimeout(() => splash.remove(), 1200);
    });
  }

  // --- BIRTHDAY TUNE SYNTHESIZER ---
  function playMusicBoxNote(freq, startTime) {
    if (!audioCtx) return;
    
    const osc = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const gainNode2 = audioCtx.createGain();
    
    // Sine wave + bell overtone decay
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.002, startTime);
    
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.12, startTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 1.5);
    
    gainNode2.gain.setValueAtTime(0, startTime);
    gainNode2.gain.linearRampToValueAtTime(0.04, startTime + 0.005);
    gainNode2.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);
    
    osc.connect(gainNode);
    osc2.connect(gainNode2);
    
    gainNode.connect(audioCtx.destination);
    gainNode2.connect(audioCtx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + 1.6);
    osc2.start(startTime);
    osc2.stop(startTime + 0.7);
  }

  function playBirthdaySong(onFinished) {
    ensureAudioContext(() => {
      const now = audioCtx.currentTime;
      
      const melody = [
        { note: 392.00, time: 0 },
        { note: 392.00, time: 0.375 },
        { note: 440.00, time: 0.5 },
        { note: 392.00, time: 1.0 },
        { note: 523.25, time: 1.5 },
        { note: 493.88, time: 2.0 },
        
        { note: 392.00, time: 3.2 },
        { note: 392.00, time: 3.575 },
        { note: 440.00, time: 3.7 },
        { note: 392.00, time: 4.2 },
        { note: 587.33, time: 4.7 },
        { note: 523.25, time: 5.2 },
        
        { note: 392.00, time: 6.4 },
        { note: 392.00, time: 6.775 },
        { note: 783.99, time: 6.9 },
        { note: 659.25, time: 7.4 },
        { note: 523.25, time: 7.9 },
        { note: 493.88, time: 8.4 },
        { note: 440.00, time: 8.9 },
        
        { note: 698.46, time: 10.1 },
        { note: 698.46, time: 10.475 },
        { note: 659.25, time: 10.6 },
        { note: 523.25, time: 11.1 },
        { note: 587.33, time: 11.6 },
        { note: 523.25, time: 12.1 }
      ];
      
      melody.forEach(item => {
        playMusicBoxNote(item.note, now + item.time);
      });
      
      if (onFinished) {
        setTimeout(onFinished, 13800);
      }
    });
  }

  function pauseLofiForBirthday(callback) {
    const wasPlaying = isMusicPlaying;
    if (wasPlaying && musicBus) {
      // Fade out lofi
      musicBus.gain.setValueAtTime(musicBus.gain.value, audioCtx.currentTime);
      musicBus.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.8);
      
      // Stop scheduler loop
      isMusicPlaying = false;
      clearTimeout(musicLoopTimer);
    }
    
    // Play music box Happy Birthday
    playBirthdaySong(() => {
      if (wasPlaying) {
        // Fade in lofi
        isMusicPlaying = true;
        musicBus.gain.setValueAtTime(0, audioCtx.currentTime);
        musicBus.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 1.2);
        scheduleLoop(audioCtx.currentTime + 0.05);
      }
      if (callback) callback();
    });
  }

  window.pauseLofiForBirthday = pauseLofiForBirthday;

  musicBtn.addEventListener("click", toggleMusic);
}

/* 11. DARK MODE TOGGLE CONTROLLER */
function applyTheme() {
  const isDark = localStorage.getItem("theme") === "dark";
  document.body.classList.toggle("dark-mode", isDark);
  document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
    btn.textContent = isDark ? "☀️" : "🌙";
  });
}

function initThemeToggle() {
  const themeBtns = document.querySelectorAll(".theme-toggle-btn");
  if (!themeBtns.length) return;

  // Splash always shows in light mode — saved theme applied on entry (see splash handler)
  themeBtns.forEach(btn => btn.textContent = "🌙");

  themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      document.querySelectorAll(".theme-toggle-btn").forEach(b => b.textContent = isDark ? "☀️" : "🌙");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  });
}

/* 12. SECRET HEART & "OPEN WHEN" CARD RENDERER */
function initSecretHeart() {
  const trigger = document.getElementById("secret-heart-trigger");
  const section = document.getElementById("secret-section");
  const grid = document.getElementById("open-when-grid");
  
  if (!trigger || !section || !grid) return;
  
  trigger.addEventListener("click", () => {
    if (section.classList.contains("revealed")) {
      section.classList.remove("revealed");
    } else {
      section.classList.add("revealed");
      
      // Render cards dynamically if not yet done
      if (grid.children.length === 0) {
        grid.innerHTML = "";
        CONFIG.openWhen.cards.forEach(card => {
          const cardEl = document.createElement("div");
          cardEl.className = "admire-card";
          
          cardEl.innerHTML = `
            <div class="card-inner">
              <div class="card-front">
                <h3>Open when you...</h3>
                <p style="color: var(--accent-pink); font-family: var(--font-serif); font-style: italic; font-weight: 500; margin-top: 8px;">${card.title}</p>
                <span class="card-tap-hint" style="margin-top: 15px;">Tap to open</span>
              </div>
              <div class="card-back" style="padding: 20px; font-size: 0.88rem; overflow-y: auto; display: flex; align-items: center; justify-content: center; text-align: center;">
                <p>${card.content}</p>
              </div>
            </div>
          `;
          
          cardEl.addEventListener("click", () => {
            cardEl.classList.toggle("flipped");
          });
          
          grid.appendChild(cardEl);
        });
      }
      
      // Scroll smoothly down to the hidden section
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  });
}

/* ==========================================
   BIRTHDAY FEATURE CONTROLLER
   ========================================== */
function initBirthdayFeature() {
  const splashCountdownContainer = document.getElementById("splash-countdown-container");
  const birthdaySection = document.getElementById("birthday-section");
  const birthdayLetterContent = document.getElementById("birthday-letter-content");
  
  if (!CONFIG.birthdayDate) return;
  
  const today = new Date();
  const currentYear = today.getFullYear();
  
  // Timezone-safe local date parsing (supports YYYY-MM-DD and MM-DD)
  const parts = CONFIG.birthdayDate.split("-").map(Number);
  let birthMonth = 0; // 0-indexed (Jan = 0)
  let birthDay = 1;
  
  if (parts.length === 3) {
    // YYYY-MM-DD
    birthMonth = parts[1] - 1;
    birthDay = parts[2];
  } else if (parts.length === 2) {
    // MM-DD
    birthMonth = parts[0] - 1;
    birthDay = parts[1];
  }
  
  // Check if today matches month and day (local timezone)
  const isBirthdayToday = (today.getMonth() === birthMonth && today.getDate() === birthDay);
  
  // Determine target birthday year
  let targetBirthday = new Date(currentYear, birthMonth, birthDay);
  
  // If birthday has already passed this year (and isn't today), roll target year forward
  if (targetBirthday.getTime() < today.getTime() && !isBirthdayToday) {
    targetBirthday = new Date(currentYear + 1, birthMonth, birthDay);
  }

  // Helper function to play note
  function playBirthdayChime(freq, duration = 0.6, volume = 0.1) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch(e) {}
  }

  if (isBirthdayToday) {
    // ------------------------------------
    // BIRTHDAY MODE (TODAY)
    // ------------------------------------
    if (splashCountdownContainer) splashCountdownContainer.classList.add("hidden-element");
    if (birthdaySection) birthdaySection.classList.remove("hidden-section");
    
    // Update Hero Greetings
    const greetingEl = document.getElementById("greeting-text");
    const messageEl = document.getElementById("welcome-message");
    if (greetingEl && CONFIG.birthdayGreeting) {
      greetingEl.innerHTML = CONFIG.birthdayGreeting;
    }
    if (messageEl && CONFIG.birthdayWelcome) {
      messageEl.innerHTML = CONFIG.birthdayWelcome;
    }
    
    // Update Entry Splash Overlay bouquet-message if it exists
    const splashMessage = document.querySelector(".bouquet-message");
    if (splashMessage) {
      splashMessage.innerHTML = `
        <p style="font-size: 1.4rem; color: var(--accent-pink); font-family: var(--font-serif); margin-bottom: 8px;">Happy Birthday, Baby! 🎂</p>
        <p>I wish I could be there to celebrate with you today…</p>
        <p>so I built this little sanctuary to keep you warm.</p>
      `;
    }

    // Populate birthday letter
    if (birthdayLetterContent && CONFIG.birthdayLetter) {
      birthdayLetterContent.innerHTML = CONFIG.birthdayLetter;
    }

    // Background Confetti Rain
    setInterval(() => {
      spawnBirthdayConfetti(1, false);
    }, 450);

    // Candle blow-out logic
    const candles = document.querySelectorAll(".candle");
    let blownOutCount = 0;
    
    candles.forEach((candle, idx) => {
      candle.addEventListener("click", () => {
        if (candle.classList.contains("extinguished")) return;
        
        candle.classList.add("extinguished");
        blownOutCount++;
        
        // Blow out smoke puff animation
        const puff = document.createElement("span");
        puff.className = "smoke-puff";
        puff.textContent = "💨";
        candle.appendChild(puff);
        setTimeout(() => puff.remove(), 1500);
        
        // Play melodic chime note (ascending pentatonic scale)
        const scale = [261.63, 293.66, 329.63, 392.00, 440.00];
        playBirthdayChime(scale[idx % scale.length], 0.8, 0.08);

        // If all candles blown out
        if (blownOutCount === candles.length) {
          setTimeout(() => {
            // Play Synthesized Birthday Music Box (with fade transitions)
            if (window.pauseLofiForBirthday) {
              window.pauseLofiForBirthday();
            } else {
              // Fallback
              const arpeggio = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
              arpeggio.forEach((freq, aIdx) => {
                setTimeout(() => {
                  playBirthdayChime(freq, 1.2, 0.08);
                }, aIdx * 100);
              });
            }

            // Burst confetti
            const cakeWrapper = document.querySelector(".cake-wrapper");
            let originX = window.innerWidth / 2;
            let originY = window.innerHeight / 2;
            if (cakeWrapper) {
              const cakeRect = cakeWrapper.getBoundingClientRect();
              originX = cakeRect.left + cakeRect.width / 2;
              originY = cakeRect.top + cakeRect.height / 2;
            }
            
            spawnBirthdayConfetti(80, true, originX, originY);

            // Show letter & wish form
            const wishCard = document.getElementById("birthday-wish-card");
            if (wishCard) {
              wishCard.classList.remove("hidden-element");
              // Force layout reflow
              void wishCard.offsetWidth;
              wishCard.classList.add("visible");
              wishCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
          }, 800);
        }
      });
    });

    // Wish form submission
    const sendWishBtn = document.getElementById("send-wish-btn");
    const wishInput = document.getElementById("wish-input");
    const wishFeedback = document.getElementById("wish-feedback");
    
    if (sendWishBtn && wishInput) {
      sendWishBtn.addEventListener("click", () => {
        const wishText = wishInput.value.trim();
        if (!wishText) return;
        
        wishInput.disabled = true;
        sendWishBtn.disabled = true;
        
        // Spawn floating heart note animation
        const heart = document.createElement("div");
        heart.className = "floating-wish-heart";
        heart.textContent = "💖";
        
        // Random sway variables
        const swayX = (Math.random() - 0.5) * 200;
        heart.style.setProperty('--sway-x', `${swayX}px`);
        
        // Position heart over button / input
        const btnRect = sendWishBtn.getBoundingClientRect();
        heart.style.left = `${btnRect.left + btnRect.width/2}px`;
        heart.style.top = `${btnRect.top}px`;
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
        
        // Show feedback
        if (wishFeedback) {
          wishFeedback.classList.remove("hidden-element");
        }
        
        wishInput.value = "";
      });
    }

  } else {
    // ------------------------------------
    // COUNTDOWN MODE (FUTURE BIRTHDAY)
    // ------------------------------------
    if (birthdaySection) birthdaySection.classList.add("hidden-section");
    if (splashCountdownContainer) splashCountdownContainer.classList.remove("hidden-element");
    
    function updateCountdown() {
      const now = new Date();
      const timeRemaining = targetBirthday.getTime() - now.getTime();
      
      if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        location.reload(); // Reload to activate Birthday Mode
        return;
      }
      
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      // Update Landing Page Splash Countdown
      const spDaysEl = document.getElementById("splash-cd-days");
      const spHoursEl = document.getElementById("splash-cd-hours");
      const spMinsEl = document.getElementById("splash-cd-mins");
      const spSecsEl = document.getElementById("splash-cd-secs");
      
      if (spDaysEl) spDaysEl.textContent = String(days).padStart(2, '0');
      if (spHoursEl) spHoursEl.textContent = String(hours).padStart(2, '0');
      if (spMinsEl) spMinsEl.textContent = String(minutes).padStart(2, '0');
      if (spSecsEl) spSecsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
  }
}

// Confetti Spawning Helper
function spawnBirthdayConfetti(count = 1, isBurst = false, originX = null, originY = null) {
  const colors = ['#ff9a9e', '#fecfef', '#a1c4fd', '#c2e9fb', '#fecfef', '#f093fb', '#a8edd8', '#fed6e3', '#f6d365', '#fda085', '#fbbf24'];
  const shapes = ['circle', 'square'];
  
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    if (isBurst) confetti.classList.add('burst');
    
    const size = (6 + Math.random() * 8);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = color;
    
    if (shape === 'circle') {
      confetti.style.borderRadius = '50%';
    }
    
    if (isBurst) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 80 + Math.random() * 120;
      const xStart = originX || (window.innerWidth / 2);
      const yStart = originY || (window.innerHeight / 2);
      
      confetti.style.left = `${xStart}px`;
      confetti.style.top = `${yStart}px`;
      
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity + 150; // gravity effect
      
      confetti.style.setProperty('--dest-x', `${destX}px`);
      confetti.style.setProperty('--dest-y', `${destY}px`);
      
      confetti.style.animation = `burstConfetti ${1.2 + Math.random() * 1.0}s cubic-bezier(0.1, 0.8, 0.25, 1) forwards`;
      
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 2500);
    } else {
      const left = Math.random() * 100;
      const duration = 5 + Math.random() * 5;
      const delay = Math.random() * 2;
      const rot = Math.random() * 360;
      
      confetti.style.left = `${left}%`;
      confetti.style.top = `-15px`;
      confetti.style.animation = `fallConfetti ${duration}s linear ${delay}s infinite`;
      confetti.style.transform = `rotate(${rot}deg)`;
      
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), duration * 1000 + delay * 1000);
    }
  }
}
