import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  constructor(private readonly http: HttpClient) {}

  private readonly URL_DB = 'https://e-commerce-project-q5po.onrender.com/api/users';

  getUser(userId: any) {
    return this.http.get(this.URL_DB + userId);
  }
}
