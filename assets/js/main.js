const SITE = {
  email: "stefanbooveanu@gmail.com",
};

const CONSTRUCTION_MSGS = [
  "⚠ UNDER CONSTRUCTION ⚠ (but it works lol)",
  "🚧 SITE STILL COOKING 🚧 come back later maybe",
  "⚠ WARNING: 15yo made this ⚠",
  "🔥 NEW UPDATES SOON 🔥 (probably)",
  "💀 no warranty 💀 use at own risk",
];

const SPARKLES = ["✨", "⭐", "💫", "🌟", "★", "⚡"];

async function copyEmail(button) {
  try {
    await navigator.clipboard.writeText(SITE.email);
    const original = button.textContent.trim();
    button.textContent = "copied! 🎉";
    setTimeout(() => { button.textContent = original; }, 1500);
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
      status.textContent = "fill in name and message pls 😅";
      status.className = "status error";
      return;
    }

    const body = [message, "", `- ${name}`].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`msg from ${name}`)}&body=${encodeURIComponent(body)}`;
    status.textContent = "opening mail app... 📧";
    status.className = "status success";
  });
}

function initVisitorCounter() {
  document.querySelectorAll("[data-visitor]").forEach((el) => {
    const key = "stefan-site-visits";
    const count = Number(localStorage.getItem(key) || 42069) + 1;
    localStorage.setItem(key, String(count));
    el.textContent = String(count);
  });
}

function initConstructionBanner() {
  const el = document.querySelector("[data-construction]");
  if (!el) return;
  let i = 0;
  setInterval(() => {
    i = (i + 1) % CONSTRUCTION_MSGS.length;
    el.textContent = CONSTRUCTION_MSGS[i];
  }, 4000);
}

function initSparkles() {
  document.addEventListener("click", (e) => {
    const spark = document.createElement("span");
    spark.className = "sparkle";
    spark.textContent = SPARKLES[Math.floor(Math.random() * SPARKLES.length)];
    spark.style.left = `${e.clientX}px`;
    spark.style.top = `${e.clientY}px`;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 800);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initEmailButtons();
  initContactForm();
  initVisitorCounter();
  initConstructionBanner();
  initSparkles();
});
