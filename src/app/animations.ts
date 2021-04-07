import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
export const animations = [
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
    transition('initial <=> final', [animate('1s')]),
  ]),
  trigger('flip', [
    transition('start <=> end', [
      style({ transform: 'rotateX(360deg)' }),
      animate('0.5s'),
    ]),
  ]),
  trigger('flipMinute', [
    transition('true <=> false', [
      style({ transform: 'rotateX(360deg)' }),
      animate('0.5s'),
    ]),
  ]),
  ,
];
