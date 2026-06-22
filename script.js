/* ============================================================
   AKSHAYA R — Portfolio JS
   Features: navbar scroll, counter animation, scroll reveal,
             smooth section highlighting, hamburger menu
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR: scroll style ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ---- HAMBURGER (mobile) ---- */
  const hamburger = document.getElementById('hamburger');
  hamburger?.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    const navCta   = document.querySelector('.nav-cta');
    if (!navLinks) return;

    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '64px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(10,10,10,0.98)';
    navLinks.style.padding = '20px 5%';
    navLinks.style.gap = '1.4rem';
    navLinks.style.borderBottom = '1px solid rgba(201,149,42,0.2)';

    if (isOpen) {
      navLinks.style.display = 'none';
    }
  });

  /* ---- COUNTER ANIMATION ---- */
  const counters = document.querySelectorAll('.stat-num');
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    const statsBar = document.querySelector('.stats-bar');
    if (!statsBar) return;

    const rect = statsBar.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      countersStarted = true;
      counters.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const step = Math.ceil(target / 30);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 40);
      });
    }
  }

  window.addEventListener('scroll', startCounters, { passive: true });
  startCounters(); // run immediately in case already visible

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll(
    '.stat, .info-card, .expertise-card, .project-card, .about-text, .contact-btn'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // stagger siblings
          const siblings = [...entry.target.parentElement.children];
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- ACTIVE NAV LINK on scroll ---- */
  const sections = document.querySelectorAll('section[id], div.stats-bar');
  const navItems = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
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
    { threshold: 0.3 }
  );

  sections.forEach(s => sectionObserver.observe(s));

  /* ---- HERO: avatar video fallback ---- */
  const avatarVideo = document.getElementById('avatarVideo');
  if (avatarVideo) {
    avatarVideo.addEventListener('error', () => {
      // If video not found, show a dark gradient fallback
      const bg = document.querySelector('.hero-bg');
      if (bg) {
        bg.style.background = 'linear-gradient(135deg, #0A0A0A 0%, #1A1208 50%, #0A0A0A 100%)';
        avatarVideo.style.display = 'none';
      }
    });
  }

  /* ---- SMOOTH SCROLL for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // close mobile menu if open
      const navLinks = document.querySelector('.nav-links');
      if (navLinks && window.innerWidth < 768) {
        navLinks.style.display = 'none';
      }
    });
  });

  /* ---- PROJECT CARDS: hover label tooltip ---- */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.cursor = 'pointer';
    });
    card.addEventListener('click', () => {
      // placeholder — wire up to individual project pages
      console.log('Project:', card.querySelector('.project-name')?.textContent);
    });
  });

});
