import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Appointment} from '../../../domain/appointment';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthProvider} from '../../../shared/providers/auth/auth';
import {FIREBASE_ENDPOINTS} from '../../../app/firebase.credentials';

/**
 * Generated class for the AppointmentCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appointment-create',
  templateUrl: 'appointment-create.html',
})
export class AppointmentCreatePage {
  form: FormGroup;
  appointmentRef$: FirebaseListObservable<Appointment[]>;

  constructor(private alertCtrl: AlertController,
              private auth: AuthProvider,
              private database: AngularFireDatabase,
              public navCtrl: NavController) {
  }
  
  // --------------------------------------------------------------------------
  // Ionic Life Cycle Hooks
  // --------------------------------------------------------------------------
  
  /**
   * 1. Check for login access
   * 2. Create form
   * @returns {Promise<boolean>}
   */
  ionViewCanEnter(): Promise<boolean> {
    return new Promise(
      (resolve, reject) => {
        if (this.auth.isLoggedIn()) {
          this.appointmentRef$ = this.database.list(FIREBASE_ENDPOINTS.APPOINTMENTS);
          
          this.form = new FormGroup({
            'archived': new FormControl(false),
            'comments': new FormControl(''),
            'contact': new FormControl('', Validators.required),
            'date': new FormControl(null, Validators.required),
            'location': new FormControl('', Validators.required),
            'result': new FormControl(0),
            'session': new FormControl(''),
            'time': new FormControl(''),
            'user': new FormControl('')
          });
          resolve();
        } else {
          reject();
        }
      }
    );
  }
  
  onSubmit(event: Event): void {
    event.preventDefault();
    
    if (this.form.valid) {
      // Set default values
      this.appointmentRef$.push(this.form.value).then(
        () => {
          this.form.reset();
          this.navCtrl.pop().catch(console.error);
        }
      ).catch(
        (err: Error) => {
          const alert = this.alertCtrl.create({
            title: 'Save Error',
            subTitle: err.message,
            buttons: ['Ok']
          });
          alert.present().catch(console.error);
        }
      );
    } else {
      const alert = this.alertCtrl.create({
        title: 'Invalid Form',
        subTitle: 'Please fill the first name, last name and a valid email address',
        buttons: ['Ok']
      });
      alert.present().catch(console.error);
    }
  }

}
