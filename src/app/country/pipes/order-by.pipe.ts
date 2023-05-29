import { Pipe, PipeTransform } from '@angular/core';
import { SmallCountry } from '../interfaces/country.interfaces';



@Pipe({
  name: 'orderByAlphabet'
})
export class OrderByPipe implements PipeTransform {

  transform(arr: SmallCountry[]): SmallCountry[] {
    return arr.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
