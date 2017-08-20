import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {AuthProvider} from '../../../shared/providers/auth/auth';
import {Contact} from '../../../domain/contact';
import {FIREBASE_ENDPOINTS} from '../../../app/firebase.credentials';
import {Subscription} from 'rxjs/Subscription';
import {ContactUpdatePage} from '../contact-update/contact-update';

@IonicPage()
@Component({
  selector: 'page-contact-read',
  templateUrl: 'contact-read.html',
})
export class ContactReadPage {
  contact: Contact;
  contactRef$: FirebaseObjectObservable<Contact>;
  contactSubscription: Subscription;

  constructor(private alertCtrl: AlertController,
              private auth: AuthProvider,
              private database: AngularFireDatabase,
              public navCtrl: NavController,
              public navParams: NavParams) {
  }
  
  // --------------------------------------------------------------------------
  // Ionic Life Cycle Hooks
  // --------------------------------------------------------------------------
  
  /**
   * 1. Check for login access
   * @returns {Promise<boolean>}
   */
  ionViewCanEnter(): Promise<boolean> {
    return new Promise(
      (resolve, reject) => {
        if (this.auth.isLoggedIn()) {
          // Get the contactId as a nav parameter
          const contactId = this.navParams.get('contactId');
  
          // Set the score of our Firebase object equal to our selected item
          this.contactRef$ = this.database.object(`${FIREBASE_ENDPOINTS.CONTACTS}/${contactId}`);
  
          // Subscribe to the Object and assign the result to this contact
          this.contactSubscription = this.contactRef$.subscribe(result => this.contact = result);
          
          resolve();
        } else {
          reject();
        }
      }
    );
  }
  
  // Send the user to the update page
  onUpdate(): void {
    // Open a new page, sliding to the right
    this.navCtrl.push(ContactUpdatePage, {
      contactId: this.contact.$key
    }).catch(
      (err: any) => {
        const alert = this.alertCtrl.create({
          title: 'View Contact Error',
          subTitle: err.message,
          buttons: ['Ok']
        });
        alert.present().catch(console.error);
      }
    );
  }
  
  ionViewWillLeave(): void {
    // Unsubscribe from the observable when leaving the page to free up memory
    // resources
    this.contactSubscription.unsubscribe();
  }

}
