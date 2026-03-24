/* =============================================
   EMPRESA — main.js
============================================= */

/* ---- Custom Cursor ---- */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .service-card, .product-card, .portfolio-item, .gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '24px';
    cursor.style.height = '24px';
    cursor.style.background = 'var(--lavender)';
    ring.style.width  = '60px';
    ring.style.height = '60px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '14px';
    cursor.style.height = '14px';
    cursor.style.background = 'var(--ink)';
    ring.style.width  = '40px';
    ring.style.height = '40px';
  });
});

/* ---- Scroll progress bar ---- */
const progressBar = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
});

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('back-top').classList.toggle('show', window.scrollY > 400);
});

/* ---- Mobile menu ---- */
function toggleMobile() {
  const menu = document.getElementById('mobileMenu');
  const btn  = document.getElementById('hamburger');
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
}

function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').setAttribute('aria-expanded', 'false');
}

/* ---- Scroll reveal (IntersectionObserver) ---- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ---- Portfolio filter ---- */
function filterPortfolio(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');

  document.querySelectorAll('.portfolio-item').forEach(item => {
    const match = cat === 'all' || item.dataset.cat === cat;
    item.style.opacity    = match ? '1' : '0.2';
    item.style.transform  = match ? '' : 'scale(0.97)';
    item.style.transition = 'opacity 0.4s, transform 0.4s';
  });
}

/* ---- Contact form ---- */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const fname = document.getElementById('fname').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg   = document.getElementById('message').value.trim();

  if (!fname || !email || !msg) {
    alert('Por favor completa todos los campos requeridos.');
    return;
  }

  document.getElementById('formWrapper').style.display = 'none';
  document.getElementById('formSuccess').classList.add('show');
});
