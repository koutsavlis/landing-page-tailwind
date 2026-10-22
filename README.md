# Manage – Landing Page

Responsive landing page built with semantic HTML, Tailwind CSS and vanilla JavaScript.

**Live demo:** https://loquacious-wisp-1db6d1.netlify.app/

![Screenshot of the Manage landing page](./img/screen.png)

## About

I built this page while following Traversy Media's Tailwind CSS course. The design comes from the [Frontend Mentor](https://www.frontendmentor.io/) "Manage landing page" challenge.

After finishing the course I went back to the project and reviewed and improved it on my own.

## My improvements

- **Accessibility:** meaningful `alt` text, `aria-label` on icon-only links and buttons, `aria-expanded` on the menu toggle, a labelled email input and a correct heading hierarchy
- **Bug fix:** the mobile menu rendered off-screen in current Chrome. An unused `self-end` class on an absolutely positioned element caused it, so I removed it.
- **Mobile menu UX:** the menu now closes when you tap a link
- **Content fixes:** a duplicated section heading and a duplicated testimonial
- **Cleanup:** removed unused classes, no-op CSS rules and the obsolete IE meta tag, and added a meta description and favicon
- **Repository hygiene:** added `.gitignore` and removed `node_modules` from version control

## Built with

- HTML5
- Tailwind CSS v3
- Vanilla JavaScript
- Netlify (continuous deployment from `main`)

## Run locally

```bash
git clone https://github.com/koutsavlis/landing-page-tailwind.git
cd landing-page-tailwind
npm install
npm run watch   # development: rebuilds CSS on every change
npm run build   # one-off build
```

Tailwind compiles `input.css` into `css/main.css`. You can find the custom colors and breakpoints in `tailwind.config.js`.