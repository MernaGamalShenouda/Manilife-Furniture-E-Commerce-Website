import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  constructor(private readonly http: HttpClient) {}

  private readonly URL_DB = 'http://localhost:7005/api/users/';

  getUser(userId: any) {
    return this.http.get(this.URL_DB + userId);
  }
}
