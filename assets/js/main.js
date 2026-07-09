document.querySelectorAll("[data-visitor]").forEach((el) => {
  const key = "stefan-site-visits";
  const count = Number(localStorage.getItem(key) || 42069) + 1;
  localStorage.setItem(key, String(count));
  el.textContent = String(count);
});
