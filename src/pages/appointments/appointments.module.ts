import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentsPage } from './appointments';
import {SharedModule} from '../../shared/shared.module';
import {AppointmentReadPageModule} from './appointment-read/appointment-read.module';
import {AppointmentUpdatePageModule} from './appointment-update/appointment-update.module';
import {AppointmentCreatePageModule} from './appointment-create/appointment-create.module';

@NgModule({
  declarations: [
    AppointmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentsPage),
    AppointmentCreatePageModule,
    AppointmentReadPageModule,
    AppointmentUpdatePageModule,
    SharedModule
  ],
  entryComponents: [
    AppointmentsPage
  ]
})
export class AppointmentsPageModule {}
