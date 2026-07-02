const SITE = {
  email: "stefanbooveanu@gmail.com",
  github: "https://github.com/stefanbooveanu-debug",
  linkedin: "https://www.linkedin.com/in/stefan-booveanu-4a316a328/",
};

const html = document.documentElement;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) html.setAttribute("data-theme", savedTheme);

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
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !topic || !subject || !message) {
      status.textContent = "Please fill in all fields.";
      status.className = "status error";
      return;
    }

    const body = [`Topic: ${topic}`, "", message, "", `— ${name}`, email].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`[${topic}] ${subject}`)}&body=${encodeURIComponent(body)}`;
    status.textContent = "Opening your email app…";
    status.className = "status success";
  });
}

function initSocials() {
  const links = [
    { href: SITE.github, label: "GH", title: "GitHub" },
    { href: SITE.linkedin, label: "IN", title: "LinkedIn" },
  ].filter((link) => link.href);

  document.querySelectorAll("[data-socials]").forEach((container) => {
    container.replaceChildren();
    links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
      anchor.setAttribute("aria-label", link.title);
      anchor.textContent = link.label;
      container.appendChild(anchor);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  initThemeToggle();
  initMenuToggle();
  initEmailButtons();
  initContactForm();
  initSocials();

  document.querySelectorAll("[data-email-display]").forEach((el) => {
    el.textContent = SITE.email;
  });
});
