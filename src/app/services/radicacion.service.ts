import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RadicacionService {
  private readonly apiCorrespondenciaUrlBase: string = environment.apiCorrespondenciaUrlBase;
  private http: HttpClient = inject(HttpClient);
  private _authService: AuthService = inject(AuthService);

  async generatedRadicado(): Promise<void> {
    const isLogin = await this._authService.checkLogin();
    if (isLogin) {
      console.log('%c Hacemos de todo', 'background-color: #B2EED8;')
    }
  }

}
