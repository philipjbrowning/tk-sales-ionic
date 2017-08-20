import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpportunityCreatePage } from './opportunity-create';

@NgModule({
  declarations: [
    OpportunityCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(OpportunityCreatePage),
  ],
})
export class OpportunityCreatePageModule {}
