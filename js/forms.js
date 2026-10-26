function handleContactSubmit(e) {
  e.preventDefault();
  const alertBox = document.getElementById("formSuccessAlert");
  alertBox.classList.remove("hidden");
  document.getElementById("contactForm").reset();
  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 6000);
}
