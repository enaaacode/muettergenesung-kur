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
