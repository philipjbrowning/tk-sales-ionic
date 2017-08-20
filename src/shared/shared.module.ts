import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {AuthProvider} from './providers/auth/auth';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {IonicStorageModule} from '@ionic/storage';
import {PipesModule} from '../pipes/pipes.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    PipesModule
  ],
  providers: [
    AuthProvider
  ],
  exports: [
    BrowserModule,
    PipesModule
  ]
})
export class SharedModule {}
