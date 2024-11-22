import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogFiltresComponent } from "./dialog-filtres/dialog-filtres.component";
import { v4 as uuidv4 } from "uuid";
import { Router } from "@angular/router";
import { GardeService } from "src/app/services/garde.service";
import { Globalconstants } from "src/app/shared/globalconstants";
import { SnackbarService } from "src/app/services/snackbar.service";
import Swal from "sweetalert2";
import { FilterGardeService } from "src/app/services/filter-garde.service";
import { ProfileService } from "src/app/services/profile.service";

interface Card {
  id: string;
  photo: string;
  nom: string;
  prenom: string;
  type_garde: string;
  adresse_domicile: string;
  date_debut: string;
  date_fin: string;
  espece: string;
}

@Component({
  selector: "app-gardes",
  templateUrl: "./gardes.component.html",
  styleUrls: ["./gardes.component.scss"],
})
export class GardesComponent implements OnInit {
  cards: Card[] = [];
  responseMessage: any;
  filteredCards: Card[] = [];
  id_user!: string;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private gardeService: GardeService,
    private snackbarService: SnackbarService,
    private filterService: FilterGardeService,
    private profileService: ProfileService
  ) {}
  //Dialogue des filtres
  openFiltersDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "400px";
    dialogConfig.position = {
      right: "75px",
      top: "160px",
    };

    const dialogRef = this.dialog.open(DialogFiltresComponent, dialogConfig);

    // Traitement fermeture du dialogue
    dialogRef.afterClosed().subscribe((result) => {
      // Traitement après la fermeture du dialogue (appliquer les filtres)
      if (result) {
        // Apply filters here
      }
    });
  }

  ngOnInit(): void {
    this.filterService.filters$.subscribe((filters) => {
      this.applyFilters(filters);
    });
    this.fetchContent();
    this.getProfile();
  }
  getProfile(): void {
    // Appelez la méthode de service pour récupérer les informations de l'utilisateur
    this.profileService.getProfile().subscribe(
      (response) => {
        this.id_user = response.id;
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération du profil : ",
          error
        );
      }
    );
  }

  fetchContent() {
    this.gardeService.getAll().subscribe(
      (response: any) => {
        console.log("response", response);
        this.cards = response.map((cardData: any) => ({
          id: cardData.id,
          nom: cardData.nom,
          prenom: cardData.prenom,
          date_debut: cardData.date_debut,
          date_fin: cardData.date_fin,
          photo: cardData.photo,
          type_garde: cardData.libelle,
          adresse_domicile: cardData.adresse_domicile,
          espece: cardData.espece,
        }));
        console.log("cards:", this.cards);
        this.filteredCards = this.cards.slice();
      },
      (error) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = Globalconstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          Globalconstants.error
        );
      }
    );
  }
  showDetails(id: string) {
    this.router.navigate(["/dashboardGard/detailsGarde", id]);
    console.log("test showDetails");
    console.log("showDetails called with ID:", id);
  }
  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .toLowerCase()
      .trim();

    this.filteredCards = this.cards.filter(
      (card) =>
        card.nom.toLowerCase().includes(filterValue) ||
        card.prenom.toLowerCase().includes(filterValue) ||
        card.adresse_domicile.toLowerCase().includes(filterValue)
    );
  }
  //postuler pour une garde
  postuler(idGarde: string) {
    // Afficher une alerte  pour confirmer l'action
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Voulez-vous vraiment postuler pour cette garde?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, postuler",
      confirmButtonColor: "#00c292",
      cancelButtonText: "Non, annuler",
      cancelButtonColor: "#f56565",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur confirme, appeler la méthode postuler du service
        this.gardeService.postuler(idGarde, this.id_user).subscribe(
          (response: any) => {
            // Afficher une alerte de succès
            Swal.fire({
              title: "Candidature envoyée!",
              text: "Votre candidature a été envoyée avec succès. Veuillez attendre la réponse par e-mail.",
              icon: "success",
            });
          },
          (error) => {
            // En cas d'erreur, afficher une alerte d'erreur
            Swal.fire({
              title: "Erreur!",
              text: "Une erreur s'est produite lors de l'envoi de votre candidature.",
              icon: "error",
            });
          }
        );
      }
    });
  }

  applyFilters(filters: any) {
    this.filteredCards = this.cards.filter((card) => {
      let matchesType = true;
      let matchesLocation = true;
      let matchesDate = true;
      let matchesSpecie = true;

      if (filters.type) {
        matchesType =
          card.type_garde.toLowerCase() === filters.type.toLowerCase();
      }

      if (filters.species) {
        matchesLocation = card.espece
          .toLowerCase()
          .includes(filters.species.toLowerCase());
      }

      if (filters.location) {
        matchesLocation = card.adresse_domicile
          .toLowerCase()
          .includes(filters.location.toLowerCase());
      }

      if (filters.startDate && filters.endDate) {
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);
        const cardStartDate = new Date(card.date_debut);
        const cardEndDate = new Date(card.date_fin);

        matchesDate = cardStartDate >= startDate && cardEndDate <= endDate;
      }

      return matchesType && matchesLocation && matchesDate;
    });
  }
}
