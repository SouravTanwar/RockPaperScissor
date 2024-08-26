const elements = {
  computerScore: document.querySelector(".scoreComp"),
  playerScore: document.querySelector(".scorePlayer"),
  keys: document.querySelectorAll(".item"),
  playingZone: document.querySelector(".playing-zone"),
  resultZone: document.querySelector(".result-zone"),
  winText: document.querySelector("#win-text"),
  lostText: document.querySelector("#lost-text"),
  tieText: document.querySelector("#tie-text"),
  subText: document.querySelector(".sub-text"),
  playAgainBtn: document.querySelector(".playBtn"),
  replayBtn: document.querySelector(".replayBtn"),
  userRock: document.querySelector("#user-rock"),
  pcRock: document.querySelector("#pc-rock"),
  userPaper: document.querySelector("#user-paper"),
  pcPaper: document.querySelector("#pc-paper"),
  userScissor: document.querySelector("#user-scissor"),
  pcScissor: document.querySelector("#pc-scissor"),
  userIcon: document.querySelector(".user-side-icon"),
  pcIcon: document.querySelector(".pc-side-icon"),
  nextBtn: document.querySelector(".nextBtn"),
  rulesBtn: document.querySelector(".rulesBtn"),
  mainScreen: document.querySelector(".game-container"),
  winnerScreen: document.querySelector(".winner-screen"),
  winnerPlayAgainBtn: document.querySelector(".winnerPlayBtn"),
  rulesDisplay: document.querySelector(".rules"),
  crossBtn: document.querySelector(".cross"),
};


const keysArray = Array.from(elements.keys);

function updateScoreDisplay() {
  const scores = JSON.parse(localStorage.getItem("scores")) || { user: 0, computer: 0 };
  elements.computerScore.innerText = scores.computer;
  elements.playerScore.innerText = scores.user;
}
updateScoreDisplay();

const valueOfChoice = {
  rock: 1,
  paper: 2,
  scissor: 3,
};

const getRandomChoice = () => Math.floor(Math.random() * 3) + 1;


const determineResult = (userChoice, compChoice) => {
  if (userChoice === compChoice) return "tie";
  if (
    (userChoice === 1 && compChoice === 3) ||
    (userChoice === 2 && compChoice === 1) ||
    (userChoice === 3 && compChoice === 2)
  ) return "user";
  return "comp";
};


function updateScores(result) {
  const scores = JSON.parse(localStorage.getItem("scores")) || { user: 0, computer: 0 };
  if (result === "user") scores.user += 1;
  if (result === "comp") scores.computer += 1;
  localStorage.setItem("scores", JSON.stringify(scores));
  updateScoreDisplay();
}


function updateIcons(userChoice, compChoice) {
  elements.userRock.style.display = userChoice === 1 ? "flex" : "none";
  elements.userPaper.style.display = userChoice === 2 ? "flex" : "none";
  elements.userScissor.style.display = userChoice === 3 ? "flex" : "none";
  
  elements.pcRock.style.display = compChoice === 1 ? "flex" : "none";
  elements.pcPaper.style.display = compChoice === 2 ? "flex" : "none";
  elements.pcScissor.style.display = compChoice === 3 ? "flex" : "none";
}


function updateResultZone(result, userChoice, compChoice) {
  elements.playingZone.style.display = "none";
  elements.resultZone.style.display = "flex";

  const resultStates = {
    tie: {
      show: { tieText: true, replayBtn: true },
      hide: { winText: true, lostText: true, subText: true, playAgainBtn: true, nextBtn: true },
      iconState: { userIcon: false, pcIcon: false }
    },
    user: {
      show: { winText: true, subText: true, playAgainBtn: true, nextBtn: true },
      hide: { tieText: true, lostText: true, replayBtn: true },
      iconState: { userIcon: true, pcIcon: false }
    },
    comp: {
      show: { lostText: true, subText: true, playAgainBtn: true },
      hide: { tieText: true, winText: true, replayBtn: true, nextBtn: true },
      iconState: { userIcon: false, pcIcon: true }
    }
  };

  const { show, hide, iconState } = resultStates[result];
  
  Object.keys(show).forEach(key => {
    elements[key].style.display = "block";
    if (key === "nextBtn") elements[key].style.display = "inline";
  });
  
  Object.keys(hide).forEach(key => elements[key].style.display = "none");

  updateIcons(userChoice, compChoice);
  elements.userIcon.classList.toggle("green-background", iconState.userIcon);
  elements.pcIcon.classList.toggle("green-background", iconState.pcIcon);
}

function handleKeyClick(event) {
  const keyClicked = event.target.closest(".item")?.id;
  if (keyClicked) {
    const userChoice = valueOfChoice[keyClicked];
    const compChoice = getRandomChoice();
    const result = determineResult(userChoice, compChoice);
    updateScores(result);
    updateResultZone(result, userChoice, compChoice);
  }
}


function playAgainHandler() {
  elements.playingZone.style.display = "flex";
  elements.resultZone.style.display = "none";
  elements.mainScreen.style.display = "block";
  elements.winnerScreen.style.display = "none";
  elements.nextBtn.style.display = "none"; 
}

function nextPageHandler() {
  elements.mainScreen.style.display = "none";
  elements.winnerScreen.style.display = "flex";
  elements.nextBtn.style.display = "none"; 
}


function showRulesHandler() {
  elements.crossBtn.style.display = "flex";
  elements.rulesDisplay.style.display = "flex";
}


function removeRulesHandler() {
  elements.crossBtn.style.display = "none";
  elements.rulesDisplay.style.display = "none";
}


function setupEventListeners() {
  keysArray.forEach(key => key.addEventListener("click", handleKeyClick));
  elements.replayBtn.addEventListener("click", playAgainHandler);
  elements.playAgainBtn.addEventListener("click", playAgainHandler);
  elements.nextBtn.addEventListener("click", nextPageHandler);
  elements.winnerPlayAgainBtn.addEventListener("click", playAgainHandler);
  elements.rulesBtn.addEventListener("click", showRulesHandler);
  elements.crossBtn.addEventListener("click", removeRulesHandler);
}


setupEventListeners();
