/* ══════════════════════════════════════════
   AKSHAYA R · PORTFOLIO · script.js
══════════════════════════════════════════ */

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

(function animCursor() {
  cursorX += (mouseX - cursorX) * 0.14;
  cursorY += (mouseY - cursorY) * 0.14;
  cursor.style.left = cursorX + 'px';
  cursor.style.top  = cursorY + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button, .project-item, .role-card, .skill-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('big'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
});

/* ── NAV: solidify on scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', window.scrollY > 60);
}, { passive: true });

/* ── MOBILE NAV ── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
function closeMob() { mobileNav.classList.remove('open'); }

/* ── VIDEO CONTROLS: PAUSE/PLAY + MUTE/UNMUTE ── */
const heroVideo   = document.getElementById('heroVideo');
const vidToggle   = document.getElementById('vidToggle');
const vidMute     = document.getElementById('vidMute');
const iconPause   = document.getElementById('iconPause');
const iconPlay    = document.getElementById('iconPlay');
const iconSound   = document.getElementById('iconSound');
const iconMuted   = document.getElementById('iconMuted');
const lblPlayPause = document.getElementById('lblPlayPause');
const lblMute     = document.getElementById('lblMute');

// Video starts muted (browser autoplay policy requires this)
// User must click UNMUTE to hear audio
if (heroVideo) {
  heroVideo.muted = true;

  // Pause / Play
  if (vidToggle) {
    vidToggle.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play();
        iconPause.style.display = '';
        iconPlay.style.display  = 'none';
        if (lblPlayPause) lblPlayPause.textContent = 'PAUSE';
      } else {
        heroVideo.pause();
        iconPause.style.display = 'none';
        iconPlay.style.display  = '';
        if (lblPlayPause) lblPlayPause.textContent = 'PLAY';
      }
    });
  }

  // Mute / Unmute
  if (vidMute) {
    vidMute.addEventListener('click', () => {
      if (heroVideo.muted) {
        heroVideo.muted = false;
        iconSound.style.display = '';
        iconMuted.style.display = 'none';
        if (lblMute) lblMute.textContent = 'MUTE';
      } else {
        heroVideo.muted = true;
        iconSound.style.display = 'none';
        iconMuted.style.display = '';
        if (lblMute) lblMute.textContent = 'UNMUTE';
      }
    });
  }
}

/* ── STAT COUNT-UP ── */
function countUp(el) {
  const target = parseInt(el.dataset.target, 10);
  const isPct  = el.classList.contains('stat-pct');
  const dur    = isPct ? 1800 : 1200;
  const step   = dur / 60;
  let current  = 0;
  const inc    = target / (dur / (1000 / 60));

  const timer = setInterval(() => {
    current += inc;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 1000 / 60);
}

/* ── SCROLL OBSERVER ── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;

    // reveal animations
    if (el.classList.contains('reveal') || el.classList.contains('reveal-left')) {
      el.classList.add('in');
    }

    // timeline items
    if (el.classList.contains('timeline-item')) {
      el.classList.add('visible');
    }

    // count-up stats
    if (el.classList.contains('stat-num') && !el.dataset.counted) {
      el.dataset.counted = 'true';
      countUp(el);
    }

    io.unobserve(el);
  });
}, { threshold: 0.15 });

/* mark elements for observation */
document.querySelectorAll(
  '.identity-inner, .beliefs-inner, .expertise-inner, .projects-inner, .contact-inner, ' +
  '.project-item, .role-card, .skill-card, .fact, .stat-num, .timeline-item'
).forEach(el => {
  if (!el.classList.contains('stat-num')) {
    el.classList.add('reveal');
  }
  io.observe(el);
});

/* re-observe stat nums specifically */
document.querySelectorAll('.stat-num').forEach(el => io.observe(el));

/* ── IDENTITY TAG FILTER ── */
const iTags = document.querySelectorAll('.itag');
iTags.forEach(tag => {
  tag.addEventListener('click', () => {
    iTags.forEach(t => t.classList.remove('active'));
    tag.classList.add('active');
  });
});

/* ── SMOOTH ANCHOR OFFSET (for fixed nav) ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── PROJECT ITEMS: stagger reveal ── */
document.querySelectorAll('.project-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.07}s`;
});

/* ── SCROLL CUE: hide on first scroll ── */
const scrollCue = document.getElementById('scrollCue');
if (scrollCue) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      scrollCue.style.opacity = '0';
      scrollCue.style.pointerEvents = 'none';
    }
  }, { once: true, passive: true });
}
