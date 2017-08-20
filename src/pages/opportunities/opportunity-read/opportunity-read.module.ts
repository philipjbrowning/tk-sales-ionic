import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpportunityReadPage } from './opportunity-read';

@NgModule({
  declarations: [
    OpportunityReadPage,
  ],
  imports: [
    IonicPageModule.forChild(OpportunityReadPage),
  ],
})
export class OpportunityReadPageModule {}
