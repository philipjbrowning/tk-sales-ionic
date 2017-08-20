import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import App = firebase.app.App;
import {FIREBASE_CREDENTIALS} from '../../../app/firebase.credentials';

@Injectable()
export class AuthProvider {
  private app: App;
  private isAuthenticated: boolean;
  private isConfirmed: boolean;
  private token: string;
  stateChanged = new Subject<boolean>();
  
  constructor() {
    this.app = firebase.initializeApp(FIREBASE_CREDENTIALS);
  }
  
  private reportLoggedIn(isConfirmed: boolean): void {
    if (!this.isAuthenticated)
      this.stateChanged.next(true);
    this.isAuthenticated = true;
    if (isConfirmed)
      this.isConfirmed = true;
  }
  
  private removeLoginData(isConfirmed: boolean): void {
    if (this.isAuthenticated)
      this.stateChanged.next(false);
    this.isAuthenticated = false;
    if (isConfirmed)
      this.isConfirmed = true;
    this.token = null;
  }
  
  confirmLoggedIn(): Promise<boolean> {
    return new Promise(
      (resolve, reject) => {
        if (this.isLoggedIn()) {
          this.reportLoggedIn(true);
          resolve();
        } else {
          this.onLoginError();
        }
      }
    )
  }
  
  isLoggedIn(): boolean {
    return !!firebase.auth().currentUser
  }
  
  onLoginError(err?: any): boolean {
    let rejectPromise = true;
    if (err) {
      switch (err.status) {
        case 0:
          // TODO: Offline message/code
          rejectPromise = false;
        default:
          this.removeLoginData(true);
          break;
      }
    }
    return rejectPromise;
  }
  
  login(email: string, password: string): Promise<boolean> {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (response: any) => {
            this.reportLoggedIn(true);
            resolve(response);
          }
        ).catch(
          (err: any) => {
            this.onLoginError(err) ? reject(err) : resolve();
          }
        );
        
      }
    );
  }
  
  logout(): Promise<boolean> {
    this.removeLoginData(false);
    return new Promise(
      (resolve) => {
        resolve();
      });
  }
}
