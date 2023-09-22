import { HttpClient } from '@angular/common/http';
import { UserValidated } from '../interfaces/user-validated';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiCorrespondenciaUrlBase: string = environment.apiUrlBaseDev;
  private readonly username: string = environment.username;
  private readonly password: string = environment.password;
  private readonly component: string = environment.component;
  private http: HttpClient = inject(HttpClient);

  signIn$ = <Observable<UserValidated>>this.http.post<UserValidated>(`${this.apiCorrespondenciaUrlBase}auth/api/v1/signin`, {
    "component": this.component,
    "username": this.username,
    "password": this.password
  });

  async checkLogin(): Promise<UserValidated | null> {
    try {
      let userValidated: UserValidated | null = localStorage.getItem('userValidated') ? JSON.parse(localStorage.getItem('userValidated') as string) : null;
      if (!userValidated || this.isTokenExpired(new Date(userValidated.expirationDate))) {
        userValidated = await lastValueFrom(this.signIn$);
        localStorage.setItem('userValidated', JSON.stringify(userValidated));
      }
      return userValidated;
    }catch(err) {
      console.log(`%c Ha ocurrido un error: ${err}`, 'background-color: #f3a295;');
      return null;
    }
  }

  private isTokenExpired(expirationDate: Date): boolean {
    const nowDate:Date = new Date();
    const differenceMinute = Math.round((expirationDate.getTime() - nowDate.getTime()) / (1000*60));
    return differenceMinute <= 5;
  }

}
