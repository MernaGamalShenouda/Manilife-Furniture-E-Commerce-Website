import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private readonly http: HttpClient) { }

  private readonly URL_DB = "https://e-commerce-project-q5po.onrender.com/api/";

  AddUser(user:any){
    return this.http.post(this.URL_DB+`users/signup`, user);
  }


  uploadImage(formData: FormData) {
    return this.http.post(this.URL_DB+`uploadPhoto/upload`, formData);
  }
}
