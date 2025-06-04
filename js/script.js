// ESC schließt Menü (mobile)
document.addEventListener("keydown", function (e) {
  const toggle = document.getElementById("nav-toggle");
  if (e.key === "Escape" && toggle.checked) {
    toggle.checked = false;
  }
});

// Beim Klick auf Link schließt das Menü (mobile)
document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("nav-toggle").checked = false;
  });
});

const navToggle = document.getElementById("nav-toggle");

navToggle.addEventListener("change", function () {
  document.body.classList.toggle("menu-open", this.checked);
});
