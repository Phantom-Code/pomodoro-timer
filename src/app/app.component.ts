import {
  animate,
  keyframes,
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
    trigger('x', [
      state('zero', style({ transform: 'translateY(-50%) rotate(0deg)' })),
      state(
        'complete',
        style({
          transform: 'translateY(-50%) rotate(500deg)',
        })
      ),
      transition('* <=> *', [animate('5s')]),
    ]),
  ],
})
export class AppComponent {
  title = 'pomodoro-timer';
  isOpen = true;
  state;
  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
  onDone($event) {
    console.log($event);
    this.state = this.state === 'zero' ? 'complete' : 'zero';
  }
  startTimer() {
    for (let i = 0; i < 100; i + 25) {
      console.log(i);
    }
  }
}
