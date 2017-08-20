import {NgModule} from '@angular/core';
import {PeoplePipe} from './../pipes/people/people.pipe';
import {ContactsPipe} from './../pipes/contacts/contacts.pipe';
import {AppointmentsPipe} from './../pipes/appointments/appointments.pipe';

@NgModule({
  declarations: [PeoplePipe,
    ContactsPipe,
    AppointmentsPipe],
  imports: [],
  exports: [PeoplePipe,
    ContactsPipe,
    AppointmentsPipe]
})
export class PipesModule {
}
