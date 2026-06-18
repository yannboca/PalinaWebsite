/* MAISON FABLE — scripts.js */

// ── Header scroll state ───────────────────
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── Mobile nav toggle ──────────────────────
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('.nav-link').forEach(link =>
    link.addEventListener('click', () => nav.classList.remove('open'))
  );
}

// ── Scroll reveal ──────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.classList.contains('reveal-card')
        ? Array.from(el.parentElement.children).indexOf(el) * 130
        : 0;
      setTimeout(() => el.classList.add('visible'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-section, .reveal-card').forEach(el =>
  revealObserver.observe(el)
);

// ── Newsletter form ────────────────────────
document
  .getElementById("newsletterForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    const msg = document.getElementById("newsletterMsg");
    msg.innerHTML = "Welcome to the story.";
    msg.classList.add('visible');
    this.reset();
    setTimeout(() => msg.classList.remove('visible'), 4000);
  });

// ── Fable Archive — character quiz ─────────
const characters = {
  dreamer: {
    title: "The Dreamkeeper",
    text: "You collect memories and transform them into new worlds.",
    img: "Images/collection1.jpeg.jpeg"
  },
  storyteller: {
    title: "The Storyteller",
    text: "Every mystery becomes part of your journey.",
    img: "Images/collection2.jpeg.jpeg"
  },
  wanderer: {
    title: "The Wanderer",
    text: "Beyond every gate lies a new chapter. You never stop exploring.",
    img: "Images/collection3.jpeg.jpeg"
  }
};

function setCharacter(type, btn) {
  const result = document.getElementById("result");
  const data = characters[type] || characters.wanderer;

  // mark chosen door, disable the row so the choice feels final
  document.querySelectorAll('.door-btn').forEach(b => {
    b.classList.remove('chosen');
    b.disabled = true;
  });
  if (btn) btn.classList.add('chosen');

  result.classList.add('has-content');
  result.innerHTML = `
    <div class="result-inner">
      <h2>${data.title}</h2>
      <p>${data.text}</p>
      <img src="${data.img}" alt="${data.title}">
    </div>
  `;

  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
