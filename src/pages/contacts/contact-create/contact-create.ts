import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Contact} from '../../../domain/contact';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FIREBASE_ENDPOINTS} from '../../../app/firebase.credentials';
import {AuthProvider} from '../../../shared/providers/auth/auth';

/**
 * Generated class for the ContactCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-create',
  templateUrl: 'contact-create.html',
})
export class ContactCreatePage {
  form: FormGroup;
  contactRef$: FirebaseListObservable<Contact[]>;

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
          this.contactRef$ = this.database.list(FIREBASE_ENDPOINTS.CONTACTS);
          
          this.form = new FormGroup({
            'archived': new FormControl(false),
            'city': new FormControl(''),
            'email': new FormControl('', Validators.email),
            'firstName': new FormControl('', Validators.required),
            'gender': new FormControl('F'),
            'lastName': new FormControl('', Validators.required),
            'notes': new FormControl(null),
            'partner': new FormControl(''),
            'phone': new FormControl(''),
            'postalCode': new FormControl(''),
            'rating': new FormControl(0),
            'session': new FormControl(''),
            'state': new FormControl(''),
            'user': new FormControl(''),
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
      this.contactRef$.push(this.form.value).then(
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
