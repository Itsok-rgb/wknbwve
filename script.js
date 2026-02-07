/**
 * Propose Day — For Jaan 💕
 * Interactive effects & surprises
 */

(function () {
  'use strict';

  // ========== CONFIG ==========
  const CONFIG = {
    typingSpeed: 32,
    typingStartDelay: 1200,
    noButtonMessages: [
      'Are you sure?',
      'Think again, Jaan!',
      'Please? 💕',
      'Pretty please?',
      "I'll keep asking!",
      "You know you want to say Yes! 😊",
      'Last chance... just kidding! 💖',
      'Okay okay, take your time, Jaan!'
    ],
    secretMessages: [
      'You are my everything, Jaan! 💕',
      'I fall for you every single day.',
      'My heart belongs to you. Always.',
      'You make every day beautiful.',
      'I love you more than words can say.'
    ],
    scrollSurpriseText: 'I love you, Jaan! 💗',
    lateSurpriseDelay: 8000,
    lateSurpriseText: "Psst... You're the most beautiful person I know. ✨",
    burstHeartCount: 12,
    confettiCount: 180
  };

  // ========== DOM ELEMENTS ==========
  const typedEl = document.getElementById('typed');
  const cursorEl = document.getElementById('cursor');
  const btnYes = document.getElementById('btnYes');
  const btnNo = document.getElementById('btnNo');
  const buttonsDiv = document.getElementById('buttons');
  const successDiv = document.getElementById('success');
  const questionBox = document.querySelector('.question-box');
  const heartsContainer = document.getElementById('heartsBg');
  const nameEl = document.querySelector('.card .name');

  const fullMessage = "From the moment you came into my life, Jaan, every day has felt like a blessing. Your smile lights up my world, your voice is my favorite sound, and your presence is my home. On this Propose Day, I want to tell you—you're not just my love, you're my best friend, my comfort, and my forever. I fall for you more every single day. 💕";

  // ========== 1. TYPING EFFECT ==========
  let charIndex = 0;
  function typeWriter() {
    if (charIndex < fullMessage.length) {
      typedEl.textContent += fullMessage.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, CONFIG.typingSpeed);
    } else {
      if (cursorEl) cursorEl.style.display = 'none';
    }
  }
  setTimeout(typeWriter, CONFIG.typingStartDelay);

  // ========== 2. FLOATING HEARTS BACKGROUND ==========
  const heartChars = ['♥', '💕', '💗', '💖', '💝'];
  const heartCount = 18;
  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = heartChars[i % heartChars.length];
    heart.style.top = Math.random() * 100 + '%';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 4 + 's';
    heart.style.fontSize = (1 + Math.random() * 0.8) + 'rem';
    if (heartsContainer) heartsContainer.appendChild(heart);
  }

  // ========== 3. SURPRISE: SPARKLES ON LOAD ==========
  function createSparkles() {
    const count = 15;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1200);
      }, i * 80);
    }
  }
  setTimeout(createSparkles, 600);

  // ========== 4. SURPRISE: CLICK ON NAME "JAAN" ==========
  let secretIndex = 0;
  if (nameEl) {
    nameEl.addEventListener('click', () => {
      // Heart burst
      const rect = nameEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const hearts = ['💕', '💗', '💖', '💝', '♥'];
      for (let i = 0; i < CONFIG.burstHeartCount; i++) {
        const angle = (i / CONFIG.burstHeartCount) * Math.PI * 2 + Math.random();
        const dist = 80 + Math.random() * 60;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        const h = document.createElement('span');
        h.className = 'burst-heart';
        h.textContent = hearts[i % hearts.length];
        h.style.left = centerX + 'px';
        h.style.top = centerY + 'px';
        h.style.setProperty('--tx', tx + 'px');
        h.style.setProperty('--ty', ty + 'px');
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 1000);
      }
      // Secret message popover
      const msg = CONFIG.secretMessages[secretIndex % CONFIG.secretMessages.length];
      secretIndex++;
      showSecretPopover(msg, centerX, centerY - 60);
    });
  }

  function showSecretPopover(text, x, y) {
    const existing = document.querySelector('.secret-popover');
    if (existing) existing.remove();
    const pop = document.createElement('div');
    pop.className = 'secret-popover';
    pop.textContent = text;
    pop.style.left = Math.max(20, Math.min(x - 140, window.innerWidth - 300)) + 'px';
    pop.style.top = Math.max(20, y) + 'px';
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 2500);
  }

  // ========== 5. YES BUTTON ==========
  if (btnYes) {
    btnYes.addEventListener('click', () => {
      if (buttonsDiv) buttonsDiv.style.display = 'none';
      if (questionBox) questionBox.style.display = 'none';
      if (successDiv) successDiv.classList.add('show');
      launchConfetti();
      // Surprise: second wave of hearts after a short delay
      setTimeout(launchHeartsWave, 800);
      setTimeout(createSparkles, 1200);
    });
  }

  // ========== 6. NO BUTTON (run away + change Yes text) ==========
  let noClicks = 0;
  if (btnNo) {
    btnNo.addEventListener('click', () => {
      noClicks++;
      if (btnYes && noClicks <= CONFIG.noButtonMessages.length) {
        btnYes.textContent = CONFIG.noButtonMessages[noClicks - 1];
        btnYes.style.transform = `scale(${1 + noClicks * 0.04}) translateY(-2px)`;
      }
      const maxW = window.innerWidth - 140;
      const maxH = window.innerHeight - 60;
      btnNo.style.position = 'fixed';
      btnNo.style.left = Math.max(20, Math.random() * maxW) + 'px';
      btnNo.style.top = Math.max(20, Math.random() * maxH) + 'px';
    });
  }

  // ========== 7. CONFETTI ==========
  function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#e91e63', '#f8bbd9', '#ffd700', '#c2185b', '#ffb3d9', '#fff', '#ff69b4'];
    const confetti = [];
    for (let i = 0; i < CONFIG.confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 4 + 2,
        angle: Math.random() * 360,
        spin: (Math.random() - 0.5) * 12
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let allDone = true;
      confetti.forEach(c => {
        c.y -= c.speed;
        c.x += Math.sin((c.angle * Math.PI) / 180) * 0.8;
        c.angle += c.spin;
        if (c.y > -30) allDone = false;
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.angle * Math.PI) / 180);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        ctx.restore();
      });
      if (!allDone) requestAnimationFrame(draw);
    }
    draw();
  }

  // ========== 8. SURPRISE: HEARTS WAVE AFTER YES ==========
  function launchHeartsWave() {
    const emojis = ['💕', '💗', '💖', '💝', '♥'];
    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        const h = document.createElement('span');
        h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        h.style.cssText = `
          position: fixed;
          left: ${Math.random() * 100}vw;
          bottom: -30px;
          font-size: ${1.2 + Math.random() * 1.2}rem;
          pointer-events: none;
          z-index: 9997;
          animation: heartFloatUp 3s ease-out forwards;
        `;
        document.body.appendChild(h);
        if (!document.getElementById('heart-float-style')) {
          const style = document.createElement('style');
          style.id = 'heart-float-style';
          style.textContent = `
            @keyframes heartFloatUp {
              0% { transform: translateY(0) scale(0.5); opacity: 0; }
              20% { opacity: 1; }
              100% { transform: translateY(-110vh) scale(1.2); opacity: 0; }
            }
          `;
          document.head.appendChild(style);
        }
        setTimeout(() => h.remove(), 3200);
      }, i * 120);
    }
  }

  // ========== 9. SURPRISE: SCROLL TO REVEAL MESSAGE ==========
  const scrollSurprise = document.createElement('div');
  scrollSurprise.className = 'scroll-surprise';
  scrollSurprise.textContent = CONFIG.scrollSurpriseText;
  document.body.appendChild(scrollSurprise);

  let scrollSurpriseShown = false;
  function checkScroll() {
    if (scrollSurpriseShown) return;
    const scrollY = window.scrollY || window.pageYOffset;
    const trigger = 120;
    if (scrollY > trigger) {
      scrollSurpriseShown = true;
      scrollSurprise.classList.add('visible');
    }
  }
  window.addEventListener('scroll', checkScroll, { passive: true });

  // ========== 10. SURPRISE: LATE MESSAGE (after 8 sec) ==========
  setTimeout(() => {
    if (successDiv && !successDiv.classList.contains('show')) {
      showSecretPopover(
        CONFIG.lateSurpriseText,
        window.innerWidth / 2,
        window.innerHeight * 0.2
      );
    }
  }, CONFIG.lateSurpriseDelay);

  // ========== 11. EASTER EGG: TRIPLE-CLICK ON CARD ==========
  let tripleClickCount = 0;
  let tripleClickTimer = null;
  const card = document.querySelector('.card');
  if (card) {
    card.addEventListener('click', () => {
      tripleClickCount++;
      clearTimeout(tripleClickTimer);
      tripleClickTimer = setTimeout(() => { tripleClickCount = 0; }, 500);
      if (tripleClickCount === 3) {
        tripleClickCount = 0;
        const rect = card.getBoundingClientRect();
        showSecretPopover('Forever & Always, Jaan! 💖', rect.left + rect.width / 2, rect.top + rect.height / 2 - 40);
      }
    });
  }

})();
