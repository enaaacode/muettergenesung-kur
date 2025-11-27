document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".kurtermin-anfrage-formular");
  if (!form) return;

  let triedSubmit = false;
  let submitAttempts = 0; // neu: zählt Submit-Versuche

  // final validation on submit
  form.addEventListener("submit", (e) => {
    submitAttempts += 1;
    // nach erstem Submit: nur Fehlertexte anzeigen
    triedSubmit = true;
    form.classList.add("was-validated");

    // ab zweitem Submit: rote Umrandung zeigen
    if (submitAttempts >= 2) {
      form.classList.add("show-invalid");
    }

    // force update and show messages
    requiredEls.forEach((el) => updateFieldState(el, { force: true }));

    if (!form.checkValidity()) {
      e.preventDefault();
      const first = form.querySelector(":invalid");
      if (first) {
        first.focus({ preventScroll: false });
        first.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return false;
    }
    // valid -> allow submit (oder deine Fetch-Logik)
  });

  const requiredEls = Array.from(form.querySelectorAll("[required]"));

  // Default messages (kannst du pro field via data-attr überschreiben)
  const defaultMessages = {
    valueMissing: "Dieses Feld ist erforderlich.",
    typeMismatch: "Bitte geben Sie einen gültigen Wert ein.",
    patternMismatch: "Bitte prüfen Sie das eingegebene Format.",
    tooShort: "Bitte geben Sie mehr Zeichen ein.",
    rangeUnderflow: "Der Wert ist zu niedrig.",
    rangeOverflow: "Der Wert ist zu hoch.",
  };

  // Fügt .field-error ein, falls nicht vorhanden
  function ensureErrorEl(field) {
    const container = field.closest(".form-field");
    if (!container) return null;
    let err = container.querySelector(".field-error");
    if (!err) {
      err = document.createElement("div");
      err.className = "field-error";
      container.appendChild(err);
    }
    return err;
  }

  function getMessage(field) {
    const err = field.validity;
    // benutzerdefinierte Nachricht per data-error-XYZ möglich
    if (err.valueMissing && field.dataset.errorValueMissing)
      return field.dataset.errorValueMissing;
    if (err.typeMismatch && field.dataset.errorTypeMismatch)
      return field.dataset.errorTypeMismatch;
    if (err.patternMismatch && field.dataset.errorPatternMismatch)
      return field.dataset.errorPatternMismatch;
    if (err.tooShort && field.dataset.errorTooShort)
      return field.dataset.errorTooShort;
    if (err.rangeUnderflow && field.dataset.errorRangeUnderflow)
      return field.dataset.errorRangeUnderflow;
    if (err.rangeOverflow && field.dataset.errorRangeOverflow)
      return field.dataset.errorRangeOverflow;

    // Fallback auf default messages
    for (const k of Object.keys(defaultMessages)) {
      if (err[k]) return defaultMessages[k];
    }
    return "Ungültiger Wert";
  }

  // only show errors after submit or after field was touched (blur)
  function updateFieldState(field, { force = false } = {}) {
    const container = field.closest(".form-field");
    if (!container) return;
    const errEl = ensureErrorEl(field);

    const touched = field.dataset.touched === "true";
    const shouldShowError = triedSubmit || touched || force;

    if (field.checkValidity()) {
      container.removeAttribute("data-invalid");
      if (errEl) errEl.textContent = "";
    } else if (shouldShowError) {
      container.setAttribute("data-invalid", "true");
      if (errEl) errEl.textContent = getMessage(field);
    } else {
      // don't show error yet
      container.removeAttribute("data-invalid");
      if (errEl) errEl.textContent = "";
    }
  }

  // Attach listeners — mark touched on blur, update on input/change only when touched or after submit
  requiredEls.forEach((el) => {
    el.addEventListener("blur", () => {
      el.dataset.touched = "true";
      updateFieldState(el);
    });

    el.addEventListener(
      "input",
      () => {
        if (el.dataset.touched === "true" || triedSubmit) updateFieldState(el);
      },
      { passive: true }
    );

    el.addEventListener(
      "change",
      () => {
        if (el.dataset.touched === "true" || triedSubmit) updateFieldState(el);
      },
      { passive: true }
    );

    // initial state: do not display errors yet
    updateFieldState(el);
  });
});
