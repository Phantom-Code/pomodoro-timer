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
      state('initial', style({ bottom: '{{percentage}}%' }), {
        params: { percentage: 0 },
      }),
      state('final', style({ bottom: '{{percentage}}%' }), {
        params: { percentage: 0 },
      }),
      transition('initial <=> final', [animate('1s')], {
        params: { time: 2 },
      }),
    ]),
  ],
})
export class AppComponent {
  title = 'pomodoro-timer';
  state = 'initial';
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
    this.percentage = 0;
    this.animateFillCircle();
  }
  newTimer() {
    if (this.isTimerStopped === false) {
      const timeinterval = setInterval(() => {
        if (this.seconds == 0) {
          this.seconds = 60;
          this.minutes = this.minutes - 1;
        }
        this.seconds = this.seconds - 1;

        this.percentage =
          100 - Math.floor(((this.minutes + this.seconds) / (1 * 60)) * 100);
        this.animateFillCircle();
        if (
          (this.minutes <= 0 && this.seconds <= 0) ||
          this.isTimerStopped === true
        ) {
          clearInterval(timeinterval);
        }
        console.log(this.seconds);
      }, 1000);
    }
  }
}
