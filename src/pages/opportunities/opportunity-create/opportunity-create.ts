import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {Opportunity} from '../../../domain/opportunity';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FIREBASE_ENDPOINTS} from '../../../app/firebase.credentials';
import {AuthProvider} from '../../../shared/providers/auth/auth';

/**
 * Generated class for the OpportunityCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opportunity-create',
  templateUrl: 'opportunity-create.html',
})
export class OpportunityCreatePage {
  form: FormGroup;
  opportunityRef$: FirebaseListObservable<Opportunity[]>;

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
          this.opportunityRef$ = this.database.list(FIREBASE_ENDPOINTS.OPPORTUNITIES);
          
          this.form = new FormGroup({
            'appointments': new FormControl(0),
            'city': new FormControl(''),
            'contacts': new FormControl(0),
            'date': new FormControl('', Validators.required),
            'latitude': new FormControl(null),
            'location': new FormControl(null, Validators.required),
            'longitude': new FormControl(null),
            'people': new FormControl(0),
            'sales': new FormControl(0),
            'state': new FormControl(''),
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
      this.opportunityRef$.push(this.form.value).then(
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
        subTitle: 'Please fill the location and the date',
        buttons: ['Ok']
      });
      alert.present().catch(console.error);
    }
  }

}
