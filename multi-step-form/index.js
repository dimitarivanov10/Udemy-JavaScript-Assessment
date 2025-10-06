const fieldRules = {
  first_name: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
  last_name: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  contact: /^[0-9]{7,15}$/,
  city: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
  country: /^[A-Za-z]+(?: [A-Za-z]+)*$/
};

const requiredFields = {
  0: ["first_name", "email"],
  1: ["contact", "country"]
};

function validateField(fieldId) {
  const inputEl = document.getElementById(fieldId);
  const errorMessage = document.getElementById(`${fieldId}_error`);
  const regex = fieldRules[fieldId];
  const value = inputEl.value.trim();

  if (value === "" && requiredFields[currentStep]?.includes(fieldId)) {
    errorMessage.style.display = "block";
    return false;
  }

  if (value !== "" && !regex.test(value)) {
    errorMessage.style.display = "block";
    return false;
  }

  errorMessage.style.display = "none";
  return true;
}

function validateStep(stepIndex) {
  const fields = requiredFields[stepIndex] || [];
  return fields.every(fieldId => validateField(fieldId));
}

Object.keys(fieldRules).forEach(fieldId => {
  const inputEl = document.getElementById(fieldId);
  if (!inputEl) return;

  inputEl.addEventListener("blur", () => validateField(fieldId));
  inputEl.addEventListener("input", () => validateField(fieldId));
});

const steps = [
  document.getElementById("StepOneContainer"),
  document.getElementById("StepTwoContainer"),
  document.getElementById("StepThreeContainer")
];

const successContainer = document.getElementById("SuccessContainer");
steps.forEach(step => step.style.display = "none");
successContainer.style.display = "none";

let currentStep = 0;
steps[currentStep].style.display = "block";

function showStep(index) {
  steps.forEach(step => step.style.display = "none");
  steps[index].style.display = "block";
  currentStep = index;
}

document.getElementById("StepOneNext").addEventListener("click", (e) => {
  e.preventDefault();
  if (validateStep(currentStep)) showStep(1);
});

document.getElementById("StepTwoPrevious").addEventListener("click", (e) => {
  e.preventDefault();
  showStep(0);
});

document.getElementById("StepTwoNext").addEventListener("click", (e) => {
  e.preventDefault();
  if (validateStep(currentStep)) showStep(2);
});

document.getElementById("StepThreePrevious").addEventListener("click", (e) => {
  e.preventDefault();
  showStep(1);
});

document.getElementById("StepThreeSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  if (validateStep(currentStep)) {
    steps.forEach(step => step.style.display = "none");
    successContainer.style.display = "block";
  }
});
