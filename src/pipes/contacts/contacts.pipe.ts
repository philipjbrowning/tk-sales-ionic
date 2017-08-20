import {Pipe, PipeTransform} from '@angular/core';
import {displayCount} from '../util/display-count';

/**
 * Generated class for the ContactsPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'contacts'
})
export class ContactsPipe implements PipeTransform {
  display: any;
  
  constructor() {
    this.display = displayCount('contact', 'contacts');
  }
  
  /**
   * Displays # contact or # contacts depending on the number
   */
  transform(value: string) {
    return this.display(value);
  }
}
