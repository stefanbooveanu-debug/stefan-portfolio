const SITE = {
  email: "stefanbooveanu@gmail.com",
};

function setActiveNav() {
  const page = document.body.dataset.page;
  document.querySelectorAll(".nav a, nav a").forEach((link) => {
    if (link.dataset.page === page) link.style.fontWeight = "bold";
  });
}

async function copyEmail(button) {
  try {
    await navigator.clipboard.writeText(SITE.email);
    const original = button.textContent.trim();
    button.textContent = "copied!";
    setTimeout(() => {
      button.textContent = original;
    }, 1500);
  } catch {
    window.location.href = `mailto:${SITE.email}`;
  }
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
    const message = String(data.get("message") || "").trim();

    if (!name || !message) {
      status.textContent = "fill in name and message pls";
      status.className = "status error";
      return;
    }

    const body = [message, "", `- ${name}`].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`msg from ${name}`)}&body=${encodeURIComponent(body)}`;
    status.textContent = "opening mail app...";
    status.className = "status success";
  });
}

function initVisitorCounter() {
  document.querySelectorAll("[data-visitor]").forEach((el) => {
    const key = "stefan-site-visits";
    const base = Number(localStorage.getItem(key) || 42069);
    const count = base + 1;
    localStorage.setItem(key, String(count));
    el.textContent = String(count);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  initEmailButtons();
  initContactForm();
  initVisitorCounter();
});
