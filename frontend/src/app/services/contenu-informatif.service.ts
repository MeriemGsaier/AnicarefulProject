import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ContenuInformatifService {
  url = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {}

  get() {
    return this.httpClient.get(this.url + "/contenu_informatif/get/");
  }

  approuver(id: any) {
    return this.httpClient.patch(
      this.url + "/contenu_informatif/approuver/" + id,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
      }
    );
  }

  delete(id: any) {
    return this.httpClient.delete(
      this.url + "/contenu_informatif/delete/" + id,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
      }
    );
  }

  getByuser(id_user: number) {
    return this.httpClient.get(
      this.url + "/contenu_informatif/getByuser/" + id_user
    );
  }

  add(data: any) {
    return this.httpClient.post(this.url + "/contenu_informatif/add/", data);
  }
  getById(id: string) {
    return this.httpClient.get(this.url + "/contenu_informatif/details/" + id);
  }
}
