let currentImageIndex = 1;

function changeImage(direction) {
  const images = document.querySelectorAll(".gallery-image");
  const dots = document.querySelectorAll(".dot");

  if (images.length === 0) return;

  // Aktuelles Bild ausblenden
  images[currentImageIndex - 1].classList.remove("active");
  dots[currentImageIndex - 1].classList.remove("active");

  // Neuen Index berechnen
  currentImageIndex += direction;

  if (currentImageIndex > images.length) {
    currentImageIndex = 1;
  }
  if (currentImageIndex < 1) {
    currentImageIndex = images.length;
  }

  // Neues Bild anzeigen
  images[currentImageIndex - 1].classList.add("active");
  dots[currentImageIndex - 1].classList.add("active");
}

function currentImage(index) {
  const images = document.querySelectorAll(".gallery-image");
  const dots = document.querySelectorAll(".dot");

  if (images.length === 0) return;

  // Alle ausblenden
  images.forEach((img) => img.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Gewähltes anzeigen
  currentImageIndex = index;
  images[index - 1].classList.add("active");
  dots[index - 1].classList.add("active");
}

// Auto-Slide (optional - alle 5 Sekunden)
setInterval(() => {
  if (document.querySelectorAll(".gallery-image").length > 1) {
    changeImage(1);
  }
}, 5000);

// -----------------------------------------------------
// Touch-Events für Swipe-Funktionalität
// -----------------------------------------------------

let startX = null;
let startY = null;

document.addEventListener(
  "touchstart",
  function (e) {
    if (!e.target.closest(".gallery-container")) return;

    const firstTouch = e.touches[0];
    startX = firstTouch.clientX;
    startY = firstTouch.clientY;
  },
  { passive: true }
);

document.addEventListener(
  "touchmove",
  function (e) {
    if (!startX || !startY || !e.target.closest(".gallery-container")) return;
    e.preventDefault(); // Verhindert Scrollen während Swipe
  },
  { passive: false }
);

document.addEventListener(
  "touchend",
  function (e) {
    if (!startX || !startY || !e.target.closest(".gallery-container")) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const deltaX = startX - endX;
    const deltaY = startY - endY;

    // Mindestdistanz für Swipe
    const minSwipeDistance = 50;

    // Horizontaler Swipe (mehr als vertikaler)
    if (
      Math.abs(deltaX) > Math.abs(deltaY) &&
      Math.abs(deltaX) > minSwipeDistance
    ) {
      if (deltaX > 0) {
        // Swipe nach links = nächstes Bild
        changeImage(1);
      } else {
        // Swipe nach rechts = vorheriges Bild
        changeImage(-1);
      }
    }

    // Reset
    startX = null;
    startY = null;
  },
  { passive: true }
);
