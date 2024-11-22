import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GardeService } from "src/app/services/garde.service";

interface CardDetails {
  date_debut: string;
  date_fin: string;
  heure_deb: string;
  heure_fin: string;
  remarque: string;
  nom: string;
  prenom: string;
  adresse_domicile: string;
  nom_animal: string;
  sexe: string;
  espece: string;
  race: string;
  age: string;
  information_medicale: string;
  regime_alimentaire: string;
  poids: string;
  photo: string;

  animalDetails: AnimalDetails;
}

interface AnimalDetails {
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  weight: string;
  medicalInfo: string;
  diet: string;
}

@Component({
  selector: "app-details-garde",
  templateUrl: "./details-garde.component.html",
  styleUrls: ["./details-garde.component.scss"],
})
export class DetailsGardeComponent implements OnInit {
  cardDetails?: CardDetails;
  constructor(
    private route: ActivatedRoute,
    private gardeService: GardeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const cardId = params["id"];
      this.fetchContentDetails(cardId);
    });
  }
  fetchContentDetails(id: string) {
    this.gardeService.getById(id).subscribe(
      (response: any) => {
        this.cardDetails = response;
        console.log("response", response);
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des détails du contenu :",
          error
        );
      }
    );
  }
}
