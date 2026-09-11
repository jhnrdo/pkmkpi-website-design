const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');

function closeMenu() {
  navMenu.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('click', (event) => {
  if (!event.target.closest('.right-section')) closeMenu();
});

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30), { passive: true });

const observed = document.querySelectorAll('section, .program-card, .disability-card, .team-card');
observed.forEach((element) => element.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
observed.forEach((element) => revealObserver.observe(element));

const fab = document.querySelector('.a11y-fab');
const panel = document.querySelector('.a11y-panel');
const closeA11y = document.querySelector('.a11y-close');
let textScale = 1;

function setPanel(open) {
  panel.classList.toggle('active', open);
  panel.setAttribute('aria-hidden', String(!open));
  fab.setAttribute('aria-expanded', String(open));
}

fab.addEventListener('click', () => setPanel(!panel.classList.contains('active')));
closeA11y.addEventListener('click', () => setPanel(false));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { closeMenu(); setPanel(false); }
  if (event.altKey && event.key.toLowerCase() === 'a') setPanel(!panel.classList.contains('active'));
});

document.querySelectorAll('[data-a11y]').forEach((button) => button.addEventListener('click', () => {
  const action = button.dataset.a11y;
  if (action === 'increase') textScale = Math.min(1.2, textScale + 0.1);
  if (action === 'decrease') textScale = Math.max(0.9, textScale - 0.1);
  if (action === 'increase' || action === 'decrease') document.documentElement.style.fontSize = `${textScale * 100}%`;
  if (action === 'contrast') document.body.classList.toggle('high-contrast');
  if (action === 'motion') document.body.classList.toggle('pause-motion');
  if (action === 'reset') {
    textScale = 1;
    document.documentElement.style.fontSize = '';
    document.body.classList.remove('high-contrast', 'pause-motion');
  }
}));
