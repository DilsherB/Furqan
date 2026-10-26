document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("catalogueContainer")) {
    renderCatalogue();
  }

  if (document.getElementById("estCategory")) {
    calculateEstimate();
  }
});
