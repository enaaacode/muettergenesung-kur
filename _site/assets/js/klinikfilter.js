document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".kurtermine-filter button");

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      // Aktiven Button markieren
      filterButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      this.blur();

      const filter = this.getAttribute("data-filter").toLowerCase().trim();

      // === KURTERMINE ===
      const termine = document.querySelectorAll(
        ".kurtermine-section-grid-container--element"
      );
      termine.forEach(function (el) {
        const klinik =
          el.getAttribute("data-klinik")?.toLowerCase().trim() || "";
        const verfuegbar =
          el.getAttribute("data-verfuegbar")?.toLowerCase().trim() || "";
        let showElement = false;

        if (filter === "alle") {
          showElement = true;
        } else if (filter === "verfuegbar") {
          showElement = verfuegbar === "ja";
        } else {
          showElement = klinik === filter;
        }

        el.style.display = showElement ? "block" : "none";
      });

      // === TEAM ===
      const team = document.querySelectorAll(".team-section-grid--element");
      team.forEach(function (el) {
        const klinik = el.getAttribute("data-klinik")?.toLowerCase().trim();
        el.style.display = filter === "alle" || klinik === filter ? "" : "none";
      });

      // === GÄSTEBUCH ===
      const gaestebuch = document.querySelectorAll(".gaestebucheintrag");
      gaestebuch.forEach(function (el) {
        const klinik = el.getAttribute("data-klinik")?.toLowerCase().trim();
        el.style.display = filter === "alle" || klinik === filter ? "" : "none";
      });
    });
  });
});
