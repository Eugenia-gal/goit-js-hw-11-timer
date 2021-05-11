
const refs = {
    clockfaceDays: document.querySelector('span[data-value="days"]'),
    clockfaceHours: document.querySelector('span[data-value="hours"]'),
    clockfaceMins: document.querySelector('span[data-value="mins"]'),
    clockfaceSecs: document.querySelector('span[data-value="secs"]'),
}

class CountdownTimer {
  constructor({ selector, targetDate, onTick }) {
    this.selector = selector;
      this.targetDate = targetDate;
      this.onTick = onTick;

      this.init();
    }
    
    init() {
        const time = this.convertUnxToClockTime(this.getDeltaTime());
        this.onTick(time);
    }

  startCountDown() {


      const timerId = setInterval(() => {
        const deltaTime = this.getDeltaTime();
          
        if (time === 0) {
            clearInterval(timerId);
            console.log('Сожалеем, акция закончилась');
            return;
        }

        console.log(deltaTime);
          let time = this.convertUnxToClockTime(deltaTime);
          console.log(time);
          this.onTick(time);


     }, 1000);

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


const timer = new CountdownTimer({
  selector: '#timer-1',
    targetDate: new Date('May 13, 2021'),
    onTick: upateClockFace,
});

timer.startCountDown();

function upateClockFace({ days, hours, mins, secs }) {
    refs.clockfaceDays.textContent = days;
    refs.clockfaceHours.textContent = hours;
    refs.clockfaceMins.textContent = mins;
    refs.clockfaceSecs.textContent = secs;
}






