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