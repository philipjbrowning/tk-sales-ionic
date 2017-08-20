import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentCreatePage } from './appointment-create';

@NgModule({
  declarations: [
    AppointmentCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentCreatePage),
  ],
})
export class AppointmentCreatePageModule {}
