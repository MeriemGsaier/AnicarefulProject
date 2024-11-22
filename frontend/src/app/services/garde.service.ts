import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GardeService {
  url = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {}

  add(data: any) {
    return this.httpClient.post(this.url + "/garde/add/", data);
  }

  update(id: number, data: any) {
    return this.httpClient.patch(`${this.url}/garde/update/${id}`, data);
  }

  get(id_prop: number) {
    return this.httpClient.get(this.url + "/garde/get/" + id_prop);
  }

  getById(id: any) {
    return this.httpClient.get(this.url + "/garde/getById/" + id);
  }

  delete(id: any) {
    return this.httpClient.delete(this.url + "/garde/delete/" + id, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }
  getAll() {
    return this.httpClient.get(this.url + "/garde/getAll");
  }
  postuler(idGarde: string, idGardien: string) {
    return this.httpClient.post(`${this.url}/garde/postuler/${idGarde}`, {
      id_gardien: idGardien,
    });
  }

  getPostulations(id_garde: number) {
    return this.httpClient.get(this.url + "/garde/getPostulations/" + id_garde);
  }

  accepterCandidature(idGard: number, idGardien: number): Observable<any> {
    return this.httpClient.patch(
      `${this.url}/garde/accepterCand/${idGard}/${idGardien}`,
      {}
    );
  }

  refuserCandidature(idGard: number, idGardien: number): Observable<any> {
    return this.httpClient.patch(
      `${this.url}/garde/refuserCand/${idGard}/${idGardien}`,
      {}
    );
  }


  getTypeGarde(){
    return this.httpClient.get(this.url+"/garde/getTypeGarde/");
  }
}
