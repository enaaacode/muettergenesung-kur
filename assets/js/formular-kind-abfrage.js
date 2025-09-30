function showKinderFelder(anzahl) {
  const container = document.getElementById("kinder-felder");
  container.innerHTML = "";
  anzahl = parseInt(anzahl) || 0;
  if (anzahl < 1) return;
  anzahl = Math.min(5, anzahl);

  for (let i = 1; i <= anzahl; i++) {
    container.innerHTML += `
    <div class="form-container">
      
        <legend><h3>Kind ${i}</h3></legend>
        
        <div class="form-field">
          <label for="kind${i}-vorname">Vorname</label>
          <input type="text" id="kind${i}-vorname" name="Kind${i} Vorname" required />
        </div>
        
        <div class="form-field">
          <label for="kind${i}-nachname">Nachname</label>
          <input type="text" id="kind${i}-nachname" name="Kind${i} Nachname" required />
        </div>
        
        <div class="form-field">
          <label for="kind${i}-geburtsdatum">Geburtsdatum</label>
          <input type="date" id="kind${i}-geburtsdatum" name="Kind${i} Geburtsdatum" required />
        </div>
        
        <div class="form-field">
          <label for="kind${i}-kasse">Krankenkasse</label>
          <input type="text" id="kind${i}-kasse" name="Kind${i} Krankenkasse" required />
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
    </div>
    `;
  }
}

// Initial anzeigen, falls Wert schon gesetzt ist
document.addEventListener("DOMContentLoaded", function () {
  const kinderInput = document.getElementById("kinder");
  showKinderFelder(kinderInput.value);
});
