const SITE = {
  email: "stefanbooveanu@gmail.com",
  github: "https://github.com/stefanbooveanu-debug",
  linkedin: "https://www.linkedin.com/in/stefan-booveanu-4a316a328/",
};

const SOCIAL_ICONS = {
  github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A9.86 9.86 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a-2.062 2.062 0 0 1-2.063-2.065 2.062 2.062 0 0 1 2.063-2.063c1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
};

const html = document.documentElement;
const savedTheme = localStorage.getItem("theme");
html.setAttribute("data-theme", savedTheme || "light");

function setActiveNav() {
  const page = document.body.dataset.page;
  document.querySelectorAll(".nav a").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === page);
  });
}

async function copyEmail(button) {
  try {
    await navigator.clipboard.writeText(SITE.email);
    const original = button.textContent.trim();
    button.textContent = "Email copied!";
    setTimeout(() => {
      button.textContent = original.includes("@") ? SITE.email : original;
    }, 1800);
  } catch {
    window.location.href = `mailto:${SITE.email}`;
  }
}

function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

function initMenuToggle() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("siteNav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

function initEmailButtons() {
  document.querySelectorAll("[data-copy-email]").forEach((button) => {
    button.addEventListener("click", () => copyEmail(button));
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.getElementById("formStatus");
    const data = new FormData(form);

    if (data.get("company")) return;

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const topic = String(data.get("topic") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !topic || !message) {
      status.textContent = "yo fill everything in pls 😭";
      status.className = "status error";
      return;
    }

    const body = [`about: ${topic}`, "", message, "", `— ${name}`, email].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`${topic} from ${name}`)}&body=${encodeURIComponent(body)}`;
    status.textContent = "opening ur email app... 🤞";
    status.className = "status success";
  });
}

function initSocials() {
  document.querySelectorAll("[data-socials]").forEach((container) => {
    if (container.children.length) return;

    const links = [
      { href: SITE.github, icon: "github", title: "GitHub" },
      { href: SITE.linkedin, icon: "linkedin", title: "LinkedIn" },
    ].filter((link) => link.href);

    links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
      anchor.setAttribute("aria-label", link.title);
      anchor.innerHTML = SOCIAL_ICONS[link.icon];
      container.appendChild(anchor);
    });
  });
}

function initSocialIconButtons() {
  document.querySelectorAll("[data-social-icon]").forEach((button) => {
    if (button.innerHTML.trim()) return;
    const icon = SOCIAL_ICONS[button.dataset.socialIcon];
    if (icon) button.innerHTML = icon;
  });
}

function initVisitorCounter() {
  document.querySelectorAll("[data-visitor]").forEach((el) => {
    const key = "stefan-site-visits";
    const base = Number(localStorage.getItem(key) || 42069);
    const count = base + 1;
    localStorage.setItem(key, String(count));
    el.textContent = String(count).padStart(7, "0");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  initThemeToggle();
  initMenuToggle();
  initEmailButtons();
  initContactForm();
  initSocials();
  initSocialIconButtons();
  initVisitorCounter();

  document.querySelectorAll("[data-email-display]").forEach((el) => {
    el.textContent = SITE.email;
  });
});
