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

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".kurtermine-filter button");
  const kurtermineElements = document.querySelectorAll(
    ".kurtermine-section-grid-container--element"
  );

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Active State
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      kurtermineElements.forEach((element) => {
        const klinik = element.getAttribute("data-klinik");
        const verfuegbar = element.getAttribute("data-verfuegbar");

        let showElement = false;

        if (filter === "alle") {
          showElement = true;
        } else if (filter === "verfuegbar") {
          showElement = verfuegbar === "ja";
        } else {
          showElement = klinik === filter;
        }

        if (showElement) {
          element.style.display = "block";
        } else {
          element.style.display = "none";
        }
      });
    });
  });
});
