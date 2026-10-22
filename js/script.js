const btn = document.getElementById('menu-btn');
const nav = document.getElementById('menu');

function toggleMenu() {
  const isOpen = btn.classList.toggle('open');

  nav.classList.toggle('flex', isOpen);
  nav.classList.toggle('hidden', !isOpen);

  btn.setAttribute('aria-expanded', isOpen);
  btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}

btn.addEventListener('click', toggleMenu);

// Close the mobile menu when a link is clicked
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (btn.classList.contains('open')) toggleMenu();
  });
});

// Sticky header: add a background and shadow once the page is scrolled
const header = document.getElementById('site-header');

function updateHeader() {
  const isScrolled = window.scrollY > 10;

  header.classList.toggle('bg-white', isScrolled);
  header.classList.toggle('shadow-md', isScrolled);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Testimonials carousel (mobile): swipe with CSS scroll-snap, dots to navigate
const track = document.getElementById('testimonials-track');
const slides = Array.from(track.children);
const dots = Array.from(document.querySelectorAll('#testimonial-dots button'));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function setActiveDot(index) {
  dots.forEach((dot, i) => {
    const isActive = i === index;

    dot.classList.toggle('bg-brightRed', isActive);
    dot.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    track.scrollTo({
      left: slides[i].offsetLeft - slides[0].offsetLeft,
      behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
    });
  });
});

// Highlight the dot of the slide that is mostly visible
const slideObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveDot(slides.indexOf(entry.target));
    });
  },
  { root: track, threshold: 0.6 }
);

slides.forEach((slide) => slideObserver.observe(slide));
setActiveDot(0);
