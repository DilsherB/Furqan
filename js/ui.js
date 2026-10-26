// Show Toast Notification
function showToast(title, message, type = "loading") {
  const toast = document.getElementById("pdfToast");
  const toastTitle = document.getElementById("pdfToastTitle");
  const toastMsg = document.getElementById("pdfToastMessage");
  const spinner = document.getElementById("pdfToastSpinner");
  const icon = document.getElementById("pdfToastIcon");

  toastTitle.innerText = title;
  toastMsg.innerText = message;

  if (type === "loading") {
    spinner.classList.remove("hidden");
    icon.classList.add("hidden");
  } else if (type === "success") {
    spinner.classList.add("hidden");
    icon.classList.remove("hidden");
    icon.innerHTML =
      '<i class="fa-solid fa-circle-check text-emerald-400"></i>';
  } else if (type === "error") {
    spinner.classList.add("hidden");
    icon.classList.remove("hidden");
    icon.innerHTML = '<i class="fa-solid fa-circle-xmark text-red-400"></i>';
  }

  toast.classList.remove("hidden");

  if (type !== "loading") {
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 4000);
  }
}

// Hide Toast Notification
function hideToast() {
  document.getElementById("pdfToast").classList.add("hidden");
}

