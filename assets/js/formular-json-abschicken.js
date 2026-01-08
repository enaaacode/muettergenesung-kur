// an das Hauptformular binden
const form = document.querySelector(".kurtermin-anfrage-formular");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // FormData vom echten Formular lesen (inkl. cap-widget token)
  const formData = new FormData(form);

  // Kinder aus dem Formular sammeln (AUßERHALB des data-Objekts)
  const children = [];
  const childCount = parseInt(formData.get("Kinder") || "0", 10);
  for (let i = 1; i <= childCount; i++) {
    const first = formData.get(`Kind${i} Vorname`);
    const last = formData.get(`Kind${i} Nachname`);
    const dob = formData.get(`Kind${i} Geburtsdatum`);
    const sex = formData.get(`Kind${i} Geschlecht`);
    let childKk = formData.get(`Kind${i} Krankenkasse`);
    if (childKk === "Sonstige") {
      const other = formData.get(`Kind${i} Krankenkasse Sonstige`);
      childKk = other || childKk;
    }
    if (first && last && dob) {
      children.push({
        firstName: first,
        lastName: last,
        birthDate: dob,
        gender: sex,
        healthInsurance: childKk || null,
      });
    }
  }

  // Jetzt das data-Objekt korrekt erzeugen
  const data = {
    firstName: formData.get("Vorname"),
    lastName: formData.get("Nachname"),
    birthDate: formData.get("Geburtsdatum"),
    gender: formData.get("Geschlecht"),
    maritalStatus: formData.get("Familienstand"),
    email: formData.get("E-Mail"),
    phone: formData.get("Telefon"),
    healthInsurance: formData.get("Krankenkasse"),
    healthInsuranceApproval: formData.get("bewilligung"),
    streetAddress: formData.get("Anschrift"),
    postalCode: formData.get("plz"),
    city: formData.get("Ort"),
    height: formData.get("Körpergröße"),
    weight: formData.get("Gewicht"),
    psychosocialStress: formData.get("Psychosoziale Belastungen"),
    psychosocialRisks: formData.get("Besonderheiten und Risiken"),
    alternatives: formData.get("Alternativtermin"),
    captureToken: formData.get("cap-token"),
    date: formData.get("Startdate"),
    location: formData.get("Einrichtung"),
    children: children,
  };

  const response = await fetch(
    "https://formulardaten.muettergenesung-kur.de/kuranmeldung",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (response.ok) {
    window.location.href = "/formular-gesendet";
  } else {
    alert("Es gab ein technisches Problem. Versuchen Sie es später erneut.");
  }
});
