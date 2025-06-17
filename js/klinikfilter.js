// Alle Filter-Buttons auswählen
const filterButtons = document.querySelectorAll(".kurtermine-filter button");

// Für jeden Button einen Klick-Listener hinzufügen
filterButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    // Alle Buttons von "active" befreien
    filterButtons.forEach(function (b) {
      b.classList.remove("active");
    });
    // Diesen Button als aktiv markieren
    this.classList.add("active");
    // Fokus entfernen (optional, für bessere UX)
    this.blur();

    // Den Wert des angeklickten Filters holen (z.B. "loßburg" oder "alle")
    const filter = this.getAttribute("data-filter");

    // Alle Kurtermin-Elemente auswählen
    const termine = document.querySelectorAll(
      ".kurtermine-section-grid-container--element"
    );

    // Jedes Element prüfen und entsprechend ein- oder ausblenden
    termine.forEach(function (el) {
      const klinik = el.getAttribute("data-klinik");
      // Zeige das Element, wenn "alle" gewählt ist oder das Element zur gefilterten Klinik passt
      if (filter === "alle" || klinik === filter) {
        el.style.display = "";
      } else {
        el.style.display = "none";
      }
    });
  });
});
