const hour = document.querySelector("#hour");
const minute = document.querySelector("#minute");
const second = document.querySelector("#second");

const stopElement = document.getElementById("stopElement"); 
const startElement = document.getElementById("startElement"); 

let timer;
let isRunning = false;

function startClock() {
    if (!isRunning) {
        timer = setInterval(updateTime, 1000);
        isRunning = true;
        stopElement.innerHTML = "Stop";
        stopElement.className = "bg-rose-600 mx-1 hover:bg-rose-700 px-7 py-1";
        startElement.disabled = true;
    }
}
function stopClock() {    
    if (isRunning) {
        stopClockMain()
        stopElement.innerHTML = "Resume";
        stopElement.className = "bg-sky-600 mx-1 hover:bg-sky-700 px-7 py-1";
        startElement.disabled = false;
    } else{startClock()}
}

function stopClockMain(){
    clearInterval(timer);
    isRunning = false;
}

function resetClock() {
    stopClockMain();
    stopElement.innerHTML = "Stop";
    stopElement.className = "bg-rose-600 mx-1 hover:bg-rose-700 px-7 py-1";
    hour.innerText = '00';
    minute.innerText = '00';
    second.innerText = '00';
    isRunning = false;
}

function updateTime(){
    let seconds = Number(second.innerText);
    let minutes = Number(minute.innerText);
    let hours = Number(hour.innerText);

    seconds++;
    seconds = addLeadingZeros(String(seconds))

    if (seconds == "60"){
        seconds = "00";
        minutes++;
        minutes = addLeadingZeros(String(minutes))
        second.innerText = seconds
        minute.innerText = minutes
    }else{second.innerText = seconds}

    if (minutes == "60"){
        minutes = "00";
        hours++;
        hours = addLeadingZeros(String(hours))
        minute.innerText = minutes
        hour.innerText = hours
    }
    

}


function addLeadingZeros(string) {
    return string.length < 2? `0${string}` : string;
}

function currentTime() {
    const currentHour = document.querySelector("#currentHour");
    const currentMinute = document.querySelector("#currentMinute");
    const currentSecond = document.querySelector("#currentSecond");

    let currentDate = new Date();

    let currentHours = currentDate.getHours().toString().padStart(2, '0');
    let currentMinutes = currentDate.getMinutes().toString().padStart(2, '0');
    let currentSeconds = currentDate.getSeconds().toString().padStart(2, '0');

    currentHour.textContent = currentHours;
    currentMinute.textContent = currentMinutes;
    currentSecond.textContent = currentSeconds;
}


const currentTimer = setInterval(currentTime, 1000);




const elementHours = document.getElementById('timerHour');
const elementMinutes = document.getElementById('timerMinute');
const elementSeconds = document.getElementById('timerSecond');

const displayHours = document.getElementById('displayHour');
const displayMinutes = document.getElementById('displayMinute');
const displaySeconds = document.getElementById('displaySecond');

let timerHours = 0;
let timerMinutes = 0;
let timerSeconds = 0;
let isTimerRunning = false;
let intervalId;

let inputGroup = document.getElementById('timerInputs');
let timerDisplay = document.getElementById('timerDisplay');
let inner = document.getElementById("timerInnerDisplay");


document.getElementById("setTimerButton").addEventListener("click", function(){
    inputGroup.style.display = "none";
    timerDisplay.style.display = "block";

    timerHours = Number(elementHours.value);
    timerMinutes = Number(elementMinutes.value);
    timerSeconds = Number(elementSeconds.value);

    displayHours.innerHTML = addLeadingZeros(String(timerHours))
    displayMinutes.innerHTML = addLeadingZeros(String(timerMinutes))
    displaySeconds.innerHTML = addLeadingZeros(String(timerSeconds))
    startTimer();
});

let timerIntervalId;
function startTimer() {
    isTimerRunning = true;
    timerIntervalId = setInterval(updateTimerCheck, 1000);
}

function updateTimerCheck() {
    if (timerHours == 0 && timerMinutes == 0 && timerSeconds == 1) {
        clearInterval(timerIntervalId);
        inner.classList.add("animate__animated", "animate__pulse", "animate__infinite"); 
        displaySeconds.innerHTML="00"
        isTimerRunning = false;
        timerHours = 0;
        timerMinutes = 0;
        timerSeconds = 0;
        setTimeout(function() {alert("Time's up!")}, 1000); 

    } else {
        updateTimer();
        updateTimerBorder();
    }
 
}


document.getElementById("cancelButton").addEventListener("click", function() {
    if (isTimerRunning) {
        isTimerRunning = false;
        clearInterval(timerIntervalId);
        inputGroup.style.display = "block";
        timerDisplay.style.display = "none";
    }
});

function pauseTimer() {
    stopTimer();
    timerHours = 0;
    timerMinutes = 0;
    timerSeconds = 0;
    // updateTimerDisplay();
}

function updateTimer() {
    timerSeconds = Number(timerSeconds)
    timerSeconds--;

    if (timerSeconds == 0 && timerMinutes != 0){
        timerSeconds = 59;
        timerMinutes = Number(timerMinutes)
        timerMinutes--;
        displaySeconds.innerHTML = addLeadingZeros(String(timerSeconds))
        displayMinutes.innerHTML = addLeadingZeros(String(timerMinutes))
    }else{displaySeconds.innerHTML = addLeadingZeros(String(timerSeconds))}

    if (timerMinutes == 0 && timerHours != 0){
        timerMinutes = 59;
        timerHours = Number(timerHours)
        timerHours--;
        displayMinutes.innerHTML = addLeadingZeros(String(timerMinutes))
        displayHours.innerHTML = addLeadingZeros(String(timerHours))
    }
}


function updateTimerBorder() {
    const clipPath = `polygon(50% 50%, 0% ${100 - (timerSeconds / 40) * 100}%, 100% ${100 - (timerSeconds / 40) * 100}%, 100% 100%, 0% 100%)`;
    document.getElementById('timerBorderBlue').style.clipPath = clipPath
}

document.getElementById("timerHour").addEventListener("change", function(event){
    let value = event.target.value;
    value = addLeadingZeros(value);
    elementHours.value = value;
});
document.getElementById("timerMinute").addEventListener("change", function(event){
    let value = event.target.value;
    value = addLeadingZeros(value);
    elementMinutes.value = value;
});
document.getElementById("timerSecond").addEventListener("change", function(event){
    let value = event.target.value;
    value = addLeadingZeros(value);
    elementSeconds.value = value;
});