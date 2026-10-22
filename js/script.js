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
