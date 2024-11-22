import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContenuInformatifService } from 'src/app/services/contenu-informatif.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Globalconstants } from 'src/app/shared/globalconstants';

interface Card {
  id: string;
  title: string;
  date: string;
  photo: string;
  description: string;
  profile: string;
  id_utilisateur: string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  cards: Card[] = [];
  responseMessage: any;
  id_user: number = 1;
  filteredCards: Card[] = [];

  constructor(
    private snackbarService: SnackbarService,
    private contenuInformatifService: ContenuInformatifService,
    private router: Router,
    private utilisateurService: UtilisateurService
  ) { }

  ngOnInit(): void {
    this.fetchContent();
  }

  fetchContent() {
    this.contenuInformatifService.get().subscribe(
      (response: any) => {
        console.log("response", response);
        // Filter content with "approuvé" state
        const approvedContent = response.filter(
          (cardData: any) => cardData.etat === "approuve"
        );
        // Map the filtered content to Card interface
        this.cards = approvedContent.map((cardData: any) => ({
          id: cardData.id,
          title: cardData.titre,
          date: cardData.date,
          photo: cardData.photo,
          description: cardData.description,
          id_user: cardData.id_utilisateur,
          profile: null,
        }));
        this.fetchProfilePhotos();

        this.filteredCards = this.cards.slice();
        console.log("Filtered cards:", this.filteredCards);
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
  fetchProfilePhotos() {
    // Fetch profile photo for each card
    this.cards.forEach((card, index) => {
      this.utilisateurService.getById(card.id_utilisateur).subscribe(
        (response: any) => {
          this.cards[index].profile = response.photo;
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération de la photo de profil :",
            error
          );
        }
      );
    });
  }
  search(event: Event) {
    // Convert the filter to lowercase for case-insensitive search
    const filterValue = (event.target as HTMLInputElement).value
      .toLowerCase()
      .trim();
    // Filter the cards based on the filter value
    this.filteredCards = this.cards.filter((card) =>
      card.title.toLowerCase().includes(filterValue)
    );
  }

  
  showDetails(id: string) {
    this.router.navigate(["/prop-dashboard/detailsContent", id]);
    console.log("test showDetails");
    console.log("showDetails called with ID:", id);
  }

}
