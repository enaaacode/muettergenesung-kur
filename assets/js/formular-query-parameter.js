const urlParams = new URLSearchParams(window.location.search);

const myOrt = urlParams.get("ort");
const myDatum = urlParams.get("datum");
const myHinweis = urlParams.get("hinweis");
const startDate = urlParams.get("startdate");

const ortAnzeige = document.getElementById("ort-query");
if (ortAnzeige) {
  if (myOrt == "BadWurzach") {
    ortAnzeige.textContent = "Bad Wurzach";
  } else {
    ortAnzeige.textContent = myOrt;
  }
}

const datumAnzeige = document.getElementById("datum-query");
datumAnzeige.textContent = myDatum;

const hinweisAnzeige = document.getElementById("hinweis-query");
hinweisAnzeige.textContent = myHinweis;

const hinweisContainer = document.getElementById("hinweis-form-container");
if (myHinweis == "") {
  hinweisContainer.style.display = "none";
}

const hinweisAnzeigeZwei = document.getElementById("hinweis-query-zwei");
hinweisAnzeigeZwei.textContent = myHinweis;

// Query Parameter für hidden input

const einrichtungAnzeige = document.getElementById("einrichtung-query");
einrichtungAnzeige.value = myOrt;

const zeitraumAnzeige = document.getElementById("zeitraum-query");
zeitraumAnzeige.value = myDatum;

const formStartdate = document.getElementById("startdate-query");
formStartdate.value = startDate;
