import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UtilisateurService {
  url = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get(this.url + "/utilisateur/get/");
  }

  update(data: any) {
    return this.httpClient.patch(this.url + "/utilisateur/updateStatut", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }
  getById(id: string) {
    return this.httpClient.get(this.url + "/utilisateur/get/" + id);
  }

  getGardienById(id: number) {
    return this.httpClient.get(this.url + "/utilisateur/getGardien/" + id);
  }

  getVets() {
    return this.httpClient.get(this.url + "/utilisateur/getAllVet/");
  }

  getVetById(id: number) {
    return this.httpClient.get(this.url + "/utilisateur/getVet/" + id);
  }
}
