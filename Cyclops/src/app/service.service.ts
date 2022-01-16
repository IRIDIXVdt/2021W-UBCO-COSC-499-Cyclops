import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  headers: HttpHeaders;
  constructor(
    public http:HttpClient
  ) {
    this.headers = new HttpHeaders();
    this.headers.append("Accept",'application/json');
    this.headers.append("Content-Type",'application/json');
    this.headers.append("Access-control-Allow-Origin",'*');
  }

  

  addStudent(data){
    return this.http.post('http://localhost:4430/Cyclops/backend/create.php',data);
  }
}
