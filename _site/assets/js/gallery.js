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
