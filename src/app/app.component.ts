import { animations } from './animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: animations,
})
export class AppComponent {
  title = 'pomodoro-timer';
  state = 'zero';
  moveup = 'initial';
  flipState = 'start';
  percentage = 0;
  initialTime = 25;
  isTimerStopped: boolean = true;
  timeinterval;
  seconds = 0;
  minutes = 25;
  animateMinute = false;

  //circle water-fill animation
  onDone() {
    this.state = this.state === 'zero' ? 'complete' : 'zero';
  }
  //circle moveup according to percentage animation
  animateFillCircle() {
    this.moveup = this.moveup === 'initial' ? 'final' : 'initial';
  }
  animateTimerText() {
    this.flipState = this.flipState === 'start' ? 'end' : 'start';
  }

  startTimer() {
    if (this.isTimerStopped == true) {
      this.isTimerStopped = false;
      this.newTimer();
    }
  }
  stopTimer() {
    if (this.isTimerStopped == false) {
      clearInterval(this.timeinterval);
      this.isTimerStopped = true;
    }
  }
  resetTimer() {
    this.stopTimer();
    this.minutes = this.initialTime;
    this.seconds = 0;
    this.percentage = 0;
    this.animateFillCircle();
  }
  playNotification() {
    let audio = new Audio('./assets/pristine.mp3');
    audio.play();
  }
  newTimer() {
    if (this.isTimerStopped === false) {
      this.timeinterval = setInterval(() => {
        if (this.seconds == 0) {
          this.seconds = 60;
          this.minutes = this.minutes - 1;
          this.animateMinute = !this.animateMinute;
        }
        this.seconds = this.seconds - 1;
        this.animateTimerText();
        this.percentage =
          100 -
          Math.floor(
            ((this.minutes * 60 + this.seconds) / (this.initialTime * 60)) * 100
          );

        this.animateFillCircle();
        if (
          (this.minutes <= 0 && this.seconds <= 0) ||
          this.isTimerStopped === true
        ) {
          clearInterval(this.timeinterval);
          console.log('stopped');
          this.playNotification();
        }
      }, 1000);
    }
  }
  shortBreakHandler() {
    this.resetTimer();
    this.minutes = 5;
    this.initialTime = 5;
    this.startTimer();
  }
  longBreakHandler() {
    this.resetTimer();
    this.minutes = 10;
    this.initialTime = 10;
    this.startTimer();
  }
  pomodoroHandler() {
    this.resetTimer();
    this.minutes = 25;
    this.initialTime = 25;
    this.startTimer();
  }
}
