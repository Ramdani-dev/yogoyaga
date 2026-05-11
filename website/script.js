// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1200);
});

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal, .culture-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== BACK TO TOP =====
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 600);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== LIGHTBOX =====
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');

document.querySelectorAll('.gallery-item, .interaksi-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
});

document.querySelector('.lightbox-close').addEventListener('click', () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-count'));
      const suffix = entry.target.getAttribute('data-suffix') || '';
      let current = 0;
      const increment = Math.max(1, Math.floor(target / 60));
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        entry.target.textContent = current.toLocaleString('id-ID') + suffix;
      }, 30);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ===== SMOOTH NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== PARALLAX HERO =====
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    const scrolled = window.scrollY;
    heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
  }
});
