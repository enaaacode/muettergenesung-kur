function showKinderFelder(anzahl) {
  const container = document.getElementById("kinder-felder");
  container.innerHTML = "";

  anzahl = parseInt(anzahl) || 0;
  if (anzahl < 1) return;
  anzahl = Math.min(5, anzahl);

  const urlParams = new URLSearchParams(window.location.search);
  const startDate = urlParams.get("startdate");

  // Referenzdatum: startdate oder heute als Fallback
  const referenzDatum =
    startDate && !isNaN(new Date(startDate)) ? new Date(startDate) : new Date();

  for (let i = 1; i <= anzahl; i++) {
    // min: 12 Jahre alt (frühestes Datum)
    const minDate = new Date(
      referenzDatum.getFullYear() - 12,
      referenzDatum.getMonth(),
      referenzDatum.getDate()
    );

    // max: 3 Jahre alt (spätestes Datum)
    const maxDate = new Date(
      referenzDatum.getFullYear() - 3,
      referenzDatum.getMonth(),
      referenzDatum.getDate()
    );

    // Format yyyy-mm-dd
    const minDateStr = minDate.toISOString().split("T")[0];
    const maxDateStr = maxDate.toISOString().split("T")[0];

    container.innerHTML += `
    <fieldset class="form-container">
      <legend class="visually-hidden">Kind ${i}</legend>
      <h3>Kind ${i}</h3>
      <div class="form-field">
        <label for="kind${i}-vorname">Vorname</label>
        <input type="text" id="kind${i}-vorname" name="Kind${i} Vorname" required />
      </div>
      <div class="form-field">
        <label for="kind${i}-nachname">Nachname</label>
        <input type="text" id="kind${i}-nachname" name="Kind${i} Nachname" required />
      </div>
      <div class="form-field">
        <label for="kind${i}-geburtsdatum">Geburtsdatum <small><em>(Für Kinder im Alter von 3 bis 12 Jahren)</em></small></label>
        <input type="date" id="kind${i}-geburtsdatum" name="Kind${i} Geburtsdatum" required min="${minDateStr}" max="${maxDateStr}" />
        <div id="kind${i}-hinweis" class="kind-hinweis" style="color: var(--color-pink); margin-top: 0.5em; display:none;"></div>
      </div>
        <div class="form-field">
          <label for="kind${i}-krankenkasse">Krankenkasse</label>
          <select
            id="kind${i}-krankenkasse"
            name="Kind${i} Krankenkasse"
            required
            aria-required="true"
            onchange="toggleOtherKasse(this, 'kind${i}-krankenkasse-sonstige')"
          >
            <option value="" disabled selected>Bitte auswählen</option>
            <option value="AOK">AOK</option>
            <option value="TK">Techniker Krankenkasse (TK)</option>
            <option value="Barmer">Barmer</option>
            <option value="DAK">DAK-Gesundheit</option>
            <option value="IKK">IKK</option>
            <option value="BKK">BKK</option>
            <option value="KKH">KKH</option>
            <option value="Sonstige">Sonstige</option>
          </select>
          <input
            type="text"
            id="kind${i}-krankenkasse-sonstige"
            name="Kind${i} Krankenkasse Sonstige"
            placeholder="Bitte Krankenkasse eintragen"
            style="display: none; margin-top: 0.5em"
          />
        </div> 

        <div class="form-field">
          <label for="kind${i}-geschlecht">Geschlecht</label>
          <select
            id="kind${i}-geschlecht"
            name="Kind${i} Geschlecht"
            required
            aria-required="true"
          >
            <option value="" disabled selected>Bitte auswählen</option>
            <option value="w">Weiblich</option>
            <option value="m">Männlich</option>
            <option value="d">Divers</option>
          </select>
        </div>
      </fieldset>
    `;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);

  const minKinder = parseInt(urlParams.get("min"), 10);
  const maxKinder = parseInt(urlParams.get("max"), 10);

  const kinderInput = document.getElementById("kinder");
  kinderInput.min = minKinder;
  kinderInput.max = maxKinder;

  // Falls value leer oder kleiner als min → setze auf min
  if (!kinderInput.value || parseInt(kinderInput.value, 10) < minKinder) {
    kinderInput.value = minKinder;
  }

  // initial die Felder anzeigen
  showKinderFelder(kinderInput.value);

  // bei Änderung dynamisch aktualisieren
  kinderInput.addEventListener("change", (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < minKinder) val = minKinder;
    if (val > maxKinder) val = maxKinder;
    e.target.value = val;
    showKinderFelder(val);
  });
});

// Die Funktion für das Sonstige-Feld:
function toggleOtherKasse(selectElem, inputId) {
  const otherField = document.getElementById(inputId);
  if (!otherField) return;
  if (selectElem.value === "Sonstige") {
    otherField.style.display = "block";
    otherField.required = true;
  } else {
    otherField.style.display = "none";
    otherField.required = false;
  }
}
