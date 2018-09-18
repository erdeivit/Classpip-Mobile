import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBySurnamePipe'
})
export class OrderBySurnamePipe implements PipeTransform {

  transform(array: Array<string>, args: string): Array<string> {

    if (!array || array === undefined || array.length === 0) return null;

    /* tslint:disable */
    array.sort((a: any, b: any) => {
      /* tslint:enable */
      if (a.surname < b.surname) {
        return -1;
      } else if (a.surname > b.surname) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
