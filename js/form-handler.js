// assets/js/form-handler.js
document
  .getElementById("kontakt-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());

    const response = await fetch("/.netlify/functions/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = document.getElementById("feedback");

    if (response.ok) {
      result.textContent = "✔️ Formular erfolgreich gesendet!";
      form.reset();
    } else {
      const errorText = await response.text();
      result.textContent = "❌ Fehler: " + errorText;
    }
  });
