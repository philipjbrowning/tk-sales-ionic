import {Component} from '@angular/core';
import {AlertController, IonicPage, ItemSliding, NavController} from 'ionic-angular';
import {Opportunity} from '../../domain/opportunity';
import {AuthProvider} from '../../shared/providers/auth/auth';
import {OpportunityReadPage} from './opportunity-read/opportunity-read';
import {OpportunityCreatePage} from './opportunity-create/opportunity-create';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {FIREBASE_ENDPOINTS} from '../../app/firebase.credentials';

/**
 * Generated class for the OpportunitiesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opportunities',
  templateUrl: 'opportunities.html',
})
export class OpportunitiesPage {
  opportunitiesRef$: FirebaseListObservable<Opportunity[]>;
  
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
   * @returns {Promise<boolean>}
   */
  ionViewCanEnter(): Promise<boolean> {
    return new Promise(
      (resolve, reject) => {
        if (this.auth.isLoggedIn()) {
          this.opportunitiesRef$ = this.database.list(FIREBASE_ENDPOINTS.OPPORTUNITIES);
          resolve();
        } else {
          reject();
        }
      }
    );
  }
  
  onCreate(): void {
    // Open a new page, sliding to the right
    this.navCtrl.push(OpportunityCreatePage).catch(
      (err: any) => {
        const alert = this.alertCtrl.create({
          title: 'Create Opportunity Error',
          subTitle: err.message,
          buttons: ['Ok']
        });
        alert.present().catch(console.error);
      }
    );
  }
  
  /**
   * Match the opportunity based on the id, if this user started the
   * opportunity session, or on the sessionId, if another user started the
   * opportunity session.
   *
   * @param {OpportunitySession} session
   */
  onUpdate(session: Opportunity): void {
    // const item = this.opportunities.find(opportunity => {
    //   return opportunity.id === session.id || opportunity.id === session.sessionId;
    // });
    
    // Open a new page, sliding to the right
    this.navCtrl.push(OpportunityReadPage, {
      // item: item,
      session: session
    }).catch(
      (err: any) => {
        const alert = this.alertCtrl.create({
          title: 'View Opportunity Error',
          subTitle: err.message,
          buttons: ['Ok']
        });
        alert.present().catch(console.error);
      }
    );
  }
  
  onArchive(slidingItem: ItemSliding, session: Opportunity): void {
    slidingItem.close();
    let confirm = this.alertCtrl.create({
      title: 'Archive Opportunity',
      message: 'Do you want to archive this appointment? It is possible to undo this in the future.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Archive',
          handler: () => {
            const opportunitySessionRef$ = this.database.object(FIREBASE_ENDPOINTS.OPPORTUNITIES + '/' + session.$key);
  
            session.archived = true;
            opportunitySessionRef$.update(session).then(() => {
              this.navCtrl.pop().catch(console.error);
            }).catch(
              (err: any) => {
                const alert = this.alertCtrl.create({
                  title: 'Archive Opportunity Error',
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
  
  onDelete(slidingItem: ItemSliding, session: Opportunity): void {
    slidingItem.close();
    let confirm = this.alertCtrl.create({
      title: 'Delete Opportunity',
      message: 'Do you want to delete this appointment? This cannot be undone!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'delete',
          handler: () => {
            this.opportunitiesRef$.remove(session.$key).catch(
              (err: any) => {
                const alert = this.alertCtrl.create({
                  title: 'Delete Opportunity Error',
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
