import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentUpdatePage } from './appointment-update';

@NgModule({
  declarations: [
    AppointmentUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentUpdatePage),
  ],
})
export class AppointmentUpdatePageModule {}
