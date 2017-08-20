import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import { AlertController } from 'ionic-angular';
import {AuthProvider} from '../../shared/providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private alertCtrl: AlertController,
              private auth: AuthProvider,
              private loadingCtrl: LoadingController,
              public navCtrl: NavController) {
  }
  
  onLoginSubmit(form: NgForm): void {
    const loading = this.loadingCtrl.create({
      content: 'Logging in...'
    });
    loading.present().catch(console.error);
    this.auth.login(form.value.username, form.value.password).then(
      (user: any) => {
        loading.dismiss().catch(console.error);
        console.log(user);
      }).catch(
        (err: any) => {
          loading.dismiss().catch(console.error);
          const alert = this.alertCtrl.create({
            title: 'Login Failed',
            subTitle: err.message,
            buttons: ['Ok']
          });
          alert.present().catch(console.error);
      }
    );
  }

}
