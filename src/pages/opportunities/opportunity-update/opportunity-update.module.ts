import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpportunityUpdatePage } from './opportunity-update';

@NgModule({
  declarations: [
    OpportunityUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(OpportunityUpdatePage),
  ],
})
export class OpportunityUpdatePageModule {}
