import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RendezVousService {
  url = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {}

  add(data: any) {
    return this.httpClient.post(this.url + "/rendezVous/add/", data);
  }

  annulerRdv(id1: any, id2: any) {
    return this.httpClient.delete(
      `${this.url}/rendezVous/annuler/${id1}/${id2}`,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
      }
    );
  }
  deleteByInterval(id_intervalle: any) {
    return this.httpClient.delete(
      `${this.url}/rendezVous/delete/${id_intervalle}`,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
      }
    );
  }

  getAllByUser(id: any) {
    return this.httpClient.get(this.url + "/rendezVous/getAll/" + id);
  }
  getAllByIntervalleHorr(id_intervalle: any) {
    return this.httpClient.get(
      this.url + "/rendezVous/getRdv/" + id_intervalle
    );
  }

  getUserRendezVous(id_user: string) {
    return this.httpClient.get<any[]>(`${this.url}/rendezVous/getAllR/${id_user}`);
  }
}
