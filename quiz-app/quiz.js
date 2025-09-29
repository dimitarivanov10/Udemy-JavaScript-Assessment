$(document).ready(function () {
  console.log("Script Loaded");
});

const quizWrapperDivEl = document.getElementById("quiz-wrapper");
const quizFormEl = document.getElementsByClassName("quiz")[0];
const scoreCountSpan = document.getElementById("score-count");

function createSubmitButton() {
  const submitSection = document.createElement("section");
  submitSection.id = "submit-section";

  const submitInput = document.createElement("input");
  submitInput.id = "btn-submit";
  submitInput.type = "submit";
  submitInput.value = "Submit";

  submitSection.appendChild(submitInput);

  quizFormEl.appendChild(submitSection);
}

function createAnswerOption(answer, quizNum, optionNum) {
  const quizOptionWrapperDiv = document.createElement("div");
  quizOptionWrapperDiv.classList.add("option-wrapper");

  const quizLabel = document.createElement("label");
  quizOptionWrapperDiv.appendChild(quizLabel);

  const quizInput = document.createElement("input");
  quizInput.type = "radio";
  quizInput.name = `q${quizNum}`;
  quizInput.value = optionNum;
  quizInput.required = true;

  const quizP = document.createElement("p");
  quizP.textContent = answer;

  quizLabel.appendChild(quizInput);
  quizLabel.appendChild(quizP);

  return quizOptionWrapperDiv;
}

function createNewQuizItem(item, quizNum) {
  const quizItemSection = document.createElement("section");
  quizItemSection.classList.add("quiz-item");
  quizFormEl.appendChild(quizItemSection);

  const quizQuestionH3 = document.createElement("h3");
  quizQuestionH3.textContent = item.question;

  quizItemSection.appendChild(quizQuestionH3);

  let optionNum = 1;
  item.options.forEach((el) => {
    const createAnswerOptionDiv = createAnswerOption(el, quizNum, optionNum);
    quizItemSection.appendChild(createAnswerOptionDiv);
    optionNum++;
  });
}

async function populateQuizData() {
  try {
    const response = await fetch(
      "https://5d76bf96515d1a0014085cf9.mockapi.io/quiz"
    );
    const data = await response.json();
    let quizNum = 1;

    data.forEach((el) => {
      console.log(el);
      createNewQuizItem(el, quizNum);
      quizNum++;
    });

    createSubmitButton();
  } catch (error) {
    console.error(error);
  }
}

quizFormEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(quizFormEl);
  const userAnswers = {};
  for (const [name, value] of formData.entries()) {
    userAnswers[name] = Number(value);
  }
  const response = await fetch(
    "https://5d76bf96515d1a0014085cf9.mockapi.io/quiz"
  );
  const quizData = await response.json();

  let score = 0;

  quizData.forEach((question, index) => {
    const questionName = `q${index + 1}`;
    const userAnswer = userAnswers[questionName];

    if (userAnswer === question.answer) {
      score++;
    }
  });

  scoreCountSpan.textContent = score;
});

populateQuizData();
