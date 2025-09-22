const skinCard = document.getElementById("select-skin-card");
const eyesCard = document.getElementById("select-eyes-card");
const mouthCard = document.getElementById("select-mouth-card");

const chevronNextToEyesI = document.getElementsByClassName(
  "fas fa-chevron-right next-step show-eyes-card"
)[0];

const chevronNextToMouthsI = document.getElementsByClassName(
  "fas fa-chevron-right next-step"
)[0];

const chevronPreviousToSkinsI = document.getElementsByClassName(
  "fas fa-chevron-left previous-step"
)[0];

const chevronPreviousToMouthsI = document.getElementsByClassName(
  "fas fa-chevron-left previous-step show-eyes-card"
)[0];

const currentEmojiImg = document.getElementById("skin");
const currentEyesImg = document.getElementById("eyes");
const currentMouthImg = document.getElementById("mouth");

function cardToShow(showCard) {
  skinCard.style.display = "none";
  eyesCard.style.display = "none";
   mouthCard.style.display = "none"; 
  showCard.style.display = "block";

}

skinCard.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    currentEmojiImg.src = e.target.src;
    cardToShow(eyesCard);
  } else if (e.target.tagName === "I") {
    cardToShow(eyesCard);
  }
});

chevronNextToEyesI.addEventListener("click", () => {
  cardToShow(eyesCard);
});

eyesCard.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    currentEyesImg.src = e.target.src;
    cardToShow(mouthCard);
  } else if (
    e.target.tagName === "I" &&
    e.target.className === "fas fa-chevron-left previous-step"
  ) {
    cardToShow(skinCard);
  } else if (
    e.target.tagName === "I" &&
    e.target.className === "fas fa-chevron-right next-step"
  ) {
    cardToShow(mouthCard);
  }
});

mouthCard.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    currentMouthImg.src = e.target.src;
    cardToShow(mouthCard);
  } else if (
    e.target.tagName === "I" &&
    e.target.className === "fas fa-chevron-left previous-step show-eyes-card"
  ) {
    cardToShow(eyesCard);
  }
});