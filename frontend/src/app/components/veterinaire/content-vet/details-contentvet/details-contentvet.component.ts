import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ContenuInformatifService } from "src/app/services/contenu-informatif.service";
interface CardDetails {
  id: string;
  titre: string;
  date: string;
  photo: string;
  description: string;
}
@Component({
  selector: "app-details-contentvet",
  templateUrl: "./details-contentvet.component.html",
  styleUrls: ["./details-contentvet.component.scss"],
})
export class DetailsContentvetComponent implements OnInit {
  cardDetails?: CardDetails;

  constructor(
    private route: ActivatedRoute,
    private contenuInformatifService: ContenuInformatifService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const cardId = params["id"];
      this.fetchContentDetails(cardId);
    });
  }

  fetchContentDetails(id: string) {
    this.contenuInformatifService.getById(id).subscribe(
      (response: any) => {
        this.cardDetails = response;
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
