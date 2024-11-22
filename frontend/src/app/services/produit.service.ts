import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  url = 'http://localhost:3000';

  constructor(private httpClient : HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url+"/produit/add/",data);
  }


  update(id:number,data:any){
    return this.httpClient.patch(this.url+`/produit/update/${id}`,data);
  }

  get(){
    return this.httpClient.get(this.url+"/produit/get/");
  }


  delete(id:any){
    return this.httpClient.delete(this.url+"/produit/delete/"+id,{
      headers : new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getProductsByCategory(id:any){
    return this.httpClient.get(this.url+"/produit/getByCategory/"+id);
  }

  getById(id:any){
    return this.httpClient.get(this.url+"/produit/getById/"+id);
  }
}
