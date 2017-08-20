import { Component } from '@angular/core';
import {AlertController, IonicPage, ItemSliding, NavController} from 'ionic-angular';
import {Appointment} from '../../domain/appointment';
import {AuthProvider} from '../../shared/providers/auth/auth';
import {AppointmentReadPage} from './appointment-read/appointment-read';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {FIREBASE_ENDPOINTS} from '../../app/firebase.credentials';
import {AppointmentCreatePage} from './appointment-create/appointment-create';

@IonicPage()
@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html',
})
export class AppointmentsPage {
  loading: boolean;
  appointments: Appointment[];
  appointmentsRef$: FirebaseListObservable<Appointment[]>;

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
          // Set the score of our Firebase list equal to non archived items
          this.appointmentsRef$ = this.database.list(FIREBASE_ENDPOINTS.APPOINTMENTS, {
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
    this.navCtrl.push(AppointmentCreatePage).catch(
      (err: any) => {
        const alert = this.alertCtrl.create({
          title: 'Create Appointment Error',
          subTitle: err.message,
          buttons: ['Ok']
        });
        alert.present().catch(console.error);
      }
    );
  }
  
  /**
   * View the selected appointment in a new page
   *
   * @param {string} key
   */
  onRead(key: string): void {
    // Open a new page, sliding to the right
    this.navCtrl.push(AppointmentReadPage, {
      appointmentId: key
    }).catch(
      (err: any) => {
        const alert = this.alertCtrl.create({
          title: 'View Appointment Error',
          subTitle: err.message,
          buttons: ['Ok']
        });
        alert.present().catch(console.error);
      }
    );
  }
  
  onArchive(slidingItem: ItemSliding, appointment: Appointment): void {
    slidingItem.close();
    let confirm = this.alertCtrl.create({
      title: 'Archive Appointment',
      message: 'Do you want to archive this appointment? It is possible to undo this in the future.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Archive',
          handler: () => {
            const appointmentRef$ = this.database.object(FIREBASE_ENDPOINTS.APPOINTMENTS + '/' + appointment.$key);
  
            appointment.archived = true;
            appointmentRef$.update(appointment).then(() => {
              this.navCtrl.pop().catch(console.error);
            }).catch(
              (err: any) => {
                const alert = this.alertCtrl.create({
                  title: 'Archive Appointment Error',
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
  
  onDelete(slidingItem: ItemSliding, appointment: Appointment): void {
    slidingItem.close();
    let confirm = this.alertCtrl.create({
      title: 'Delete Appointment',
      message: 'Do you want to archive this appointment? This cannot be undone!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'delete',
          handler: () => {
            this.appointmentsRef$.remove(appointment.$key).catch(
              (err: any) => {
                const alert = this.alertCtrl.create({
                  title: 'Delete Appointment Error',
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
