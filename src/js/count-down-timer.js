export default class CountdownTimer {
  constructor({ selector, targetDate, onTick }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.onTick = onTick;
    this.timerId = null;
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

      this.timerId = setInterval(() => {
        const deltaTime = this.getDeltaTime();

          let time = this.convertUnxToClockTime(deltaTime);
          this.onTick(time);


     }, 1000);

    }

    stopCountDown() {
        clearInterval(this.timerId);
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
 





