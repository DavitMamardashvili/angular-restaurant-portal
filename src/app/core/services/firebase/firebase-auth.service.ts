import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'; // Import firebase directly from the package
import 'firebase/compat/auth'; // Import specific Firebase services
import { map } from 'rxjs';
import { FirestoreService } from './firestore.service';



@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private fireAuth: AngularFireAuth, private firebaseClientService: FirestoreService) { }

  async registerWhithEmailAndPassword(path: string, emailAndPassword: any, data: any): Promise<any> {
    let registerUser = await this.fireAuth.createUserWithEmailAndPassword(emailAndPassword.email, emailAndPassword.password);
    await this.sendVerificationToEmail();
    await this.firebaseClientService.create(path, data, registerUser.user?.uid)
    return registerUser
  }

  async sendVerificationToEmail():Promise<void> {
    return (await this.fireAuth.currentUser)?.sendEmailVerification();
  }

  async signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(email, password).then((signInUser: any) => {
      return this.firebaseClientService.readById("/users", signInUser?.user?.uid ?? "").pipe(map((response: any) => {
        signInUser.user.additionalData = response;
        return signInUser;
      }))
    })
  }

  async resetPassword(email: string): Promise<any> {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  async signOut():Promise<any>{
    return this.fireAuth.signOut()
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    const user = await this.fireAuth.currentUser; 
    if (user) {
      const credential = firebase.auth.EmailAuthProvider.credential( 
        user.email!,
        currentPassword
      );
      await user.reauthenticateWithCredential(credential); 
      await user.updatePassword(newPassword); 
    } else {
      throw new Error('User not authenticated.');
    }
  }
}
