import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { CategorieService } from 'src/app/services/categorie.service';
import { PanierService } from 'src/app/services/panier.service';
import { ProduitService } from 'src/app/services/produit.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-produits-prop',
  templateUrl: './produits-prop.component.html',
  styleUrls: ['./produits-prop.component.scss']
})
export class ProduitsPropComponent implements OnInit {
  

  constructor(private produitService: ProduitService,
    private snackbarService : SnackbarService,
    private panierService : PanierService,
    private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.getCategories();
    this.loadProducts();
    this.nombreArticle();
  }
     
cards: any[] = [];
cart: any[] = [];
nombre_article!: number;
filteredCards: any[] = [];

categories: any[] = [];



getCategories() {
  this.categorieService.get().subscribe(
    (data: any) => {
      this.categories = data; 
    },
    (error) => {
      console.log('Erreur lors de la récupération des catégories :', error);
    }
  );
}

loadProducts() {
  this.produitService.get().subscribe((response: any) => {
      
      this.cards = response.map((product: { id:number;photo: any; libelle: any; description: any; prix: any; id_categorie:number }) => ({
        id : product.id,
        image: product.photo,
        libelle: product.libelle,
        desc: product.description,
        prix: product.prix,
        id_categorie:product.id_categorie,
        btn: "btn-info" 
      }));
      // Initialiser les cartes filtrées avec toutes les cartes chargées
      this.filteredCards = this.cards.slice();
    },
    (error) => {
      console.error('Erreur lors du chargement des produits :', error);
      // Gérer l'erreur si nécessaire
    }
  );
}


//filtre champ de recherche
 applyCardFilter(event: Event) {
    // Convertir le filtre en minuscules pour une recherche insensible à la casse
    const filterValue = (event.target as HTMLInputElement).value;
    // Filtrer les cartes en fonction du filtre
    this.filteredCards = this.cards.filter(card =>
      card.libelle.toLowerCase().includes(filterValue.trim().toLowerCase())
    );
  }

//filtre select catégorie produit
  filterByCategory(event: MatSelectChange) {
 
 
    console.log(event) 
     if(JSON.stringify(event) === "0")
     {
      
      this.filteredCards = this.cards.slice(); 
     }
     else
     {
      // Filtrer les produits par la catégorie sélectionnée
      this.filteredCards = this.cards.filter(card => card.id_categorie === event);
     }
    
  }

  addToCart(card: any) {
    this.panierService.ajouterAuPanier(card);
    this.snackbarService.openSnackBar('Produit ajouté au panier', 'Fermer');
    //test
    this.cart=this.panierService.getProduitsPanier();
    //console.log(this.cart)
    this.nombreArticle();
  }

  nombreArticle()
  {
    this.nombre_article= this.panierService.getProduitsPanier().length;
    console.log(this.nombre_article)
  }


}
