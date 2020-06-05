import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeToPosition'
})
export class ScheduleLessonPositionPipe implements PipeTransform {

  transform(value: string): number {

    // calc position of lesson in schedule time grid
    function calc(x: number, fractionOffset: number) {
      let y;
      let ret;

      // Linear function calculating position column start for lesson in schedule
      y = ( (6 * x) - 47 ) + fractionOffset

      return y
  }

// split time 12:30:00
  let split = value.toString().split(':');

  let result: number = +split[0]
  let fraction: number = +split[1] / 10

  return calc(result, fraction)

  }

}
