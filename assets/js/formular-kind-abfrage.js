function showKinderFelder(anzahl) {
  const container = document.getElementById("kinder-felder");
  container.innerHTML = "";

  anzahl = parseInt(anzahl) || 0;
  if (anzahl < 1) return;
  anzahl = Math.min(5, anzahl);

  for (let i = 1; i <= anzahl; i++) {
    // Heute
    const heute = new Date();
    // min: 12 Jahre alt (frühestes Datum)
    const minDate = new Date(
      heute.getFullYear() - 12,
      heute.getMonth(),
      heute.getDate()
    );
    // max: 3 Jahre alt (spätestes Datum)
    const maxDate = new Date(
      heute.getFullYear() - 3,
      heute.getMonth(),
      heute.getDate()
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
        <fieldset>
          <legend>Geschlecht</legend>
          <div class="radio-option">
            <input type="radio" id="kind${i}-geschlecht-weiblich" name="Kind${i} Geschlecht" value="weiblich" required />
            <label for="kind${i}-geschlecht-weiblich">Weiblich</label>
          </div>
          <div class="radio-option">
            <input type="radio" id="kind${i}-geschlecht-maennlich" name="Kind${i} Geschlecht" value="männlich" />
            <label for="kind${i}-geschlecht-maennlich">Männlich</label>
          </div>
          <div class="radio-option">
            <input type="radio" id="kind${i}-geschlecht-divers" name="Kind${i} Geschlecht" value="divers" />
            <label for="kind${i}-geschlecht-divers">Divers</label>
          </div>
        </fieldset> 
      </fieldset>
    `;
  }

  // EventListener für jedes Geburtsdatum-Feld nach dem Generieren
  for (let i = 1; i <= anzahl; i++) {
    const geburtsdatumInput = document.getElementById(`kind${i}-geburtsdatum`);
    const hinweisDiv = document.getElementById(`kind${i}-hinweis`);
    if (geburtsdatumInput && hinweisDiv) {
      geburtsdatumInput.addEventListener("change", function () {
        const geburtsdatum = new Date(this.value);
        if (isNaN(geburtsdatum)) {
          hinweisDiv.style.display = "none";
          return;
        }
        const heute = new Date();
        let alter = heute.getFullYear() - geburtsdatum.getFullYear();
        const m = heute.getMonth() - geburtsdatum.getMonth();
        if (m < 0 || (m === 0 && heute.getDate() < geburtsdatum.getDate())) {
          alter--;
        }
        if (alter < 3 || alter > 12) {
          hinweisDiv.innerHTML =
            "Leider haben wir kein Angebot für Mütter mit Kindern, die unter 3 oder über 12 Jahre alt sind.";
          hinweisDiv.style.display = "block";
        } else {
          hinweisDiv.style.display = "none";
        }
      });
    }
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
