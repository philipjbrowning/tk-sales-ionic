import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentReadPage } from './appointment-read';

@NgModule({
  declarations: [
    AppointmentReadPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentReadPage),
  ],
})
export class AppointmentReadPageModule {}
