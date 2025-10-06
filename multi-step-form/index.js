const inputFirstName = document.getElementById("first_name");
const errorText = document.getElementById("first_name_error");

inputFirstName.addEventListener("blur", () => {
  const regex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  const value = inputFirstName.value.trim();

  if (regex.test(value)) {
    errorText.style.display = "none";
  } else {
    errorText.style.display = "block";
  }
});
