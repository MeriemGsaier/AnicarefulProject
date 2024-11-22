import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AnimalService {
  url = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {}

  add(data: any) {
    return this.httpClient.post(this.url + "/animal/add/", data);
  }
  update(id: number, data: any) {
    return this.httpClient.patch(`${this.url}/animal/update/${id}`, data);
  }

  get(id_prop: number) {
    return this.httpClient.get(this.url + "/animal/get/" + id_prop);
  }

  getById(id: any) {
    return this.httpClient.get(this.url + "/animal/getById/" + id);
  }

  delete(id: any) {
    return this.httpClient.delete(this.url + "/animal/delete/" + id, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }
}
