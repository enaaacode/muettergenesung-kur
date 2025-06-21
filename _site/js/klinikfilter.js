const filterButtons = document.querySelectorAll(".kurtermine-filter button");

filterButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    // Aktiven Button markieren
    filterButtons.forEach(function (b) {
      b.classList.remove("active");
    });
    this.classList.add("active");
    this.blur();

    const filter = this.getAttribute("data-filter");

    // === STELLENANZEIGEN ===
    const termine = document.querySelectorAll(
      ".kurtermine-section-grid-container--element"
    );
    termine.forEach(function (el) {
      const klinik = el.getAttribute("data-klinik");
      if (filter === "alle" || klinik === filter) {
        el.style.display = "";
      } else {
        el.style.display = "none";
      }
    });

    // === TEAM ===
    const team = document.querySelectorAll(".team-section-grid--element");
    team.forEach(function (el) {
      const klinik = el.getAttribute("data-klinik");
      if (filter === "alle" || klinik === filter) {
        el.style.display = "";
      } else {
        el.style.display = "none";
      }
    });

    // === GÄSTEBUCH ===
    const gaestebuch = document.querySelectorAll(".gaestebucheintrag");
    gaestebuch.forEach(function (el) {
      const klinik = el.getAttribute("data-klinik");
      if (filter === "alle" || klinik === filter) {
        el.style.display = "";
      } else {
        el.style.display = "none";
      }
    });
  });
});
