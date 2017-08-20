import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {Contact} from '../../../domain/contact';
import {FIREBASE_ENDPOINTS} from '../../../app/firebase.credentials';
import {AuthProvider} from '../../../shared/providers/auth/auth';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * Generated class for the ContactUpdatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-update',
  templateUrl: 'contact-update.html',
})
export class ContactUpdatePage {
  contact: Contact;
  contactRef$: FirebaseObjectObservable<Contact>;
  contactSubscription: Subscription;
  form: FormGroup;

  constructor(private alertCtrl: AlertController,
              private auth: AuthProvider,
              private database: AngularFireDatabase,
              public navCtrl: NavController,
              public navParams: NavParams) {
    // Setup the dynamic form
    this.form = new FormGroup({
      '$key': new FormControl('', Validators.required),
      'archived': new FormControl(null),
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
    
    // Get the contactId as a nav parameter
    const contactId = this.navParams.get('contactId');
  
    // Set the score of our Firebase object equal to our selected item
    this.contactRef$ = this.database.object(FIREBASE_ENDPOINTS.CONTACTS + '/' + contactId);
  
    // Subscribe to the Object and assign the result to this contact
    this.contactSubscription = this.contactRef$.subscribe(
      result => {
        this.form.setValue({
          'archived': result.archived || false,
          'city': result.archived || '',
          'email': result.archived || '',
          'firstName': result.archived || '',
          'gender': result.archived || 'F',
          'lastName': result.archived || '',
          'notes': result.archived || '',
          'partner': result.archived || '',
          'phone': result.archived || '',
          'postalCode': result.archived || '',
          'rating': result.archived || 0,
          'session': result.archived || '',
          'state': result.archived || '',
          'user': result.archived || '',
        });
      }
    );
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
          resolve();
        } else {
          reject();
        }
      }
    );
  }
  
  // Update the Firebase node with the new data
  onSubmit(contact: Contact): void {
    this.contactRef$.update(contact).then(() => {
      this.navCtrl.pop().catch(console.error);
    }).catch(
      (err: any) => {
        const alert = this.alertCtrl.create({
          title: 'Update Contact Error',
          subTitle: err.message,
          buttons: ['Ok']
        });
        alert.present().catch(console.error);
      }
    )
  }
  
  ionViewWillLeave(): void {
    // Unsubscribe from the observable when leaving the page to free up memory
    // resources
    this.contactSubscription.unsubscribe();
  }

}
