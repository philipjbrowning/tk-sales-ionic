import { Component, ViewChild } from '@angular/core';
import {AlertController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {OpportunitiesPage} from '../pages/opportunities/opportunities';
import {ContactsPage} from '../pages/contacts/contacts';
import {AppointmentsPage} from '../pages/appointments/appointments';
import {LoginPage} from '../pages/login/login';
import {AuthProvider} from '../shared/providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  isAuthenticated: boolean;
  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(private alertCtrl: AlertController,
              private authProvider: AuthProvider,
              public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen) {
    this.initializeApp();
    this.startAuthListener();
    this.isAuthenticated = this.authProvider.isLoggedIn();
    this.pages = [
      { title: 'Opportunities', component: OpportunitiesPage },
      { title: 'Contacts', component: ContactsPage },
      { title: 'Appointments', component: AppointmentsPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setRootPage();
    });
  }
  
  onLogoutClick(): void {
    this.nav.setRoot(LoginPage).catch(console.error);
    this.authProvider.logout().catch(() => {
      const alert = this.alertCtrl.create({
        title: 'Logout Failed',
        subTitle: 'There was an error logging out of the application. Please contact support.',
        buttons: ['Ok']
      });
      alert.present().catch(console.error);
    });
  }

  openPage(page) {
    console.warn('openPage', page);
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component).catch(console.error);
  }
  
  setRootPage(): void {
    console.warn('setRootPage');
    if (this.isAuthenticated)
      this.nav.setRoot(OpportunitiesPage).catch(console.error);
    else
      this.nav.setRoot(LoginPage).catch(console.error);
  }
  
  startAuthListener(): void {
    this.authProvider.stateChanged.subscribe(
      (isAuthenticated: boolean) => {
        console.warn('isAuthenticated:', isAuthenticated);
        this.isAuthenticated = isAuthenticated;
        this.setRootPage();
      }
    );
  }
}
