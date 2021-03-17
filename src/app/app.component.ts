import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('rotate', [
      state('zero', style({ transform: 'rotate(0deg)' })),
      state(
        'complete',
        style({
          transform: 'rotate(460deg)',
        })
      ),
      transition('zero <=> complete', [animate('10s')]),
    ]),
    trigger('moveUp', [
      state('initial', style({ bottom: '0%' })),
      state('final', style({ bottom: '100%' })),
      transition('initial <=> final', [animate('{{time}}s')], {
        params: { time: 2 },
      }),
    ]),
  ],
})
export class AppComponent {
  title = 'pomodoro-timer';
  state;
  moveup = 'initial';
  percentage = 0;

  isTimerStopped: boolean = true;
  // time in senconds
  time = 0;
  seconds = 0;
  minutes = 1;
  onDone() {
    this.state = this.state === 'zero' ? 'complete' : 'zero';
  }
  animateFillCircle() {
    this.moveup = this.moveup === 'initial' ? 'final' : 'initial';
    this.percentage = 100;
  }

  startTimer() {
    if (this.isTimerStopped == true) {
      this.isTimerStopped = false;
      this.newTimer();
    }
  }
  stopTimer() {
    if (this.isTimerStopped == false) {
      this.isTimerStopped = true;
    }
  }
  resetTimer() {
    this.stopTimer();
    this.minutes = 1;
    this.seconds = 0;
  }
  newTimer() {
    if (this.isTimerStopped === false) {
      const timeinterval = setInterval(() => {
        if (this.minutes <= -1 || this.isTimerStopped === true) {
          clearInterval(timeinterval);
        }
        if (this.seconds == 0) {
          this.seconds = 60;
          this.minutes = this.minutes - 1;
        }
        this.seconds = this.seconds - 1;
        console.log(this.seconds);
      }, 1000);
    }
  }
}
