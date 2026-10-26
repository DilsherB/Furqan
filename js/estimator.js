// Dynamic Trade Estimator Calculation
function calculateEstimate() {
  const categorySelect = document.getElementById("estCategory");
  const selectedOption = categorySelect.options[categorySelect.selectedIndex];
  const rate = parseFloat(selectedOption.getAttribute("data-rate")) || 100;
  const unitName = selectedOption.getAttribute("data-unit") || "Units";

  document.getElementById("unitLabel").innerText = unitName;

  const qty = parseFloat(document.getElementById("estQty").value) || 1;
  const freightType = document.getElementById("estFreight").value;

  let freightMultiplier = 1.0;
  if (freightType === "ocean_lcl") freightMultiplier = 1.15;
  if (freightType === "air_cargo") freightMultiplier = 1.45;

  const totalEst = (qty * rate * freightMultiplier).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  document.getElementById("calcPriceDisplay").innerText = totalEst + " EST";
  document.getElementById("calcMetaDisplay").innerText =
    `Estimated quote for ${qty} ${unitName} including default freight handling.`;
}

function handleEstimatorSubmit(e) {
  e.preventDefault();
  const categorySelect = document.getElementById("estCategory");
  const selectedText =
    categorySelect.options[categorySelect.selectedIndex].text;
  const qty = document.getElementById("estQty").value;

  document.getElementById("contactProduct").value =
    `${selectedText} (Qty: ${qty})`;
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}
