import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  url = 'http://localhost:3000';

  constructor(private httpClient : HttpClient) { }

  getArchives(){
    return this.httpClient.get(this.url+"/commande/getArchives/");
  }

  getNonArchives(){
    return this.httpClient.get(this.url+"/commande/getNonArchives/");
  }

  archiver(id:any){
    return this.httpClient.patch(this.url+"/commande/archiver/"+id,{
      headers : new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  restaurer(id:any){
    return this.httpClient.patch(this.url+"/commande/restaurer/"+id,{
      headers : new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  delete(id:any){
    return this.httpClient.delete(this.url+"/commande/delete/"+id,{
      headers : new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  add(data:any){
    return this.httpClient.post(this.url+"/commande/add/",data);
  }
}
