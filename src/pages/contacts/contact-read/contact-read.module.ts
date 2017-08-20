import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactReadPage } from './contact-read';

@NgModule({
  declarations: [
    ContactReadPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactReadPage),
  ],
})
export class ContactReadPageModule {}
