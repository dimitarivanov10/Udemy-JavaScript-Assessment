let inputEl = null;
let errorMessage = null;

const firstFieldSetter = document.getElementById("StepOneContainer");
const secondFieldSetter = document.getElementById("StepTwoContainer");
const oneToTwoBtn = document.getElementById("StepOneNext");

document.addEventListener("click", (event) => {
  const clickedElement = event.target;
  const elementId = clickedElement.id;

  switch (elementId) {
    case "first_name":
      inputEl = document.getElementById(elementId);
      errorMessage = document.getElementById(`${elementId}_error`);

      inputEl.addEventListener("blur", () => {
        const regex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
        const value = inputEl.value.trim();

        if (regex.test(value)) {
          errorMessage.style.display = "none";
        } else {
          errorMessage.style.display = "block";
        }
      });
      break;
    case "last_name":
      inputEl = document.getElementById(elementId);
      errorMessage = document.getElementById(`${elementId}_error`);

      inputEl.addEventListener("blur", () => {
        const regex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
        const value = inputEl.value.trim();

        if (regex.test(value)) {
          errorMessage.style.display = "none";
        } else {
          errorMessage.style.display = "block";
        }
      });
      break;

    case "email":
      inputEl = document.getElementById(elementId);
      errorMessage = document.getElementById(`${elementId}_error`);

      inputEl.addEventListener("blur", () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const value = inputEl.value.trim();

        if (regex.test(value)) {
          errorMessage.style.display = "none";
        } else {
          errorMessage.style.display = "block";
        }
      });
      break;
  }
});

oneToTwoBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    firstFieldSetter.style.display = "none";
    secondFieldSetter.style.display = "block";
})