import { Injectable, inject } from '@angular/core';
import { Auth, User, UserCredential, authState, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  constructor(
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(async (resolve) => {
      const result = await this.isUserLogged();
      if(result) {
        resolve(true)
      } else {
        resolve(false);
        this.router.navigateByUrl('');
      }
    })
  }

  isUserLogged(): Promise<boolean> {
    return new Promise((resolve) => {
      this.authState$.subscribe((user: User | null) => {
        if(user) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    })
  }

  async loginUserEmailAndPassword(email: string, password: string) {
    return new Promise(async (resolve, reject) => {
      await signInWithEmailAndPassword(this.auth, email, password).then((user: UserCredential) => {
        resolve(user);
      }).catch((err) => {
        reject(err);
      })
    })
  }

  async logout() {
    return await signOut(this.auth);
  }
}
