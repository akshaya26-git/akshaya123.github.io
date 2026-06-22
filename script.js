/* ============================================================
   AKSHAYA R — Portfolio JS (Enhanced Edition)
   Features: loader, custom cursor, particles, audio toggle,
             counter, scroll reveal, active nav, timeline,
             hamburger menu, smooth scroll
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     PAGE LOADER
     ============================================================ */
  const loader    = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');
  const loaderPct  = document.getElementById('loaderPct');

  let pct = 0;
  const loaderTimer = setInterval(() => {
    pct += Math.random() * 18;
    if (pct >= 100) {
      pct = 100;
      clearInterval(loaderTimer);
      loaderFill.style.width = '100%';
      loaderPct.textContent = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        initAllAnimations();
      }, 500);
    } else {
      loaderFill.style.width = pct + '%';
      loaderPct.textContent = Math.floor(pct) + '%';
    }
  }, 60);

  document.body.style.overflow = 'hidden';

  /* ============================================================
     INIT ALL ANIMATIONS AFTER LOAD
     ============================================================ */
  function initAllAnimations() {
    initCursor();
    initParticles();
    initNavbar();
    initHamburger();
    initAudioToggle();
    initCounters();
    initScrollReveal();
    initActiveNav();
    initTimeline();
    initCertCards();
    initSmoothScroll();
    initProjectCards();
  }

  /* ============================================================
     CUSTOM CURSOR
     ============================================================ */
  function initCursor() {
    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    });

    function animateRing() {
      ringX += (mouseX - ringX - 15) * 0.12;
      ringY += (mouseY - ringY - 15) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover expand on interactive elements
    document.querySelectorAll('a, button, .project-card, .expertise-card, .info-card, .cert-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
  }

  /* ============================================================
     PARTICLE CANVAS
     ============================================================ */
  function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h, particles;

    function resize() {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    function createParticles() {
      particles = [];
      const count = Math.floor((w * h) / 12000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.3,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          alpha: Math.random() * 0.5 + 0.15,
        });
      }
    }

    createParticles();

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,149,42,${p.alpha})`;
        ctx.fill();
      });

      // Draw faint lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201,149,42,${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    draw();
  }

  /* ============================================================
     NAVBAR SCROLL
     ============================================================ */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ============================================================
     HAMBURGER MENU
     ============================================================ */
  function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    hamburger?.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      const navCta   = document.querySelector('.nav-cta');
      if (!navLinks) return;

      const isOpen = navLinks.style.display === 'flex';

      if (isOpen) {
        navLinks.style.display = 'none';
        if (navCta) navCta.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '64px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(10,10,10,0.97)';
        navLinks.style.backdropFilter = 'blur(20px)';
        navLinks.style.padding = '20px 5%';
        navLinks.style.gap = '1.4rem';
        navLinks.style.borderBottom = '1px solid rgba(201,149,42,0.15)';
        navLinks.style.zIndex = '99';
      }
    });
  }

  /* ============================================================
     AUDIO TOGGLE
     ============================================================ */
  function initAudioToggle() {
    const video  = document.getElementById('avatarVideo');
    const btn    = document.getElementById('audioToggle');
    const label  = document.getElementById('audioLabel');
    const icon   = document.getElementById('audioIcon');
    if (!video || !btn) return;

    let muted = true;
    video.muted = true;

    // Muted icon SVG
    const mutedSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15"/>
      <line x1="17" y1="9" x2="23" y2="15"/>
    </svg>`;

    // Unmuted icon SVG
    const unmutedSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>`;

    icon.innerHTML = mutedSVG;

    btn.addEventListener('click', () => {
      muted = !muted;
      video.muted = muted;

      if (muted) {
        icon.innerHTML = mutedSVG;
        label.textContent = 'UNMUTE';
        btn.classList.remove('unmuted');
      } else {
        icon.innerHTML = unmutedSVG;
        label.textContent = 'MUTE';
        btn.classList.add('unmuted');
        // Re-play if paused due to autoplay policy
        video.play().catch(() => {});
      }
    });
  }

  /* ============================================================
     COUNTER ANIMATION
     ============================================================ */
  function initCounters() {
    const counters = document.querySelectorAll('.stat-num');
    let started = false;

    function startCounters() {
      if (started) return;
      const statsBar = document.querySelector('.stats-bar');
      if (!statsBar) return;

      const rect = statsBar.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        started = true;
        counters.forEach(el => {
          const target = parseInt(el.dataset.target, 10);
          let current = 0;
          const duration = 1200;
          const startTime = performance.now();

          function updateCounter(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuart
            const ease = 1 - Math.pow(1 - progress, 4);
            current = Math.round(ease * target);
            el.textContent = current;
            if (progress < 1) requestAnimationFrame(updateCounter);
          }

          requestAnimationFrame(updateCounter);
        });
      }
    }

    window.addEventListener('scroll', startCounters, { passive: true });
    startCounters();
  }

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll(
      '.stat, .info-card, .expertise-card, .project-card, .about-text, .contact-btn, .cert-card'
    );

    revealEls.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const siblings = [...entry.target.parentElement.children];
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, idx * 75);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    revealEls.forEach(el => observer.observe(el));
  }

  /* ============================================================
     ACTIVE NAV LINK
     ============================================================ */
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navItems.forEach(a => {
              a.style.color = '';
              a.style.opacity = '';
            });
            const active = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (active) {
              active.style.color = '#C9952A';
              active.style.opacity = '1';
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach(s => observer.observe(s));
  }

  /* ============================================================
     TIMELINE REVEAL
     ============================================================ */
  function initTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 150);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach(item => observer.observe(item));
  }

  /* ============================================================
     CERT CARDS STAGGER REVEAL
     ============================================================ */
  function initCertCards() {
    const cards = document.querySelectorAll('.cert-card');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const siblings = [...document.querySelectorAll('.cert-card')];
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, idx * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach(c => observer.observe(c));
  }

  /* ============================================================
     SMOOTH SCROLL
     ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        const navLinks = document.querySelector('.nav-links');
        if (navLinks && window.innerWidth < 768) {
          navLinks.style.display = 'none';
        }
      });
    });
  }

  /* ============================================================
     PROJECT CARDS
     ============================================================ */
  function initProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        console.log('Project:', card.querySelector('.project-name')?.textContent);
      });
    });
  }

  /* ============================================================
     VIDEO FALLBACK
     ============================================================ */
  const avatarVideo = document.getElementById('avatarVideo');
  if (avatarVideo) {
    avatarVideo.addEventListener('error', () => {
      const wrap = document.getElementById('heroVideoWrap');
      if (wrap) {
        wrap.style.background = 'linear-gradient(135deg, #1A1208 0%, #0A0A0A 100%)';
        avatarVideo.style.display = 'none';
      }
    });
  }

});
