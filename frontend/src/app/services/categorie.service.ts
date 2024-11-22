import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  url = 'http://localhost:3000';
  constructor(private httpClient : HttpClient) { }


  add(data:any){
    return this.httpClient.post(this.url+"/categorie/add/",data);
  }


  update(id:number,data:any){
    return this.httpClient.patch(`${this.url}/categorie/update/${id}`,data);
  }

  get(){
    return this.httpClient.get(this.url+"/categorie/get/");
  }

  getById(id:any){
    return this.httpClient.get(this.url+"/categorie/getById/"+id);
  }

  delete(id:any){
    return this.httpClient.delete(this.url+"/categorie/delete/"+id,{
      headers : new HttpHeaders().set('Content-Type',"application/json")
    })
  }
}
