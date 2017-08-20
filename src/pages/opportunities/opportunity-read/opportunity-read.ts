import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Opportunity} from '../../../domain/opportunity';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthProvider} from '../../../shared/providers/auth/auth';
import {FIREBASE_ENDPOINTS} from '../../../app/firebase.credentials';
import {OpportunityUpdatePage} from '../opportunity-update/opportunity-update';

/**
 * Generated class for the OpportunityReadPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opportunity-read',
  templateUrl: 'opportunity-read.html',
})
export class OpportunityReadPage {
  opportunity: Opportunity;
  opportunityRef$: FirebaseObjectObservable<Opportunity>;
  opportunitySubscription: Subscription;

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
   * 2. Create form
   * @returns {Promise<boolean>}
   */
  ionViewCanEnter(): Promise<boolean> {
    return new Promise(
      (resolve, reject) => {
        if (this.auth.isLoggedIn()) {
          // Get the contactId as a nav parameter
          const opportunityId = this.navParams.get('opportunityId');
          
          this.opportunityRef$ = this.database.object(`${FIREBASE_ENDPOINTS.OPPORTUNITIES}/${opportunityId}`);
          
          // Subscribe to the Object and assign the result to this contact
          this.opportunitySubscription = this.opportunityRef$.subscribe(result => { this.opportunity = result;});
  
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
    this.navCtrl.push(OpportunityUpdatePage, {
      contactId: this.opportunity.$key
    }).catch(
      (err: any) => {
        const alert = this.alertCtrl.create({
          title: 'View Opporotunity Error',
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
    this.opportunitySubscription.unsubscribe();
  }

}
