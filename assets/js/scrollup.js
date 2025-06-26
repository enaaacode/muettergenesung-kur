// Get the button
let mybutton = document.getElementById("myBtn");

// Sicherstellen, dass der Button initial versteckt ist
if (mybutton) {
  mybutton.style.display = "none";
  mybutton.classList.remove("show");
}

// When the user scrolls down 300px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (!mybutton) return; // Sicherheitscheck

  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    mybutton.style.display = "block";
    mybutton.classList.add("show");
  } else {
    mybutton.style.display = "none";
    mybutton.classList.remove("show");
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Initial check when page loads
document.addEventListener("DOMContentLoaded", function () {
  scrollFunction(); // Prüft sofort beim Laden der Seite
});
