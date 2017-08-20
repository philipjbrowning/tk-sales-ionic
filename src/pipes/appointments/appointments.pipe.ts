import {Pipe, PipeTransform} from '@angular/core';
import {displayCount} from '../util/display-count';

/**
 * Generated class for the AppointmentsPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'appointments'
})
export class AppointmentsPipe implements PipeTransform {
  display: any;
  
  constructor() {
    this.display = displayCount('appointment', 'appointments');
  }
  
  /**
   * Displays # appointment or # appointments depending on the number
   */
  transform(value: string) {
    return this.display(value);
  }
}
