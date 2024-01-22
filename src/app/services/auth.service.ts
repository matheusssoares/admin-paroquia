import { Injectable, inject } from '@angular/core';
import { Auth, UserCredential, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);

  constructor(
  ) { }

  async loginUserEmailAndPassword(email: string, password: string) {
    return new Promise(async (resolve, reject) => {
      await signInWithEmailAndPassword(this.auth, email, password).then((user: UserCredential) => {
        resolve(user);
      }).catch((err) => {
        reject(err);
      })
    })
  }
}
