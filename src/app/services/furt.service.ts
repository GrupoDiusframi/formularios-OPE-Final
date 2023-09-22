import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FurtService {
  private http: HttpClient = inject(HttpClient);
  private readonly apiUrlBase = environment.apiUrlBase;
}
