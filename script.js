/* ============================================================
   FUTURE OF ROBOTICS — SCRIPT
   Loader, nav, animations, accordion, gallery, form, counters
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- LOADING SCREEN ---------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 600);
  });

  /* ---------------- SCROLL PROGRESS BAR ---------------- */
  const scrollProgress = document.getElementById('scrollProgress');
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  /* ---------------- NAVBAR SCROLL STATE ---------------- */
  const navbar = document.getElementById('navbar');
  function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }

  /* ---------------- BACK TO TOP ---------------- */
  const backToTop = document.getElementById('backToTop');
  function updateBackToTop() {
    backToTop.classList.toggle('show', window.scrollY > 600);
  }
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateNavbar();
    updateBackToTop();
    highlightActiveNav();
  });
  updateScrollProgress();
  updateNavbar();

  /* ---------------- HAMBURGER MENU ---------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  /* ---------------- ACTIVE NAV LINK ON SCROLL ---------------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');
  function highlightActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.id;
    });
    navItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('href') === '#' + current);
    });
  }

  /* ---------------- HERO BUTTONS ---------------- */
  document.getElementById('scrollIndicator').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('learnMoreBtn').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('exploreBtn').addEventListener('click', () => {
    document.getElementById('types').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------------- TYPING TEXT EFFECT (Hero subtitle) ---------------- */
  const typedTextEl = document.getElementById('typedText');
  const fullText = 'Explore the world of intelligent machines and automation.';
  let charIndex = 0;
  function typeWriter() {
    if (charIndex <= fullText.length) {
      typedTextEl.innerHTML = fullText.substring(0, charIndex) + '<span class="cursor">&nbsp;</span>';
      charIndex++;
      setTimeout(typeWriter, 40);
    } else {
      typedTextEl.innerHTML = fullText + '<span class="cursor">&nbsp;</span>';
    }
  }
  setTimeout(typeWriter, 900);

  /* ---------------- FLOATING PARTICLES (Hero background) ---------------- */
  const particlesContainer = document.getElementById('particles');
  const PARTICLE_COUNT = 30;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '0px';
    p.style.animationDuration = (8 + Math.random() * 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = (0.3 + Math.random() * 0.5).toString();
    particlesContainer.appendChild(p);
  }

  /* ---------------- BUTTON RIPPLE EFFECT ---------------- */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  /* ---------------- SCROLL REVEAL ANIMATIONS ---------------- */
  const revealTargets = document.querySelectorAll(
    '.about-card, .type-card, .tech-card, .app-card, .gallery-item, .accordion-item, .contact-form, .counter-item, .section-header, .timeline-item'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------------- ANIMATED COUNTERS ---------------- */
  const counters = document.querySelectorAll('.counter');
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------------- ACCORDION / FAQ ---------------- */
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  /* ---------------- GALLERY LIGHTBOX ---------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const caption = item.getAttribute('data-caption');
      const bgClass = Array.from(item.classList).find(c => c.startsWith('gal-'));
      lightboxContent.className = 'lightbox-content ' + bgClass;
      lightboxContent.textContent = caption;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------------- CONTACT FORM VALIDATION ---------------- */
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formSuccess = document.getElementById('formSuccess');

  function setError(input, errorEl, message) {
    input.classList.toggle('invalid', !!message);
    errorEl.textContent = message;
  }

  function validateForm() {
    let valid = true;

    if (nameInput.value.trim().length < 2) {
      setError(nameInput, document.getElementById('nameError'), 'Please enter your name (2+ characters).');
      valid = false;
    } else {
      setError(nameInput, document.getElementById('nameError'), '');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      setError(emailInput, document.getElementById('emailError'), 'Please enter a valid email address.');
      valid = false;
    } else {
      setError(emailInput, document.getElementById('emailError'), '');
    }

    if (messageInput.value.trim().length < 10) {
      setError(messageInput, document.getElementById('messageError'), 'Message must be at least 10 characters.');
      valid = false;
    } else {
      setError(messageInput, document.getElementById('messageError'), '');
    }

    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formSuccess.classList.remove('show');
    if (validateForm()) {
      formSuccess.classList.add('show');
      form.reset();
      setTimeout(() => formSuccess.classList.remove('show'), 4000);
    }
  });

  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('invalid');
    });
  });

  /* ---------------- FOOTER YEAR ---------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------------- LAZY LOADING (for any future <img> tags) ---------------- */
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img').forEach(img => {
      img.loading = 'lazy';
    });
  }

});
