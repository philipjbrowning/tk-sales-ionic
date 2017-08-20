import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule} from 'angularfire2';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ContactsPageModule} from '../pages/contacts/contacts.module';
import {OpportunitiesPageModule} from '../pages/opportunities/opportunities.module';
import {AppointmentsPageModule} from '../pages/appointments/appointments.module';
import {LoginPageModule} from '../pages/login/login.module';
import {FIREBASE_CREDENTIALS} from './firebase.credentials';
import {AngularFireDatabaseModule} from 'angularfire2/database';

@NgModule({
  declarations: [
    MyApp,
    ListPage
  ],
  imports: [
    // Initialize AngularFire with credentials
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    // Use database functionality from FireBase
    AngularFireDatabaseModule,
    AppointmentsPageModule,
    ContactsPageModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    OpportunitiesPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
