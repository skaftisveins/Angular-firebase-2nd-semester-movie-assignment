import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genreFilter'
})
export class GenrePipe implements PipeTransform {

  transform(value: any[], filter?: number): any[] {
    filter = +filter;
    if (!value || !filter) {
      return value;
    }
    return value.filter(x => x.genre_ids.includes(filter));
  }
}


