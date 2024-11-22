import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';

import { MatSelectChange } from '@angular/material/select';
import { CategorieService } from 'src/app/services/categorie.service';
import { PanierService } from 'src/app/services/panier.service';
import { ProduitService } from 'src/app/services/produit.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {

  constructor(
    private produitService: ProduitService,
    private snackbarService: SnackbarService,
    private panierService: PanierService,
    private categorieService: CategorieService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.loadProducts();
  }

  cards: any[] = [];
  cart: any[] = [];
  filteredCards: any[] = [];

  categories: any[] = [];

  getCategories() {
    this.categorieService.get().subscribe(
      (data: any) => {
        console.log('Catégories récupérées :', data);
        this.categories = data;
      },
      (error) => {
        console.log('Erreur lors de la récupération des catégories :', error);
      }
    );
  }
  
  loadProducts() {
    this.produitService.get().subscribe(
      (response: any) => {
        console.log('Produits récupérés :', response);
        this.cards = response.map((product: { id: number; photo: any; libelle: any; description: any; prix: any; id_categorie: number }) => ({
          id: product.id,
          image: product.photo,
          libelle: product.libelle,
          desc: product.description,
          prix: product.prix,
          id_categorie: product.id_categorie,
          btn: "btn-info"
        }));
        this.filteredCards = this.cards.slice(0, 6); // Slice the array to get only the first 6 products
      },
      (error) => {
        console.error('Erreur lors du chargement des produits :', error);
      }
    );
  }

  filterByCategory(categoryId: number) {
    if (categoryId === 0) {
      this.filteredCards = this.cards.slice(0, 6); // Slice the array to get only the first 6 products
    } else {
      this.filteredCards = this.cards.filter(card => card.id_categorie === categoryId).slice(0, 6); // Slice the array to get only the first 6 products
    }
  }

  addToCart(card: any) {
    this.panierService.ajouterAuPanier(card);
    this.snackbarService.openSnackBar('Produit ajouté au panier', 'Fermer');
    this.cart = this.panierService.getProduitsPanier();
  }

  selectProprietaire(): void {
    this.roleService.setRole('proprietaire');
    console.log('Role: navbar: proprietaire');
  }

}
