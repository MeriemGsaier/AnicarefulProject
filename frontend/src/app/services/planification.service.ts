import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PlanificationService {
  url = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {}

  addPlanification(data: any) {
    return this.httpClient.post(this.url + "/planification/add/", data);
  }
  getIntervallesByDate(date: any, id_veterinaire: any) {
    return this.httpClient.get(
      this.url + "/planification/getIntervalles/" + date + "/" + id_veterinaire
    );
  }
  updatePlanification(id: number, data: any) {
    return this.httpClient.patch(
      this.url + `/planification/update/${id}`,
      data
    );
  }
  getIntervalleById(id: any) {
    return this.httpClient.get(this.url + "/planification/getIntervalle/" + id);
  }
  getSousIntervallesByVet(id_vet: any) {
    return this.httpClient.get(
      this.url + "/planification/getSousIntervalles/" + id_vet
    );
  }
  getSousIntervallesByIdIntervalle(id_intervalle: any) {
    return this.httpClient.get(
      this.url + "/planification/sousIntervalles/" + id_intervalle
    );
  }
  deleteIntervalle(id: any) {
    return this.httpClient.delete(
      this.url + "/planification/deleteIntervalle/" + id,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
      }
    );
  }
}
