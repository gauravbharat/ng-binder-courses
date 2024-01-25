import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../app.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #httpClient = inject(HttpClient);

  login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Observable<User> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.#httpClient.post<User>(
      `${environment.authUrl}/login`,
      {
        username,
        password,
        expiresInMins: 36000, // optional
      },
      { headers }
    );
  }
}
