const burgerIcon = document.getElementById("burger-icon");
const closeIcon = document.getElementById("close-icon");
const mobileOverlay = document.getElementById("mobile-overlay");

function closeMobileMenu() {
  burgerIcon.style.display = "flex";
  closeIcon.style.display = "none";
  mobileOverlay.style.display = "none";
}

// Klick auf Burger-Menü
burgerIcon.addEventListener("click", function () {
  burgerIcon.style.display = "none";
  closeIcon.style.display = "flex";
  mobileOverlay.style.display = "flex";
});

// Klick auf x-Icon
closeIcon.addEventListener("click", closeMobileMenu);

// Das sucht sich alle Links und Buttons im mobilen Menü raus
const focusableSelectors = "a[href], button:not([disabled])";
const focusableEls = mobileOverlay.querySelectorAll(focusableSelectors);

// Wenn jemand Tab drückt, bleibt man im Menübereich
mobileOverlay.addEventListener("keydown", function (e) {
  if (e.key === "Tab") {
    const first = focusableEls[0];
    const last = focusableEls[focusableEls.length - 1];

    // Shift + Tab → von erstem nach ganz hinten
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }

    // Tab → von letztem nach ganz vorne
    else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

// Overlay mit ESC schließen
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeMobileMenu();
  }
});
