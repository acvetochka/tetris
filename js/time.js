import { isPaused } from "./start.js";

let intervalId = null;
let time = 0;
const timeEl = document.querySelector('.time');

function getTime() {
    time = 0;
    intervalId = setInterval(() => {
        if (!isPaused) {
            time += 1000;
            convertAndUpdate(time);
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
    updateClockFace(convertTime);
}

function updateClockFace({ hours, minutes, seconds }) {
    timeEl.textContent = `${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
}

export { getTime, clearTime, time }