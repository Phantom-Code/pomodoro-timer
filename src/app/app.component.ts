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
  endtime = new Date();
  // time in senconds
  time = 5;
  onDone() {
    this.state = this.state === 'zero' ? 'complete' : 'zero';
  }
  test() {
    this.moveup = this.moveup === 'initial' ? 'final' : 'initial';
    this.percentage = 100;
  }
  addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }
  getTimeRemaining(endtime) {
    const total =
      Date.parse(endtime.toString()) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((seconds / 60) % 60);
    const hours = Math.floor((minutes / 60) % 60);
    const days = Math.floor((hours / 24) % 24);

    return { total, seconds, minutes, hours, days };
  }
}
