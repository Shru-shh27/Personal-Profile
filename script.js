/* ============================================
   PORTFOLIO — script.js
   ============================================ */

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
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

document.querySelectorAll('a, button, .skill-card, .project-card, .stat-card, .ach-card, .edu-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    ring.style.opacity = '0.3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.opacity = '1';
  });
});


/* ── PARTICLES ── */
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');
let W, H, pts = [];

function initCanvas() {
  W = canvas.width  = innerWidth;
  H = canvas.height = innerHeight;
  pts = Array.from({ length: 90 }, () => ({
    x:  Math.random() * W,
    y:  Math.random() * H,
    r:  Math.random() * 1.5 + 0.5,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    o:  Math.random() * 0.7 + 0.15
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W;  if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;  if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle   = `rgba(57,255,136,${p.o})`;
    ctx.shadowBlur  = 8;
    ctx.shadowColor = '#39FF88';
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}

initCanvas();
drawParticles();
window.addEventListener('resize', initCanvas);


/* ── TYPING EFFECT ── */
const phrases = [
  'Full Stack Developer',
  'Problem Solver',
  'Open Source Enthusiast',
  'Competitive Programmer'
];
let pi = 0, ci = 0, deleting = false;

function type() {
  const el     = document.getElementById('typing-text');
  const phrase = phrases[pi];

  if (!deleting) {
    el.textContent = phrase.slice(0, ci + 1) + '_';
    ci++;
    if (ci === phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    el.textContent = phrase.slice(0, ci - 1) + '_';
    ci--;
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 55 : 90);
}
type();


/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


/* ── NAV SHRINK ON SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.padding = scrollY > 60 ? '0.8rem 4rem' : '1.2rem 4rem';
});


/* ── MOBILE HAMBURGER ── */
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () =>
    document.getElementById('navLinks').classList.remove('open')
  )
);


/* ── CONTACT FORM ── */
function sendMessage(btn) {
  btn.textContent        = 'Sent! ✓';
  btn.style.background   = 'transparent';
  btn.style.color        = 'var(--green)';
  setTimeout(() => {
    btn.textContent      = 'Send Message →';
    btn.style.background = 'var(--green)';
    btn.style.color      = '#000';
  }, 3000);
}
