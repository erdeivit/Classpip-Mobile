import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByNamePipe'
})
export class OrderByNamePipe implements PipeTransform {

  transform(array: Array<string>, args: string): Array<string> {

    if (!array || array === undefined || array.length === 0) return null;

    /* tslint:disable */
    array.sort((a: any, b: any) => {
      /* tslint:enable */
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
