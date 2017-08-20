import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpportunitiesPage } from './opportunities';
import {SharedModule} from '../../shared/shared.module';
import {OpportunityCreatePageModule} from './opportunity-create/opportunity-create.module';
import {OpportunityReadPageModule} from './opportunity-read/opportunity-read.module';
import {OpportunityUpdatePageModule} from './opportunity-update/opportunity-update.module';

@NgModule({
  declarations: [
    OpportunitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(OpportunitiesPage),
    OpportunityCreatePageModule,
    OpportunityReadPageModule,
    OpportunityUpdatePageModule,
    SharedModule
  ],
  entryComponents: [
    OpportunitiesPage
  ]
})
export class OpportunitiesPageModule {}
