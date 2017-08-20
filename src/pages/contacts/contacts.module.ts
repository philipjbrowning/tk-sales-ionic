import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactsPage } from './contacts';
import {SharedModule} from '../../shared/shared.module';
import {ContactReadPageModule} from './contact-read/contact-read.module';
import {ContactUpdatePageModule} from './contact-update/contact-update.module';
import {ContactCreatePageModule} from './contact-create/contact-create.module';

@NgModule({
  declarations: [
    ContactsPage,
  ],
  imports: [
    ContactCreatePageModule,
    ContactReadPageModule,
    ContactUpdatePageModule,
    IonicPageModule.forChild(ContactsPage),
    SharedModule
  ],
  entryComponents: [
    ContactsPage
  ]
})
export class ContactsPageModule {}
