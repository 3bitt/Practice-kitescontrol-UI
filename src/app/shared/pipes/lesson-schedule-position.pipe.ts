import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeToPosition'
})
export class ScheduleLessonPositionPipe implements PipeTransform {

  transform(value: string): number {

    // calc position of lesson in schedule time grid
    function calc(x: number) {
      let y;
      let ret;
      y = 15 - x;

      if (x > 15) {
          ret = x + Math.abs(y)
      } else {
          ret = x - y
      }
      return ret;
  }

// split time 12:30:00
  let split = value.toString().split(':');

  let result: number = 0;

// convert half hour (30) into 0.5 making 12:30 to be 12.5
  for (let i of split) {
      let num = +i
      if (num == 30) {
          result += 0.5
          break;
      }
      result += num
  }
    return calc(result);
  }

}
