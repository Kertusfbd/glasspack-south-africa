// Nav scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));

  // Contact form now posts directly to FormSubmit (native form submission).
  // FormSubmit requires a real (non-AJAX) POST with its captcha step enabled
  // in order for the automatic "we received your enquiry" reply to the
  // customer (_autoresponse) to fire - it explicitly does not support
  // autoresponse on AJAX submissions, so we no longer intercept submit here.
  // After FormSubmit's one-time verification step, it redirects back to
  // contact.html?sent=true, and this shows the thank-you banner.
  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('sent') === 'true') {
      const banner = document.getElementById('sentBanner');
      const form = document.getElementById('enquiryForm');
      if (banner) banner.style.display = 'block';
      if (form) form.style.display = 'none';
    }
  });

  // Smooth anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Mobile hamburger navigation
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.querySelector('.nav-links');
  const navCtaEl = document.getElementById('navCta');
  const navOverlay = document.getElementById('navOverlay');

  function closeMobileNav() {
    navToggle.classList.remove('is-open');
    navLinksEl.classList.remove('is-open');
    navCtaEl.classList.remove('is-open');
    navOverlay.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMobileNav() {
    navToggle.classList.add('is-open');
    navLinksEl.classList.add('is-open');
    navCtaEl.classList.add('is-open');
    navOverlay.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.contains('is-open');
      if (isOpen) closeMobileNav();
      else openMobileNav();
    });

    navOverlay.addEventListener('click', closeMobileNav);

    // Close menu when a nav link is tapped (so navigating actually navigates)
    navLinksEl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // Close menu if window is resized back to desktop width
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMobileNav();
    });
  }
