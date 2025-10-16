const urlParams = new URLSearchParams(window.location.search);

const myOrt = urlParams.get("ort");
const myDatum = urlParams.get("datum");
const myHinweis = urlParams.get("hinweis");

const ortAnzeige = document.getElementById("ort-query");
ortAnzeige.textContent = myOrt;

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
