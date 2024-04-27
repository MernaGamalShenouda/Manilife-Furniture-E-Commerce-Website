import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private readonly http: HttpClient) { }

  private readonly URL_DB = "http://localhost:7005/api/users/signup";

  AddUser(user:any){
    return this.http.post(this.URL_DB, user);
  }
}
