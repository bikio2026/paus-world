// ============================================================
// PAU'S WORLD OF WONDER — Application Logic
// ============================================================

(function () {
  'use strict';

  // ========================================
  // STATE
  // ========================================
  const state = {
    screen: 'welcome',
    playerName: '',
    category: null,       // 'birds' | 'trees'
    currentRound: 0,      // 0-9
    rounds: [],           // generated round data
    quizScore: 0,
    quoteRatings: [],     // array of 1-5
    quoteComments: [],    // array of strings
    phase: 'answering',   // 'answering' | 'reveal' | 'quote-rating'
    currentStarRating: 0,
    helpUsed: false,      // once per game
    helpAvailable: true,
    reportBackTarget: 'welcome'  // where "back" goes from report
  };

  // ========================================
  // DOM REFERENCES
  // ========================================
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const screens = {
    welcome: $('#screen-welcome'),
    category: $('#screen-category'),
    quiz: $('#screen-quiz'),
    results: $('#screen-results'),
    report: $('#screen-report')
  };

  // ========================================
  // UTILITIES
  // ========================================
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickRandom(arr, n) {
    return shuffle(arr).slice(0, n);
  }

  // ========================================
  // SCREEN TRANSITIONS
  // ========================================
  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        screens[name].classList.add('active');
        state.screen = name;
        window.scrollTo(0, 0);
      });
    });
  }

  // ========================================
  // WORLD MAP — simplified SVG continents
  // ========================================
  const WORLD_MAP_PATHS = {
    'north-america': 'M8,50 L10,46 L14,42 L12,38 L10,34 L12,28 L15,22 L20,18 L28,12 L36,8 L44,5 L52,4 L58,5 L64,4 L72,6 L78,10 L84,8 L90,6 L94,8 L98,12 L100,18 L104,24 L106,30 L108,36 L108,42 L106,48 L102,54 L98,58 L94,60 L90,62 L86,64 L82,66 L78,68 L74,66 L70,68 L66,72 L64,76 L60,74 L56,70 L52,66 L48,62 L44,58 L40,54 L36,50 L32,48 L28,46 L24,44 L20,46 L16,48 L12,50 Z M58,4 L56,2 L50,2 L44,4 Z',
    'central-america': 'M64,76 L66,72 L70,74 L74,76 L76,80 L74,82 L72,80 L70,82 L72,86 L70,88 L68,86 L66,84 L64,80 Z M80,78 L84,76 L86,78 L88,80 L86,82 L82,80 Z',
    'south-america': 'M70,88 L74,86 L78,84 L82,86 L86,88 L92,86 L96,88 L98,92 L100,96 L102,100 L104,106 L104,112 L102,118 L100,124 L98,130 L96,136 L92,142 L88,148 L84,152 L80,154 L76,156 L74,154 L72,150 L70,144 L68,138 L66,130 L64,122 L64,114 L64,108 L66,100 L68,94 Z',
    'europe': 'M160,8 L156,12 L158,16 L162,14 L166,12 L170,14 L174,10 L178,8 L182,10 L186,14 L190,18 L194,16 L198,18 L202,22 L206,26 L208,32 L206,36 L202,40 L198,44 L194,48 L190,50 L186,48 L182,46 L178,44 L174,42 L172,38 L170,34 L168,28 L166,22 L164,18 Z M152,16 L156,14 L158,18 L156,22 L152,24 L148,22 L148,18 Z M164,6 L168,4 L172,6 L170,10 L166,10 Z',
    'africa': 'M170,52 L174,50 L180,48 L186,48 L192,50 L198,52 L204,54 L210,58 L214,64 L218,72 L222,80 L224,88 L226,96 L226,104 L224,112 L220,120 L216,126 L210,132 L204,136 L198,138 L192,138 L186,136 L180,132 L176,126 L174,118 L172,110 L170,102 L168,94 L168,86 L168,78 L170,68 L170,60 Z M210,50 L214,48 L218,50 L218,54 L214,56 L210,54 Z',
    'asia': 'M208,6 L212,4 L218,6 L224,4 L232,6 L240,8 L248,10 L256,8 L264,10 L272,12 L280,16 L288,18 L296,20 L304,24 L310,28 L316,32 L320,36 L324,40 L326,44 L324,48 L320,52 L314,56 L308,58 L302,60 L296,62 L290,60 L284,56 L278,52 L272,50 L266,52 L260,56 L254,58 L248,56 L242,54 L236,50 L230,48 L224,44 L218,40 L212,34 L208,28 L206,22 L206,16 L208,10 Z M316,60 L322,58 L326,62 L330,68 L328,74 L322,76 L316,74 L312,68 L314,64 Z M298,66 L304,64 L310,68 L312,74 L308,78 L302,80 L296,76 L294,72 L296,68 Z M282,68 L286,66 L290,70 L288,76 L284,78 L280,74 L280,70 Z',
    'oceania': 'M284,108 L290,104 L298,102 L306,104 L314,108 L320,112 L326,118 L330,124 L332,130 L330,136 L326,140 L320,144 L312,146 L304,144 L296,142 L290,138 L286,132 L284,126 L282,120 L282,114 Z M338,148 L342,144 L346,146 L348,152 L346,158 L342,160 L338,156 L336,152 Z',
    'antarctica': 'M60,172 L100,168 L140,166 L180,165 L220,166 L260,168 L300,172 L300,178 L60,178 Z'
  };

  function renderWorldMap(regionKey) {
    const svg = $('#world-map');
    if (!svg) return;

    const regionData = REGION_COORDS[regionKey];
    if (!regionData) {
      $('#map-container').style.display = 'none';
      return;
    }

    $('#map-container').style.display = 'block';
    let html = '';

    // Draw all continents
    for (const [id, path] of Object.entries(WORLD_MAP_PATHS)) {
      const isHighlighted = regionData.regions.includes(id);
      html += `<path d="${path}" class="${isHighlighted ? 'map-highlight' : 'map-land'}" />`;
    }

    // Draw a dot at the center of the region
    html += `<circle cx="${regionData.cx}" cy="${regionData.cy}" r="4" class="map-dot" />`;
    html += `<circle cx="${regionData.cx}" cy="${regionData.cy}" r="8" class="map-dot" style="fill:none;stroke:var(--red-soft);stroke-width:1.5;opacity:0.5;">
      <animate attributeName="r" from="6" to="14" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite"/>
    </circle>`;

    svg.innerHTML = html;
  }

  // ========================================
  // BIRD SOUND (Xeno-canto API)
  // ========================================
  let birdSoundReady = false;

  function loadBirdSound(species) {
    const audio = $('#bird-audio');
    const soundBar = $('#bird-sound-bar');
    const soundBtn = $('#btn-sound');
    const soundIcon = $('#sound-icon');
    const soundLabel = $('#sound-label');

    birdSoundReady = false;

    // Only show for birds
    if (state.category !== 'birds') {
      soundBar.style.display = 'none';
      return;
    }

    // Check if this bird has a precompiled xeno-canto recording ID
    if (!species.xcId) {
      soundBar.style.display = 'none';
      return;
    }

    soundBar.style.display = 'flex';
    soundIcon.textContent = '🔊';
    soundLabel.textContent = 'Tocá para escuchar 🎵';
    soundBtn.disabled = false;

    // Use direct xeno-canto download URL (works cross-origin with <audio>)
    audio.src = `https://xeno-canto.org/${species.xcId}/download`;
    audio.preload = 'none';
    birdSoundReady = true;
  }

  function playBirdSoundOnce() {
    if (!birdSoundReady) return;

    const audio = $('#bird-audio');
    const soundBtn = $('#btn-sound');
    const soundIcon = $('#sound-icon');
    const soundLabel = $('#sound-label');

    // Always play from the beginning, once per tap
    audio.currentTime = 0;
    audio.play().then(() => {
      soundBtn.classList.add('playing');
      soundIcon.textContent = '🔉';
      soundLabel.textContent = 'Reproduciendo...';
    }).catch(() => {
      soundLabel.textContent = 'No se pudo reproducir';
    });
  }

  function stopBirdSound() {
    const audio = $('#bird-audio');
    const soundBtn = $('#btn-sound');
    const soundIcon = $('#sound-icon');
    const soundLabel = $('#sound-label');
    birdSoundReady = false;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
    }
    if (soundBtn) {
      soundBtn.classList.remove('playing');
    }
  }

  // ========================================
  // ROUND GENERATION
  // ========================================
  function generateRounds(category) {
    const pool = category === 'birds' ? BIRDS : TREES;

    const easy = pool.filter(s => s.difficulty === 1);
    const medium = pool.filter(s => s.difficulty === 2);
    const hard = pool.filter(s => s.difficulty === 3);

    // Use a Set of IDs to guarantee no duplicates
    const usedIds = new Set();
    let selected = [];

    function addUnique(arr, count) {
      const shuffled = shuffle(arr);
      for (const s of shuffled) {
        if (selected.length >= 10) break;
        if (usedIds.has(s.id)) continue;
        usedIds.add(s.id);
        selected.push(s);
        if (selected.length - (selected.length - count) >= count) break;
        count--;
      }
    }

    // Pick from each difficulty tier
    const easyPick = shuffle(easy).filter(s => !usedIds.has(s.id));
    for (let i = 0; i < Math.min(3, easyPick.length); i++) {
      usedIds.add(easyPick[i].id);
      selected.push(easyPick[i]);
    }
    const medPick = shuffle(medium).filter(s => !usedIds.has(s.id));
    for (let i = 0; i < Math.min(4, medPick.length); i++) {
      usedIds.add(medPick[i].id);
      selected.push(medPick[i]);
    }
    const hardPick = shuffle(hard).filter(s => !usedIds.has(s.id));
    for (let i = 0; i < Math.min(3, hardPick.length); i++) {
      usedIds.add(hardPick[i].id);
      selected.push(hardPick[i]);
    }

    // Fill remaining slots if needed
    while (selected.length < 10) {
      const remaining = pool.filter(s => !usedIds.has(s.id));
      if (remaining.length === 0) break;
      const pick = remaining[Math.floor(Math.random() * remaining.length)];
      usedIds.add(pick.id);
      selected.push(pick);
    }

    selected = shuffle(selected).slice(0, 10);

    // Quotes: guaranteed unique (pickRandom uses shuffle+slice so no repeats)
    const selectedQuotes = pickRandom(QUOTES, 10);

    // Build rounds with unique distractors (no distractor = another round's answer)
    const selectedIds = new Set(selected.map(s => s.id));
    const rounds = selected.map((species, i) => {
      // Prefer distractors that are NOT other correct answers this game
      const nonAnswerPool = pool.filter(s => s.id !== species.id && !selectedIds.has(s.id));
      let distractors;
      if (nonAnswerPool.length >= 3) {
        distractors = pickRandom(nonAnswerPool, 3);
      } else {
        // Fallback: just pick any other species
        const others = pool.filter(s => s.id !== species.id);
        distractors = pickRandom(others, 3);
      }
      const options = shuffle([species, ...distractors]);

      return {
        correctSpecies: species,
        options: options,
        correctIndex: options.indexOf(species),
        quote: selectedQuotes[i],
        userAnswer: null,
        isCorrect: false,
        rating: null,
        comment: ''
      };
    });

    return rounds;
  }

  // ========================================
  // HELP SYSTEM — eliminate one wrong option
  // ========================================
  function useHelp() {
    if (!state.helpAvailable || state.phase !== 'answering') return;

    state.helpUsed = true;
    state.helpAvailable = false;
    $('#btn-help').disabled = true;
    $('#btn-help').title = 'Ya usaste la ayuda';

    const round = state.rounds[state.currentRound];
    const buttons = $$('#options-grid .option-btn');

    // Find wrong options that aren't the correct one
    const wrongIndexes = [];
    buttons.forEach((btn, i) => {
      if (i !== round.correctIndex) wrongIndexes.push(i);
    });

    // Pick one random wrong option to eliminate
    const elimIndex = wrongIndexes[Math.floor(Math.random() * wrongIndexes.length)];
    buttons[elimIndex].classList.add('eliminated');
    buttons[elimIndex].disabled = true;
  }

  // ========================================
  // QUIZ FLOW
  // ========================================
  function startQuiz(category) {
    state.category = category;
    state.currentRound = 0;
    state.quizScore = 0;
    state.quoteRatings = [];
    state.quoteComments = [];
    state.rounds = generateRounds(category);
    state.helpUsed = false;
    state.helpAvailable = true;

    showScreen('quiz');
    renderRound();

    // Show Spotify player for trees (unless user closed it)
    if (category === 'trees' && !spotifyState.closedByUser) {
      shuffleSpotifyPlaylist();
      showSpotifyPlayer();
    } else {
      hideSpotifyPlayer();
    }
  }

  function renderRound() {
    const round = state.rounds[state.currentRound];
    const roundNum = state.currentRound + 1;

    state.phase = 'answering';
    state.currentStarRating = 0;

    // Stop any previous bird sound
    stopBirdSound();

    // Progress
    $('#progress-text').textContent = `Ronda ${roundNum} / 10`;
    $('#progress-fill').style.width = `${roundNum * 10}%`;
    $('#score-tracker').textContent = `${state.quizScore} ✓`;

    // Help button state
    const helpBtn = $('#btn-help');
    helpBtn.disabled = !state.helpAvailable;
    if (!state.helpAvailable) {
      helpBtn.title = 'Ya usaste la ayuda';
    }

    // Photo
    const img = $('#quiz-photo');
    const placeholder = $('#photo-placeholder');
    img.style.opacity = '0';
    placeholder.style.display = 'flex';

    const photoUrl = getPhotoUrl(round.correctSpecies.photoUrl);
    img.onload = () => {
      img.style.opacity = '1';
      placeholder.style.display = 'none';
    };
    img.onerror = () => {
      const icon = state.category === 'birds' ? '🐦' : '🌳';
      placeholder.querySelector('.photo-placeholder-icon').textContent = icon;
      placeholder.querySelector('span:last-child').textContent = '¿Podés adivinar sin foto?';
    };
    img.src = photoUrl;

    // Bird sound — load but do NOT autoplay
    if (state.category === 'birds') {
      loadBirdSound(round.correctSpecies);
    } else {
      $('#bird-sound-bar').style.display = 'none';
    }

    // Question
    const typeLabel = state.category === 'birds' ? 'ave' : 'árbol';
    $('#question-text').textContent = `¿Qué ${typeLabel} es?`;

    // Options
    const optionsGrid = $('#options-grid');
    const buttons = optionsGrid.querySelectorAll('.option-btn');
    const letters = ['A', 'B', 'C', 'D'];

    buttons.forEach((btn, i) => {
      const species = round.options[i];
      btn.querySelector('.option-letter').textContent = letters[i];
      btn.querySelector('.option-name').textContent = species.nameEs;
      btn.querySelector('.option-scientific').textContent = species.scientific;
      btn.classList.remove('correct', 'wrong', 'eliminated');
      btn.disabled = false;
      btn.dataset.index = i;
    });

    // Hide reveal and quote sections
    $('#reveal-section').classList.remove('visible');
    $('#quote-section').classList.remove('visible');

    // Reset stars
    $$('#star-rating .star').forEach(s => s.classList.remove('active', 'pop'));

    // Reset comment (if comment feature is active)
    const commentContainer = $('#comment-container');
    const commentToggle = $('#comment-toggle');
    const commentInput = $('#comment-input');
    if (commentContainer) commentContainer.classList.remove('visible');
    if (commentToggle) commentToggle.classList.remove('open');
    if (commentInput) commentInput.value = '';

    // Reset next button
    $('#btn-next').disabled = true;
    $('#btn-next').textContent = roundNum < 10 ? 'Siguiente ronda →' : 'Ver resultados ✨';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleAnswer(chosenIndex) {
    if (state.phase !== 'answering') return;
    state.phase = 'reveal';

    // Stop bird sound on answer
    stopBirdSound();

    const round = state.rounds[state.currentRound];
    round.userAnswer = chosenIndex;
    round.isCorrect = chosenIndex === round.correctIndex;

    if (round.isCorrect) state.quizScore++;

    $('#score-tracker').textContent = `${state.quizScore} ✓`;

    const buttons = $$('#options-grid .option-btn');
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === round.correctIndex) {
        btn.classList.add('correct');
      } else if (i === chosenIndex && !round.isCorrect) {
        btn.classList.add('wrong');
      }
    });

    // Show reveal
    const species = round.correctSpecies;
    $('#reveal-species').textContent = species.nameEs;
    $('#reveal-species-en').innerHTML = `${species.nameEn} · <em>${species.scientific}</em>`;
    $('#reveal-fun-fact').textContent = species.funFact;
    $('#reveal-section').classList.add('visible');

    // Render world map
    renderWorldMap(species.region);

    // After a brief delay, show quote
    setTimeout(() => {
      showQuotePhase();
    }, 800);
  }

  function showQuotePhase() {
    state.phase = 'quote-rating';
    const round = state.rounds[state.currentRound];

    $('#quote-text').textContent = round.quote.text;
    $('#quote-author').textContent = `— ${round.quote.author}`;
    $('#quote-section').classList.add('visible');

    setTimeout(() => {
      $('#quote-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }

  function handleStarRating(value) {
    state.currentStarRating = value;
    const stars = $$('#star-rating .star');
    stars.forEach((star, i) => {
      if (i < value) {
        star.classList.add('active');
        if (!star.classList.contains('pop')) {
          star.classList.add('pop');
          setTimeout(() => star.classList.remove('pop'), 300);
        }
      } else {
        star.classList.remove('active');
      }
    });

    $('#btn-next').disabled = false;
  }

  function goNextRound() {
    if (state.currentStarRating === 0) return;

    const round = state.rounds[state.currentRound];
    round.rating = state.currentStarRating;
    const ci = $('#comment-input');
    round.comment = ci ? ci.value.trim() : '';

    state.quoteRatings.push(round.rating);
    state.quoteComments.push(round.comment);

    if (state.currentRound < 9) {
      state.currentRound++;
      renderRound();
    } else {
      showResults();
    }
  }

  // ========================================
  // RESULTS
  // ========================================
  function showResults() {
    // Stop any remaining sounds
    stopBirdSound();
    hideSpotifyPlayer();

    showScreen('results');

    // Player name in header
    const name = state.playerName || 'Jugador/a';
    $('#results-header').textContent = `¡Resultados de ${name}!`;

    // Category label
    const catLabel = state.category === 'birds' ? '🐦 Aves del Mundo' : '🌳 Árboles del Mundo';
    $('#results-category').textContent = catLabel;

    // Quiz score
    $('#results-score').innerHTML = `${state.quizScore} <span>/ 10</span>`;

    // Message
    let message = '';
    if (state.quizScore >= 9) message = '¡Naturalista experta! 🌟';
    else if (state.quizScore >= 7) message = '¡Excelente ojo! 👏';
    else if (state.quizScore >= 5) message = '¡Muy bien, seguimos descubriendo! 🌿';
    else if (state.quizScore >= 3) message = '¡Buen intento, a seguir explorando! 🔍';
    else message = '¡La naturaleza te espera! 🌱';
    $('#results-message').textContent = message;

    // Quote affinity
    const avgRating = state.quoteRatings.length > 0
      ? state.quoteRatings.reduce((a, b) => a + b, 0) / state.quoteRatings.length
      : 0;

    const avgRounded = Math.round(avgRating * 10) / 10;
    $('#affinity-score').innerHTML = `${avgRounded.toFixed(1)} <span>/ 5</span>`;

    const starsContainer = $('#affinity-stars');
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(avgRating)) {
        starsHtml += '<span>★</span>';
      } else if (i - 0.5 <= avgRating) {
        starsHtml += '<span>★</span>';
      } else {
        starsHtml += '<span class="star-empty">★</span>';
      }
    }
    starsContainer.innerHTML = starsHtml;

    // Favorite quote (highest rated)
    let favIndex = 0;
    let maxRating = 0;
    state.quoteRatings.forEach((r, i) => {
      if (r > maxRating) {
        maxRating = r;
        favIndex = i;
      }
    });

    const favQuote = state.rounds[favIndex].quote;
    const favComment = state.quoteComments[favIndex];
    const favSection = $('#fav-quote-section');
    if (maxRating >= 3) {
      favSection.style.display = 'block';
      $('#fav-quote-text').textContent = `"${favQuote.text}"`;
      $('#fav-quote-author').textContent = `— ${favQuote.author}`;
      // Show comment if available
      const commentEl = $('#fav-quote-comment');
      if (commentEl) {
        if (favComment) {
          commentEl.textContent = `💬 "${favComment}"`;
          commentEl.style.display = 'block';
        } else {
          commentEl.style.display = 'none';
        }
      }
    } else {
      favSection.style.display = 'none';
    }

    // Log results
    logGameResults();

    // Confetti for high scores
    if (state.quizScore >= 7) {
      launchConfetti();
    }
  }

  // ========================================
  // LOGGING SYSTEM
  // ========================================
  function logGameResults() {
    const avgRating = state.quoteRatings.length > 0
      ? state.quoteRatings.reduce((a, b) => a + b, 0) / state.quoteRatings.length
      : 0;

    const entry = {
      timestamp: new Date().toISOString(),
      playerName: state.playerName || 'Anónimo',
      category: state.category,
      quizScore: state.quizScore,
      avgQuoteRating: Math.round(avgRating * 10) / 10,
      helpUsed: state.helpUsed,
      rounds: state.rounds.map((r, i) => ({
        species: r.correctSpecies.nameEs,
        speciesId: r.correctSpecies.id,
        correct: r.isCorrect,
        userAnswer: r.options[r.userAnswer]?.nameEs || '—',
        quoteText: r.quote.text,
        quoteAuthor: r.quote.author,
        quoteRating: state.quoteRatings[i] || 0,
        comment: state.quoteComments[i] || ''
      }))
    };

    try {
      const history = JSON.parse(localStorage.getItem('paw-game-history') || '[]');
      history.push(entry);
      // Keep max 50 entries
      if (history.length > 50) history.splice(0, history.length - 50);
      localStorage.setItem('paw-game-history', JSON.stringify(history));
    } catch (e) {
      console.warn('Could not save game history:', e);
    }
  }

  function getGameHistory() {
    try {
      return JSON.parse(localStorage.getItem('paw-game-history') || '[]');
    } catch (e) {
      return [];
    }
  }

  function renderReport() {
    const history = getGameHistory();
    const container = $('#report-content');

    if (history.length === 0) {
      container.innerHTML = '<p class="text-center" style="color:var(--text-light); font-style:italic;">No hay partidas registradas aún.</p>';
      return;
    }

    let html = `<div style="text-align:center;margin-bottom:1rem;font-size:0.85rem;color:var(--text-light);">${history.length} partida${history.length !== 1 ? 's' : ''} registrada${history.length !== 1 ? 's' : ''}</div>`;

    // Show most recent first
    const reversed = [...history].reverse();
    reversed.forEach((entry, idx) => {
      const date = new Date(entry.timestamp);
      const dateStr = date.toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      const catIcon = entry.category === 'birds' ? '🐦' : '🌳';
      const catName = entry.category === 'birds' ? 'Aves' : 'Árboles';

      // Build detailed rounds table
      let roundsDetail = '';
      if (entry.rounds && entry.rounds.length > 0) {
        roundsDetail = '<div class="report-rounds-detail">';

        // Quiz answers detail
        roundsDetail += '<div class="report-detail-section"><span class="report-detail-title">Respuestas del Quiz</span>';
        entry.rounds.forEach((r, ri) => {
          const icon = r.correct ? '✅' : '❌';
          const answer = r.correct ? '' : ` → respondió: ${r.userAnswer}`;
          roundsDetail += `<div class="report-round-item">${icon} <strong>${r.species}</strong>${answer}</div>`;
        });
        roundsDetail += '</div>';

        // Quote ratings & comments
        const roundsWithComments = entry.rounds.filter(r => r.comment);
        const roundsWithRatings = entry.rounds.filter(r => r.quoteRating > 0);

        if (roundsWithRatings.length > 0) {
          roundsDetail += '<div class="report-detail-section"><span class="report-detail-title">Frases y Valoraciones</span>';
          entry.rounds.forEach((r, ri) => {
            if (r.quoteRating > 0) {
              const stars = '★'.repeat(r.quoteRating) + '☆'.repeat(5 - r.quoteRating);
              let commentHtml = '';
              if (r.comment) {
                commentHtml = `<div class="report-comment">"${r.comment}"</div>`;
              }
              roundsDetail += `<div class="report-round-item"><span class="report-quote-stars">${stars}</span> <span class="report-quote-author">${r.quoteAuthor}</span>${commentHtml}</div>`;
            }
          });
          roundsDetail += '</div>';
        }

        roundsDetail += '</div>';
      }

      html += `
        <div class="report-card" data-idx="${idx}">
          <div class="report-card-header">
            <span class="report-card-player">${entry.playerName}</span>
            <span class="report-card-date">${dateStr}</span>
          </div>
          <div class="report-card-stats">
            <span class="report-stat">${catIcon} <span class="report-stat-value">${catName}</span></span>
            <span class="report-stat">✓ <span class="report-stat-value">${entry.quizScore}/10</span></span>
            <span class="report-stat">★ <span class="report-stat-value">${entry.avgQuoteRating.toFixed(1)}/5</span></span>
            ${entry.helpUsed ? '<span class="report-stat">💡</span>' : ''}
          </div>
          <button class="report-toggle-btn" onclick="this.nextElementSibling.classList.toggle('visible');this.textContent=this.nextElementSibling.classList.contains('visible')?'▲ Ocultar detalles':'▼ Ver detalles'">▼ Ver detalles</button>
          <div class="report-details-wrapper">
            ${roundsDetail}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // ========================================
  // ADMIN ACCESS (password-protected)
  // ========================================
  function openAdmin(backTarget) {
    const pwd = prompt('Ingresá la clave para acceder al panel:');
    if (pwd === 'axelpresidente') {
      state.reportBackTarget = backTarget;
      // Reset to history tab
      $$('.report-tab').forEach(t => t.classList.remove('active'));
      $$('.report-tab-content').forEach(c => c.classList.remove('active'));
      $('.report-tab[data-tab="history"]').classList.add('active');
      $('#tab-history').classList.add('active');
      renderReport();
      showScreen('report');
    } else if (pwd !== null) {
      alert('Clave incorrecta 🔒');
    }
  }

  // ========================================
  // REPORT TABS
  // ========================================
  function initReportTabs() {
    const tabs = $$('.report-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Deactivate all
        tabs.forEach(t => t.classList.remove('active'));
        $$('.report-tab-content').forEach(c => c.classList.remove('active'));
        // Activate selected
        tab.classList.add('active');
        const target = tab.dataset.tab;
        $(`#tab-${target}`).classList.add('active');
        // Render content on tab switch
        if (target === 'stats') renderStats();
        if (target === 'guestbook') renderGuestbook();
      });
    });
  }

  // ========================================
  // STATISTICS — Quote ranking + Species ranking
  // ========================================
  function renderStats() {
    const history = getGameHistory();
    const container = $('#stats-content');

    if (history.length === 0) {
      container.innerHTML = '<p class="stats-empty">Todavía no hay datos. ¡Jugá una partida primero!</p>';
      return;
    }

    let html = '';

    // ---- QUOTE RANKING (weighted by appearances) ----
    const quoteMap = {}; // key: "text|||author" → { totalRating, count, text, author }
    history.forEach(game => {
      if (!game.rounds) return;
      game.rounds.forEach(r => {
        if (!r.quoteAuthor || !r.quoteRating) return;
        // Use logged quoteText if available (new logs), else find from QUOTES data
        let quoteText = r.quoteText;
        if (!quoteText) {
          const quoteObj = QUOTES.find(q => q.author === r.quoteAuthor);
          quoteText = quoteObj ? quoteObj.text : r.quoteAuthor;
        }
        const key = `${quoteText}|||${r.quoteAuthor}`;
        if (!quoteMap[key]) {
          quoteMap[key] = { totalRating: 0, count: 0, text: quoteText, author: r.quoteAuthor };
        }
        quoteMap[key].totalRating += r.quoteRating;
        quoteMap[key].count++;
      });
    });

    const quoteRanking = Object.values(quoteMap)
      .map(q => ({
        ...q,
        avgRating: q.totalRating / q.count,
        // Wilson score for weighted ranking (lower bound of confidence interval)
        // This prevents quotes that appeared once with 5 stars from dominating
        wilsonScore: wilsonLowerBound(q.totalRating, q.count, 5)
      }))
      .sort((a, b) => b.wilsonScore - a.wilsonScore);

    if (quoteRanking.length > 0) {
      html += '<div class="stats-section">';
      html += '<div class="stats-section-title">✨ Ranking de Frases</div>';
      const topQuotes = quoteRanking.slice(0, 15);
      topQuotes.forEach((q, i) => {
        const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
        const stars = '★'.repeat(Math.round(q.avgRating)) + '☆'.repeat(5 - Math.round(q.avgRating));
        const truncText = q.text.length > 60 ? q.text.slice(0, 57) + '...' : q.text;
        html += `
          <div class="stats-item">
            <span class="stats-rank ${rankClass}">${i + 1}</span>
            <div class="stats-info">
              <div class="stats-name" title="${escapeHtml(q.text)}">"${escapeHtml(truncText)}"</div>
              <div class="stats-detail">${q.author} · ${q.count} aparición${q.count !== 1 ? 'es' : ''}</div>
            </div>
            <span class="stats-badge neutral">${stars} ${q.avgRating.toFixed(1)}</span>
          </div>
        `;
      });
      html += '</div>';
    }

    // ---- SPECIES RANKING (by correct/incorrect answers) ----
    const speciesMap = {}; // key: species name → { correct, incorrect, total, name }
    history.forEach(game => {
      if (!game.rounds) return;
      game.rounds.forEach(r => {
        if (!r.species) return;
        if (!speciesMap[r.species]) {
          speciesMap[r.species] = { correct: 0, incorrect: 0, total: 0, name: r.species };
        }
        speciesMap[r.species].total++;
        if (r.correct) speciesMap[r.species].correct++;
        else speciesMap[r.species].incorrect++;
      });
    });

    const speciesList = Object.values(speciesMap).filter(s => s.total > 0);

    if (speciesList.length > 0) {
      // Most guessed correctly (by success rate, min 1 appearance)
      const bestSpecies = [...speciesList]
        .sort((a, b) => {
          const rateA = a.correct / a.total;
          const rateB = b.correct / b.total;
          if (rateB !== rateA) return rateB - rateA;
          return b.total - a.total; // tie-break by more appearances
        });

      html += '<div class="stats-section">';
      html += '<div class="stats-section-title">🏆 Especies más acertadas</div>';
      bestSpecies.slice(0, 10).forEach((s, i) => {
        const rate = Math.round((s.correct / s.total) * 100);
        const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
        html += `
          <div class="stats-item">
            <span class="stats-rank ${rankClass}">${i + 1}</span>
            <div class="stats-info">
              <div class="stats-name">${escapeHtml(s.name)}</div>
              <div class="stats-detail">${s.correct}/${s.total} aciertos</div>
            </div>
            <span class="stats-badge positive">${rate}%</span>
          </div>
        `;
      });
      html += '</div>';

      // Most missed (by failure rate)
      const worstSpecies = [...speciesList]
        .filter(s => s.incorrect > 0)
        .sort((a, b) => {
          const rateA = a.incorrect / a.total;
          const rateB = b.incorrect / b.total;
          if (rateB !== rateA) return rateB - rateA;
          return b.total - a.total;
        });

      if (worstSpecies.length > 0) {
        html += '<div class="stats-section">';
        html += '<div class="stats-section-title">🤔 Especies más difíciles</div>';
        worstSpecies.slice(0, 10).forEach((s, i) => {
          const rate = Math.round((s.incorrect / s.total) * 100);
          const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
          html += `
            <div class="stats-item">
              <span class="stats-rank ${rankClass}">${i + 1}</span>
              <div class="stats-info">
                <div class="stats-name">${escapeHtml(s.name)}</div>
                <div class="stats-detail">${s.incorrect}/${s.total} errores</div>
              </div>
              <span class="stats-badge negative">${rate}%</span>
            </div>
          `;
        });
        html += '</div>';
      }

      // Most appeared species
      const mostAppeared = [...speciesList].sort((a, b) => b.total - a.total);
      html += '<div class="stats-section">';
      html += '<div class="stats-section-title">🔄 Especies más aparecidas</div>';
      mostAppeared.slice(0, 10).forEach((s, i) => {
        const rate = Math.round((s.correct / s.total) * 100);
        html += `
          <div class="stats-item">
            <span class="stats-rank">${i + 1}</span>
            <div class="stats-info">
              <div class="stats-name">${escapeHtml(s.name)}</div>
              <div class="stats-detail">${s.total} veces · ${rate}% acierto</div>
            </div>
            <div class="stats-bar-container">
              <div class="stats-bar-fill ${rate < 50 ? 'low' : ''}" style="width:${rate}%"></div>
            </div>
          </div>
        `;
      });
      html += '</div>';
    }

    // ---- GENERAL STATS SUMMARY ----
    const totalGames = history.length;
    const totalCorrect = history.reduce((sum, g) => sum + (g.quizScore || 0), 0);
    const totalQuestions = totalGames * 10;
    const avgScore = (totalCorrect / totalGames).toFixed(1);
    const uniquePlayers = new Set(history.map(g => g.playerName)).size;
    const avgQuoteRating = history.reduce((sum, g) => sum + (g.avgQuoteRating || 0), 0) / totalGames;

    html += '<div class="stats-section">';
    html += '<div class="stats-section-title">📊 Resumen general</div>';
    html += `
      <div class="stats-item">
        <span class="stats-rank">🎮</span>
        <div class="stats-info"><div class="stats-name">Partidas jugadas</div></div>
        <span class="stats-badge neutral">${totalGames}</span>
      </div>
      <div class="stats-item">
        <span class="stats-rank">👥</span>
        <div class="stats-info"><div class="stats-name">Jugadores diferentes</div></div>
        <span class="stats-badge neutral">${uniquePlayers}</span>
      </div>
      <div class="stats-item">
        <span class="stats-rank">🎯</span>
        <div class="stats-info"><div class="stats-name">Promedio de aciertos</div></div>
        <span class="stats-badge positive">${avgScore}/10</span>
      </div>
      <div class="stats-item">
        <span class="stats-rank">✅</span>
        <div class="stats-info"><div class="stats-name">Total aciertos</div></div>
        <span class="stats-badge positive">${totalCorrect}/${totalQuestions}</span>
      </div>
      <div class="stats-item">
        <span class="stats-rank">★</span>
        <div class="stats-info"><div class="stats-name">Afinidad promedio con frases</div></div>
        <span class="stats-badge neutral">${avgQuoteRating.toFixed(1)}/5</span>
      </div>
    `;
    html += '</div>';

    container.innerHTML = html;
  }

  // Wilson score lower bound — gives a confidence-weighted ranking
  // Adapted for ratings (not binary) by normalizing to 0-1 range
  function wilsonLowerBound(totalRating, count, maxRating) {
    if (count === 0) return 0;
    const phat = (totalRating / count) / maxRating; // normalize to 0-1
    const z = 1.96; // 95% confidence
    const n = count;
    const denominator = 1 + z * z / n;
    const center = phat + z * z / (2 * n);
    const spread = z * Math.sqrt((phat * (1 - phat) + z * z / (4 * n)) / n);
    return (center - spread) / denominator;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ========================================
  // GUESTBOOK — Libro de Frases (literary guestbook)
  // ========================================
  function renderGuestbook() {
    const history = getGameHistory();
    const container = $('#guestbook-content');

    // Collect all quote ratings >= 4 stars WITH comments (or 5 stars even without comments)
    const entries = [];
    history.forEach(game => {
      if (!game.rounds) return;
      game.rounds.forEach(r => {
        if (r.quoteRating >= 4) {
          entries.push({
            quoteText: r.quoteText || '',
            quoteAuthor: r.quoteAuthor,
            quoteRating: r.quoteRating,
            comment: r.comment || '',
            playerName: game.playerName,
            timestamp: game.timestamp
          });
        }
      });
    });

    if (entries.length === 0) {
      container.innerHTML = '<p class="stats-empty">Todavía no hay frases destacadas.<br>Las frases con 4 o 5 estrellas aparecerán acá.</p>';
      return;
    }

    // Group by quote (use text+author as key)
    const grouped = {};
    entries.forEach(e => {
      let quoteText = e.quoteText;
      if (!quoteText) {
        const quoteObj = QUOTES.find(q => q.author === e.quoteAuthor);
        quoteText = quoteObj ? quoteObj.text : '';
      }
      const key = `${e.quoteAuthor}|||${quoteText}`;
      if (!grouped[key]) {
        grouped[key] = { text: quoteText, author: e.quoteAuthor, comments: [], maxRating: 0 };
      }
      if (e.quoteRating > grouped[key].maxRating) grouped[key].maxRating = e.quoteRating;
      if (e.comment) {
        grouped[key].comments.push({
          text: e.comment,
          player: e.playerName,
          rating: e.quoteRating,
          date: e.timestamp
        });
      }
    });

    // Sort: 5-star quotes first, then by number of comments
    const sortedQuotes = Object.values(grouped)
      .sort((a, b) => {
        if (b.maxRating !== a.maxRating) return b.maxRating - a.maxRating;
        return b.comments.length - a.comments.length;
      });

    let html = `<div style="text-align:center;margin-bottom:1rem;font-size:0.85rem;color:var(--text-light);">
      ${entries.length} momento${entries.length !== 1 ? 's' : ''} destacado${entries.length !== 1 ? 's' : ''} en ${sortedQuotes.length} frase${sortedQuotes.length !== 1 ? 's' : ''}
    </div>`;

    sortedQuotes.forEach(q => {
      const stars = '★'.repeat(q.maxRating) + '☆'.repeat(5 - q.maxRating);

      html += `<div class="guestbook-entry">`;
      html += `<div class="guestbook-stars">${stars}</div>`;
      if (q.text) {
        html += `<div class="guestbook-quote">"${escapeHtml(q.text)}"</div>`;
      }
      html += `<div class="guestbook-author">— ${escapeHtml(q.author)}</div>`;

      // Show comments
      if (q.comments.length > 0) {
        q.comments.forEach(c => {
          const date = new Date(c.date);
          const dateStr = date.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
          html += `
            <div class="guestbook-comment-box">
              <div class="guestbook-comment-text">"${escapeHtml(c.text)}"</div>
              <div class="guestbook-comment-meta">
                <span>${escapeHtml(c.player)}</span>
                <span>${'★'.repeat(c.rating)} · ${dateStr}</span>
              </div>
            </div>
          `;
        });
      }

      html += `</div>`;
    });

    container.innerHTML = html;
  }

  // ========================================
  // CONFETTI
  // ========================================
  function launchConfetti() {
    const colors = ['#c9a227', '#1a472a', '#40916c', '#b7e4c7', '#dbb945'];
    for (let i = 0; i < 40; i++) {
      const el = document.createElement('div');
      el.className = 'confetti';
      el.style.left = `${Math.random() * 100}vw`;
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.animationDelay = `${Math.random() * 1.5}s`;
      el.style.animationDuration = `${2 + Math.random() * 2}s`;
      el.style.width = `${6 + Math.random() * 8}px`;
      el.style.height = `${6 + Math.random() * 8}px`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5000);
    }
  }

  // ========================================
  // SHARE / DOWNLOAD
  // ========================================
  function generateShareCard() {
    const canvas = $('#share-canvas');
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#1a472a');
    grad.addColorStop(0.4, '#2d6a4f');
    grad.addColorStop(1, '#1a472a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Top gold line
    ctx.fillStyle = '#c9a227';
    ctx.fillRect(0, 0, w, 6);

    // Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f0e6c0';
    ctx.font = '700 42px serif';
    ctx.fillText("PAU'S WORLD OF WONDER", w / 2, 100);

    // Player name
    if (state.playerName) {
      ctx.fillStyle = '#b7e4c7';
      ctx.font = 'italic 32px serif';
      ctx.fillText(state.playerName, w / 2, 145);
    }

    // Ornament
    ctx.strokeStyle = 'rgba(201, 162, 39, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 100, 170);
    ctx.lineTo(w / 2 + 100, 170);
    ctx.stroke();

    ctx.fillStyle = '#c9a227';
    ctx.font = '24px serif';
    ctx.fillText('✦', w / 2, 195);

    // Category
    const catLabel = state.category === 'birds' ? '🐦  Aves del Mundo' : '🌳  Árboles del Mundo';
    ctx.fillStyle = '#b7e4c7';
    ctx.font = 'italic 36px serif';
    ctx.fillText(catLabel, w / 2, 250);

    // Big score
    ctx.fillStyle = '#f5f0e8';
    ctx.font = '700 180px serif';
    ctx.fillText(`${state.quizScore}`, w / 2, 450);

    ctx.fillStyle = 'rgba(245, 240, 232, 0.5)';
    ctx.font = '400 48px serif';
    ctx.fillText('/ 10  correctas', w / 2, 510);

    // Score message
    let message = '';
    if (state.quizScore >= 9) message = '¡Naturalista experta! 🌟';
    else if (state.quizScore >= 7) message = '¡Excelente ojo! 👏';
    else if (state.quizScore >= 5) message = '¡Seguimos descubriendo! 🌿';
    else if (state.quizScore >= 3) message = '¡A seguir explorando! 🔍';
    else message = '¡La naturaleza te espera! 🌱';

    ctx.fillStyle = '#c9a227';
    ctx.font = 'italic 40px serif';
    ctx.fillText(message, w / 2, 590);

    // Divider
    ctx.strokeStyle = 'rgba(245, 240, 232, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 120, 640);
    ctx.lineTo(w / 2 + 120, 640);
    ctx.stroke();

    // Quote affinity
    ctx.fillStyle = 'rgba(183, 228, 199, 0.7)';
    ctx.font = '28px serif';
    ctx.fillText('Afinidad con las citas', w / 2, 700);

    const avgRating = state.quoteRatings.length > 0
      ? state.quoteRatings.reduce((a, b) => a + b, 0) / state.quoteRatings.length
      : 0;
    const avgRoundedStr = (Math.round(avgRating * 10) / 10).toFixed(1);

    const starY = 750;
    const starSize = 40;
    const startX = w / 2 - (5 * starSize) / 2;
    for (let i = 0; i < 5; i++) {
      ctx.font = `${starSize}px serif`;
      ctx.fillStyle = i < Math.round(avgRating) ? '#c9a227' : 'rgba(245, 240, 232, 0.2)';
      ctx.fillText('★', startX + i * starSize + starSize / 2, starY);
    }

    ctx.fillStyle = '#f5f0e8';
    ctx.font = '700 64px serif';
    ctx.fillText(`${avgRoundedStr}`, w / 2, 840);
    ctx.fillStyle = 'rgba(245, 240, 232, 0.5)';
    ctx.font = '400 36px serif';
    ctx.fillText('/ 5', w / 2 + 70, 840);

    // Favorite quote
    let favIndex = 0;
    let maxRating = 0;
    state.quoteRatings.forEach((r, i) => {
      if (r > maxRating) {
        maxRating = r;
        favIndex = i;
      }
    });

    if (maxRating >= 3) {
      const favQuote = state.rounds[favIndex].quote;

      ctx.strokeStyle = 'rgba(201, 162, 39, 0.3)';
      ctx.beginPath();
      ctx.moveTo(w / 2 - 100, 890);
      ctx.lineTo(w / 2 + 100, 890);
      ctx.stroke();

      ctx.fillStyle = 'rgba(183, 228, 199, 0.5)';
      ctx.font = '22px serif';
      ctx.fillText('Tu cita favorita', w / 2, 930);

      ctx.fillStyle = 'rgba(245, 240, 232, 0.9)';
      ctx.font = 'italic 30px serif';
      const maxLineWidth = w - 160;
      const lines = wrapText(ctx, `"${favQuote.text}"`, maxLineWidth);
      const lineHeight = 40;
      const quoteStartY = 980;
      lines.forEach((line, idx) => {
        ctx.fillText(line, w / 2, quoteStartY + idx * lineHeight);
      });

      const authorY = quoteStartY + lines.length * lineHeight + 20;
      ctx.fillStyle = '#c9a227';
      ctx.font = '600 26px serif';
      ctx.fillText(`— ${favQuote.author}`, w / 2, authorY);

      // Include user's comment if available
      const favComment = state.quoteComments[favIndex];
      if (favComment) {
        const commentY = authorY + 45;
        ctx.fillStyle = 'rgba(183, 228, 199, 0.6)';
        ctx.font = 'italic 22px serif';
        const commentLines = wrapText(ctx, `💬 "${favComment}"`, maxLineWidth - 40);
        commentLines.forEach((line, idx) => {
          ctx.fillText(line, w / 2, commentY + idx * 30);
        });
      }
    }

    // Bottom gold line
    ctx.fillStyle = '#c9a227';
    ctx.fillRect(0, h - 6, w, 6);

    return canvas;
  }

  function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (ctx.measureText(testLine).width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  async function shareResults() {
    const canvas = generateShareCard();

    try {
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      const file = new File([blob], 'pau-world-of-wonder.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Pau's World of Wonder",
          text: `¡${state.playerName || 'Alguien'} hizo ${state.quizScore}/10 en ${state.category === 'birds' ? 'Aves' : 'Árboles'}! 🌿`,
          files: [file]
        });
      } else {
        downloadImage(blob);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err);
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        downloadImage(blob);
      }
    }
  }

  function downloadResults() {
    const canvas = generateShareCard();
    canvas.toBlob((blob) => {
      downloadImage(blob);
    }, 'image/png');
  }

  function downloadImage(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pau-world-of-wonder.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ========================================
  // EVENT LISTENERS
  // ========================================
  function initEventListeners() {
    // Welcome → Category
    $('#btn-start').addEventListener('click', () => {
      state.playerName = ($('#player-name').value || '').trim();
      showScreen('category');
    });

    // Allow pressing Enter on the name field to start
    $('#player-name').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        $('#btn-start').click();
      }
    });

    // Category selection
    $$('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const category = card.dataset.category;
        startQuiz(category);
      });
    });

    // Quiz option buttons
    $$('#options-grid .option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        handleAnswer(idx);
      });
    });

    // Quit button — show confirmation overlay
    $('#btn-quit').addEventListener('click', () => {
      $('#quit-overlay').classList.add('visible');
    });

    // Quit: Cancel — close overlay
    $('#btn-quit-cancel').addEventListener('click', () => {
      $('#quit-overlay').classList.remove('visible');
    });

    // Quit: Confirm — abandon game, go to welcome
    $('#btn-quit-confirm').addEventListener('click', () => {
      $('#quit-overlay').classList.remove('visible');
      stopBirdSound();
      hideSpotifyPlayer();
      $('#player-name').value = '';
      showScreen('welcome');
    });

    // Close overlay on background tap
    $('#quit-overlay').addEventListener('click', (e) => {
      if (e.target === $('#quit-overlay')) {
        $('#quit-overlay').classList.remove('visible');
      }
    });

    // Help button
    $('#btn-help').addEventListener('click', useHelp);

    // Bird sound — play once per tap
    $('#btn-sound').addEventListener('click', playBirdSoundOnce);

    // Audio ended event — reset to ready state
    $('#bird-audio').addEventListener('ended', () => {
      $('#btn-sound').classList.remove('playing');
      $('#sound-icon').textContent = '🔊';
      $('#sound-label').textContent = 'Tocá para escuchar 🎵';
    });

    // Star rating
    $$('#star-rating .star').forEach(star => {
      star.addEventListener('click', () => {
        const value = parseInt(star.dataset.value);
        handleStarRating(value);
      });
    });

    // Comment toggle (if comment feature is active)
    const commentToggleEl = $('#comment-toggle');
    if (commentToggleEl) {
      commentToggleEl.addEventListener('click', () => {
        const container = $('#comment-container');
        const toggle = $('#comment-toggle');
        container.classList.toggle('visible');
        toggle.classList.toggle('open');
        if (container.classList.contains('visible')) {
          setTimeout(() => $('#comment-input').focus(), 300);
        }
      });
    }

    // Next round
    $('#btn-next').addEventListener('click', goNextRound);

    // Results: Share
    $('#btn-share').addEventListener('click', shareResults);

    // Results: Download
    $('#btn-download').addEventListener('click', downloadResults);

    // Results: Replay — go back to welcome so a different player can enter their name
    $('#btn-replay').addEventListener('click', () => {
      $('#player-name').value = '';
      showScreen('welcome');
    });

    // Report: Back — go to welcome and clear hash
    $('#btn-report-back').addEventListener('click', () => {
      history.replaceState(null, '', location.pathname);
      showScreen('welcome');
    });

    // Report: Clear history
    $('#btn-report-clear').addEventListener('click', () => {
      if (confirm('¿Borrar todo el historial de partidas?')) {
        localStorage.removeItem('paw-game-history');
        renderReport();
      }
    });
  }

  // ========================================
  // SPOTIFY MINI PLAYER — HVOB Live in London
  // ========================================
  const HVOB_TRACKS = [
    { id: '4Qwq0YDNIgh6BHz0WyPd4o', name: '2nd World' },
    { id: '7gRcVeATZ40fZNvNCqnqlg', name: 'Jack' },
    { id: '6jHYnm5d3XBo7PYoNYCDiL', name: 'Panama' },
    { id: '4Mc1dgIuRhp4WwxKNs8zel', name: 'Cool Melt' },
    { id: '0kB9iMIvWieO9y8fUKzLnn', name: 'Kante' },
    { id: '0gU6omHESZKqA6yHVL3CGI', name: 'Tender Skin' },
    { id: '2fPHV0Pa90AQmizoexxTRR', name: 'Dogs' },
    { id: '0OSClKd2kzc0hMvnvJTssI', name: 'Sync' },
    { id: '7jbImpXIhSbBHRTVmRt0l2', name: 'The Blame Game' },
    { id: '0lS749qkjRWofWvqZkPjUR', name: 'Bloom' },
    { id: '1rKb9LKE8zvqFt31jcDXL4', name: 'Alaska' },
    { id: '7l25S0mMvxqchC5HNbqCfn', name: 'Eraser' },
    { id: '5El211T02lZsF1Qm9R83xD', name: 'Azrael' },
    { id: '6g65kolQxocUNH1t0WCEpW', name: 'Butter' },
    { id: '2P0Li2XGQxz5JL0wLreTOc', name: 'Window' },
    { id: '4aEF3ieD8mQ5Jc0TxeeN93', name: 'A List' }
  ];

  const spotifyState = {
    shuffled: [],
    currentIndex: 0,
    playing: false,
    visible: false,
    closedByUser: false  // If user closed, don't auto-reopen
  };

  function shuffleSpotifyPlaylist() {
    spotifyState.shuffled = shuffle(HVOB_TRACKS);
    spotifyState.currentIndex = 0;
  }

  function getSpotifyEmbedUrl(trackId, autoplay) {
    // Using compact theme, no cover art for cleaner embed
    return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0${autoplay ? '' : ''}`;
  }

  function showSpotifyPlayer() {
    const player = $('#spotify-player');
    const quiz = $('#screen-quiz');
    if (!player) return;

    spotifyState.visible = true;
    spotifyState.closedByUser = false;
    player.classList.remove('hidden');
    quiz.classList.add('has-player');
    loadSpotifyTrack(true);
  }

  function hideSpotifyPlayer() {
    const player = $('#spotify-player');
    const quiz = $('#screen-quiz');
    const iframe = $('#sp-iframe');
    if (!player) return;

    spotifyState.visible = false;
    spotifyState.playing = false;
    player.classList.add('hidden');
    quiz.classList.remove('has-player');

    // Stop playback by clearing iframe
    if (iframe) iframe.src = '';
  }

  function loadSpotifyTrack(autoplay) {
    if (spotifyState.shuffled.length === 0) shuffleSpotifyPlaylist();

    const track = spotifyState.shuffled[spotifyState.currentIndex];
    const iframe = $('#sp-iframe');
    const trackName = $('#sp-track-name');
    const playBtn = $('#sp-play');

    if (!iframe || !track) return;

    trackName.textContent = track.name;
    iframe.src = getSpotifyEmbedUrl(track.id, autoplay);
    spotifyState.playing = autoplay;
    playBtn.textContent = autoplay ? '⏸' : '▶';
  }

  function spotifyNext() {
    spotifyState.currentIndex++;
    if (spotifyState.currentIndex >= spotifyState.shuffled.length) {
      shuffleSpotifyPlaylist();
    }
    loadSpotifyTrack(true);
  }

  function spotifyPrev() {
    spotifyState.currentIndex--;
    if (spotifyState.currentIndex < 0) {
      spotifyState.currentIndex = spotifyState.shuffled.length - 1;
    }
    loadSpotifyTrack(true);
  }

  function spotifyTogglePlay() {
    const iframe = $('#sp-iframe');
    const playBtn = $('#sp-play');
    const iframeWrap = $('#sp-iframe-wrap');

    if (spotifyState.playing) {
      // Pause: clear iframe src
      iframe.src = '';
      spotifyState.playing = false;
      playBtn.textContent = '▶';
    } else {
      // Play: reload current track
      const track = spotifyState.shuffled[spotifyState.currentIndex];
      if (track) {
        iframe.src = getSpotifyEmbedUrl(track.id, true);
        spotifyState.playing = true;
        playBtn.textContent = '⏸';
      }
    }
  }

  function initSpotifyPlayer() {
    const prevBtn = $('#sp-prev');
    const playBtn = $('#sp-play');
    const nextBtn = $('#sp-next');
    const closeBtn = $('#sp-close');

    if (prevBtn) prevBtn.addEventListener('click', spotifyPrev);
    if (playBtn) playBtn.addEventListener('click', spotifyTogglePlay);
    if (nextBtn) nextBtn.addEventListener('click', spotifyNext);
    if (closeBtn) closeBtn.addEventListener('click', () => {
      spotifyState.closedByUser = true;
      hideSpotifyPlayer();
    });
  }

  // ========================================
  // INIT
  // ========================================
  function init() {
    initEventListeners();
    initReportTabs();
    initSpotifyPlayer();

    // Secret admin access via URL hash: #admin
    if (location.hash === '#admin') {
      openAdmin('welcome');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
