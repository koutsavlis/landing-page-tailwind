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

// Newsletter form: client-side validation with accessible messages
const form = document.getElementById('newsletter');
const emailInput = document.getElementById('newsletter-email');
const formMessage = document.getElementById('newsletter-message');
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showFormMessage(text, type) {
  const hasError = type === 'error';

  formMessage.textContent = text;
  formMessage.classList.toggle('text-red-400', hasError);
  formMessage.classList.toggle('text-green-400', type === 'success');

  emailInput.classList.toggle('ring-2', hasError);
  emailInput.classList.toggle('ring-red-400', hasError);
  emailInput.setAttribute('aria-invalid', hasError ? 'true' : 'false');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (email === '') {
    showFormMessage('Please enter your email address.', 'error');
    emailInput.focus();
    return;
  }

  if (!EMAIL_PATTERN.test(email)) {
    showFormMessage('Please enter a valid email, e.g. name@example.com.', 'error');
    emailInput.focus();
    return;
  }

  // Demo only: there is no backend, so we confirm and reset the form
  showFormMessage(`Thanks! ${email} is now subscribed.`, 'success');
  form.reset();
});

// Clear the error as soon as the user starts fixing the input
emailInput.addEventListener('input', () => {
  if (emailInput.getAttribute('aria-invalid') === 'true') {
    showFormMessage('', null);
  }
});
