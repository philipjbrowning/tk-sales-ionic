import {Pipe, PipeTransform} from '@angular/core';
import {displayCount} from '../util/display-count'

@Pipe({
  name: 'people'
})
export class PeoplePipe implements PipeTransform {
  display: any;
  
  constructor() {
    this.display = displayCount('person', 'people');
  }
  
  /**
   * Displays # person or  # people depending on the number
   */
  transform(value: number, ...args) {
    return this.display(value);
  }
}
