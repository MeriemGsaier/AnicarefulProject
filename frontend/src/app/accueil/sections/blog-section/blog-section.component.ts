import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContenuInformatifService } from 'src/app/services/contenu-informatif.service';
import { RoleService } from 'src/app/services/role.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Globalconstants } from 'src/app/shared/globalconstants';

interface Card {
  category: string;
  id: string;
  title: string;
  date: string;
  photo: string;
  description: string;
  profile: string;
  id_utilisateur: string;
}

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.scss']
})
export class BlogSectionComponent implements OnInit {

  selectedCategory: string | null = null;
  categories: string[] = ['Alimentation', 'Hygiène et soins', 'Confort et accessoires'];
  category = 'Alimentation';

  constructor(private roleService: RoleService,
    private snackbarService: SnackbarService,
    private contenuInformatifService: ContenuInformatifService,
    private router: Router,
    private utilisateurService: UtilisateurService) { }

  cards: Card[] = [];
  responseMessage: any;
  id_user: number = 1;
  filteredCards: Card[] = [];

  ngOnInit(): void {
    this.fetchContent();
  }

  fetchContent() {
    this.contenuInformatifService.get().subscribe(
      (response: any) => {
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
        this.filteredCards = this.cards.slice(0, 6); // Slice the array to get only the first 6 cards
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

  filterByCategory(): Card[] {
    if (!this.selectedCategory) {
      return this.filteredCards; // Filter the sliced cards
    }
    return this.filteredCards.filter((card) => card.category === this.selectedCategory);
  }

  selectCategory(category: string | null) {
    // Your logic for selecting categories goes here
  }

  selectProprietaire(): void {
    this.roleService.setRole('proprietaire');
  }
}
