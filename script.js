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

/* ---- Gallery — dynamic render + modal ---- */
const galleryData = [
  { emoji: '🎮', h: 220, bg: 'linear-gradient(135deg,var(--pink),var(--lavender))',   title: 'Kickoff Workshops',   desc: 'Every studio starts with a 2-day intensive workshop where we map the entire business from IP to IP address.' },
  { emoji: '🖌️', h: 300, bg: 'linear-gradient(135deg,var(--mint),var(--sky))',        title: 'Brand Sprint',        desc: 'Three days. One identity. Our design team runs rapid branding sprints that define visual language in record time.' },
  { emoji: '📊', h: 180, bg: 'linear-gradient(135deg,var(--peach),var(--lemon))',     title: 'Pitch Decks',         desc: '47 pitch decks. $12M raised. Our financial storytelling turns game visions into investor conviction.' },
  { emoji: '🤝', h: 260, bg: 'linear-gradient(135deg,var(--lavender),var(--pink))',   title: 'Co-founder Matching', desc: 'Our proprietary matching system has connected 38 co-founder pairs across disciplines.' },
  { emoji: '🚀', h: 200, bg: 'linear-gradient(135deg,var(--sky),var(--mint))',        title: 'Launch Days',         desc: 'Nothing beats the energy of a live launch. We coordinate every detail from Steam page to social campaign.' },
  { emoji: '🌍', h: 280, bg: 'linear-gradient(135deg,var(--lemon),var(--peach))',     title: 'Global Network',      desc: 'Our DevNetwork spans 42 countries — connecting studios, publishers, and investors worldwide.' },
  { emoji: '💡', h: 190, bg: 'linear-gradient(135deg,var(--pink),var(--peach))',      title: 'Ideation Labs',       desc: 'Monthly open labs where developers bring raw concepts and leave with validated business cases.' },
  { emoji: '🏆', h: 240, bg: 'linear-gradient(135deg,var(--mint),var(--lavender))',   title: 'Award Season',        desc: 'Our studios have won 23 industry awards in the past two years alone — from BAFTA nominees to IGF finalists.' },
];

const masonry = document.querySelector('.gallery-masonry');

galleryData.forEach(g => {
  const item = document.createElement('article');
  item.className = 'gallery-item reveal';
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'listitem');
  item.setAttribute('aria-label', g.title);
  item.innerHTML = `
    <div class="gallery-visual" style="height:${g.h}px; background:${g.bg}; font-size:2.5rem;">
      ${g.emoji}
    </div>`;
  item.addEventListener('click', () => openModal(g));
  item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(g); });
  masonry.appendChild(item);
  setTimeout(() => observer.observe(item), 50);
});

/* Gallery modal */
const modal = document.getElementById('galleryModal');

function openModal(g) {
  document.getElementById('modalEmoji').textContent = g.emoji;
  document.getElementById('modalTitle').textContent = g.title;
  document.getElementById('modalDesc').textContent  = g.desc;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

document.getElementById('modalClose').addEventListener('click', () => {
  modal.classList.remove('open');
  document.body.style.overflow = '';
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
});

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
