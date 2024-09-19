
let score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };

const savedScore = JSON.parse(localStorage.getItem("score"));
if (savedScore) {
  score = savedScore;
}

updateScoreElement();

function makeMove(playerMove) {
  const computerMove = pickComputerMove();
  const resultElement = document.querySelector(".js-result");

  if (playerMove === computerMove) {
    resultElement.innerHTML = `Tie.`;
    score.ties += 1;
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    resultElement.innerHTML = `You win.`;
    score.wins += 1;
  } else {
    resultElement.innerHTML = `You lose.`;
    score.losses += 1;
  }

  const movesElement = document.querySelector(".js-moves-chosen");
  movesElement.innerHTML = `
    You ${playerMove} - ${computerMove} Computer
  `;

  updateScoreElement();
  localStorage.setItem("score", JSON.stringify(score));
}

function resetScore(){
  const resetMessage = `
                          <h4>Are you sure you want to reset score?</h4>
                          <button class="reset-score-button" onclick="resetConfirmed();">Yes</button>
                          <button class="auto-play-button" onclick="document.querySelector('.reset').style.animation = 'slideUpOut 1s ease-in-out forwards'">No</button>
                        `
  const resetAlert = document.createElement("div")
  resetAlert.className="reset"
  resetAlert.innerHTML=resetMessage;
  const body = document.getElementsByTagName("body")[0];
  body.appendChild(resetAlert);
}

function resetRejected(){
  const resetAlert = document.querySelector(".reset")
  resetAlert.style.animation = "slideUpOut 1s ease-in-out forwards"
}

function resetConfirmed() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
  

  const resetAlert = document.querySelector(".reset")
  resetAlert.style.animation = "slideUpOut 1s ease-in-out forwards"
  updateScoreElement();
  localStorage.removeItem("score");
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove;

  if (randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }

  return computerMove;
}

function updateScoreElement() {
  document.querySelector(".js-score").innerHTML = `
    Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
  `;
}

let isAutoPlaying = false
let intervalId;
const autoPlayButton = document.querySelector(".auto-play-button")
function autoPlay(){
  if (!isAutoPlaying){
      intervalId = setInterval(function(){
      const playerMove = pickComputerMove();
      makeMove(playerMove);
    }, 1000);
    isAutoPlaying=true
    autoPlayButton.innerHTML="Stop Playing"
  } else{
    clearInterval(intervalId);
    isAutoPlaying=false
    autoPlayButton.innerHTML="Auto Play"
  }
  
}

document.body.addEventListener("keydown", (event) => {
  if(event.key=="r"){
    makeMove("rock");
  }else if(event.key=="p"){
    makeMove("paper");
  }else if(event.key=="s"){
    makeMove("scissors");
  }else if(event.key=="a"){
    autoPlay();
  }else if(event.key=="Backspace"){
    resetScore();
  }
});