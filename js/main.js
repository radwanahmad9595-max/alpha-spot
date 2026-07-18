// ── LANGUAGE ──
let currentLang = 'en';

function toggleLang() {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  document.documentElement.lang = currentLang;
  document.body.classList.toggle('ar', currentLang === 'ar');
  document.getElementById('langBtn').textContent = currentLang === 'en' ? 'عربي' : 'EN';
  applyLang();
}

function applyLang() {
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${currentLang}`);
    if (!text) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else if (el.tagName === 'OPTION') {
      el.textContent = text;
    } else {
      el.innerHTML = text;
    }
  });
}

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveLink();
});

// ── ACTIVE NAV LINK ──
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  let current = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });

  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

// ── SMOOTH SCROLL ──
function goTo(target) {
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    goTo(a.getAttribute('href'));
  });
});

// ── MOBILE MENU ──
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('mobile-open');
}

function closeMenu() {
  document.querySelector('.nav-links').classList.remove('mobile-open');
}

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', closeMenu);
});

document.addEventListener('click', e => {
  const links = document.querySelector('.nav-links');
  const toggle = document.querySelector('.menu-toggle');
  if (links.classList.contains('mobile-open') && !links.contains(e.target) && !toggle.contains(e.target)) {
    closeMenu();
  }
});

// ── SCROLL ANIMATIONS ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── WHATSAPP CONTACT ──
function sendWhatsApp() {
  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const phone   = document.getElementById('fphone').value.trim();
  const service = document.getElementById('fservice').value;
  const msg     = document.getElementById('fmsg').value.trim();

  if (!name || !service) {
    alert(currentLang === 'ar' ? 'يرجى ملء الاسم والخدمة المطلوبة.' : 'Please fill in your name and the service needed.');
    return;
  }

  const text = `*New Inquiry — ALFA SPOT Website*\n\n*Name:* ${name}\n*Email:* ${email || '—'}\n*Phone:* ${phone || '—'}\n*Service:* ${service}\n*Message:* ${msg || '—'}`;
  window.open(`https://wa.me/962789711007?text=${encodeURIComponent(text)}`, '_blank');

  if (typeof saveLead === 'function') {
    saveLead({ source: 'contact_form', name, email, phone, services: [service], message: msg });
  }
}

// ── COUNTER ANIMATION ──
function animateCounters() {
  document.querySelectorAll('.stat h3').forEach(el => {
    const target = el.textContent;
    const num    = parseInt(target);
    if (isNaN(num)) return;
    let count = 0;
    const step = Math.ceil(num / 40);
    const timer = setInterval(() => {
      count += step;
      if (count >= num) { count = num; clearInterval(timer); }
      el.textContent = count + (target.includes('+') ? '+' : target.includes('%') ? '%' : '');
    }, 30);
  });
}

const heroObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) { animateCounters(); heroObserver.disconnect(); }
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) heroObserver.observe(statsEl);
