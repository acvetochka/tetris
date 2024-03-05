import { isPaused } from "./start.js";
import { timeToLocalStorage } from "./writeToLocalStorage.js";

let intervalId = null;
let time = 0;
let totalTime = JSON.parse(localStorage.getItem("time")) || 0;
const timeEl = document.querySelector('.time');
const totalTimeEl = document.querySelector('.total-time');

function getTime() {
    time = 0;
    intervalId = setInterval(() => {
        if (!isPaused) {
            time += 1000;
            timeEl.textContent = convertAndUpdate(time); 
            convertTotalTime();

        }
    }, 1000);
};

function clearTime() {
    clearInterval(intervalId);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertAndUpdate(time){
    const convertTime = convertMs(time);
    return updateClockFace(convertTime);
}

function updateClockFace({ hours, minutes, seconds }) {
    return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
}

function convertTotalTime() {
    totalTime+=1000;
    totalTimeEl.textContent = convertAndUpdate(totalTime)
    timeToLocalStorage();
}



export { getTime, clearTime, totalTime, convertAndUpdate }