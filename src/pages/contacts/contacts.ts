import { Component } from '@angular/core';
import {AlertController, IonicPage, ItemSliding, NavController} from 'ionic-angular';
import {Contact} from '../../domain/contact';
import {AuthProvider} from '../../shared/providers/auth/auth';
import {ContactReadPage} from './contact-read/contact-read';
import {FIREBASE_ENDPOINTS} from '../../app/firebase.credentials';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {ContactCreatePage} from './contact-create/contact-create';

/**
 * Generated class for the ContactsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  loading: boolean;
  contacts: Contact[];
  contactsRef$: FirebaseListObservable<Contact[]>;

  constructor(private alertCtrl: AlertController,
              private auth: AuthProvider,
              private database: AngularFireDatabase,
              public navCtrl: NavController) {}
  
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
          // Set the score of our Firebase list equal to non archived items
          this.contactsRef$ = this.database.list(FIREBASE_ENDPOINTS.CONTACTS, {
            query: {
              orderByChild: 'archived',
              equalTo: false
            }
          });
          resolve();
        } else {
          reject();
        }
      }
    );
  }
  
  onCreate(): void {
    // Open a new page, sliding to the right
    this.navCtrl.push(ContactCreatePage).catch(
      (err: any) => {
        const alert = this.alertCtrl.create({
          title: 'Create Contact Error',
          subTitle: err.message,
          buttons: ['Ok']
        });
        alert.present().catch(console.error);
      }
    );
  }
  
  /**
   * View the selected contact in a new page
   *
   * @param {string} key
   */
  onRead(key: string): void {
    // Open a new page, sliding to the right
    this.navCtrl.push(ContactReadPage, {
      contactId: key
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
  
  onArchive(slidingItem: ItemSliding, contact: Contact): void {
    slidingItem.close();
    let confirm = this.alertCtrl.create({
      title: 'Archive Contact',
      message: 'Do you want to archive this appointment? It is possible to undo this in the future.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Archive',
          handler: () => {
            const contactRef$ = this.database.object(FIREBASE_ENDPOINTS.CONTACTS + '/' + contact.$key);
  
            contact.archived = true;
            contactRef$.update(contact).then(() => {
              this.navCtrl.pop().catch(console.error);
            }).catch(
              (err: any) => {
                const alert = this.alertCtrl.create({
                  title: 'Archive Contact Error',
                  subTitle: err.message,
                  buttons: ['Ok']
                });
                alert.present().catch(console.error);
              }
            );
          }
        }
      ]
    });
    confirm.present().catch(console.error);
  }
  
  onDelete(slidingItem: ItemSliding, contact: Contact): void {
    slidingItem.close();
    let confirm = this.alertCtrl.create({
      title: 'Delete Opportunity',
      message: 'Do you want to delete this contact? This cannot be undone!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'delete',
          handler: () => {
            this.contactsRef$.remove(contact.$key).catch(
              (err: any) => {
                const alert = this.alertCtrl.create({
                  title: 'Delete Contact Error',
                  subTitle: err.message,
                  buttons: ['Ok']
                });
                alert.present().catch(console.error);
              }
            );
          }
        }
      ]
    });
    confirm.present().catch(console.error);
  }
}
