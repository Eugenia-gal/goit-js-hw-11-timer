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

let isActive = false;
let timerId = null;
let timer = null;

class CountdownTimer {
  constructor({ selector, targetDate, onTick }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.onTick = onTick;
    }
    
    init() {
        const time = this.convertUnxToClockTime(this.getDeltaTime());
        this.onTick(time);
    }

  startCountDown() {
      if (this.getDeltaTime() < 0) {
          alert('Выберите дату не раньше текущей');
          return;
      }

      isActive = true;
      timerId = setInterval(() => {
        const deltaTime = this.getDeltaTime();

          let time = this.convertUnxToClockTime(deltaTime);
          this.onTick(time);


     }, 1000);

    }

    stopCountDown() {
        clearInterval(timerId);
        isActive = false;
        this.onTick(this.convertUnxToClockTime(0));
       
    }
    
    convertUnxToClockTime(time) {
    const days = this.padTimeUnits(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.padTimeUnits(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.padTimeUnits(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.padTimeUnits(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
    }
    
    padTimeUnits(timeUnit) {
    return String(timeUnit).padStart(2, 0);
    }
    
    getDeltaTime () {
        const targetDateUnx = this.targetDate.getTime();
        const currentDateUnx = Date.now();
        return targetDateUnx - currentDateUnx;
    }

}

flatpickr("#date-input", {
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

    timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date(refs.targetDateInputEl.value),
    onTick: upateClockFace,
});

    timer.startCountDown();

}

function onResetBtnClick() {
    timer.stopCountDown();
    timer = null;
}

function upateClockFace({ days, hours, mins, secs }) {
    refs.clockfaceDays.textContent = days;
    refs.clockfaceHours.textContent = hours;
    refs.clockfaceMins.textContent = mins;
    refs.clockfaceSecs.textContent = secs;
}




