import CountdownTimer from "./count-down-timer";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_green.css";

const refs = {
    clockfaceDays: document.querySelector('span[data-value="days"]'),
    clockfaceHours: document.querySelector('span[data-value="hours"]'),
    clockfaceMins: document.querySelector('span[data-value="mins"]'),
    clockfaceSecs: document.querySelector('span[data-value="secs"]'),

    startBtnEl: document.querySelector('button[data-action="start"]'),
    resetBtnEl: document.querySelector('button[data-action="reset"]'),
    targetDateInputEl: document.querySelector('#date-input'),
}

let timer = null;
let isActive = false;

let calendar = flatpickr("#date-input", {
    altInput: true,
    enableTime: true,
    dateFormat: "Y-m-d H:i",
});


refs.startBtnEl.addEventListener('click', onStartBtnClick);
refs.resetBtnEl.addEventListener('click', onResetBtnClick);

function onStartBtnClick() {
    if (isActive) {
        return;
    }
    
    if (refs.targetDateInputEl.value === "") {
        alert("Выберите дату и время окончания акции!");
        return;
    }

    isActive = true;

    timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date(refs.targetDateInputEl.value),
    onTick: upateClockFace,
    });

    timer.startCountDown();

}


function onResetBtnClick() {
    timer.stopCountDown();
    isActive = false;
    calendar.clear();
}

function upateClockFace({ days, hours, mins, secs }) {
    refs.clockfaceDays.textContent = days;
    refs.clockfaceHours.textContent = hours;
    refs.clockfaceMins.textContent = mins;
    refs.clockfaceSecs.textContent = secs;
}