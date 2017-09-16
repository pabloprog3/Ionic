import { Injectable  } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import {firebaseconfig} from '../pages/firebase/firebaseconfig';
import {AngularFireModule} from 'angularfire2';

@Injectable()
export class AuthData {

    fireAuth: any;
    userToken: any;

    constructor (public afAuth: AngularFireAuth) {

    }

  
    loginUser (newEmail: string, newPassword: string): firebase.Promise<any> {

        return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
 
    }

    resetPassword (email: string): firebase.Promise<any> {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    logoutUser(): firebase.Promise<any> {
        this.userToken = {};
        return this.afAuth.auth.signOut();
    }
 
}
