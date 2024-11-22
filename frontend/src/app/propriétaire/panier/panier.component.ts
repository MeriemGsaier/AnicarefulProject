import { Component, OnInit } from '@angular/core';
import { PanierService } from 'src/app/services/panier.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  cart: any[] = []; 
  nombre_article!: number;
  prix_total!: number;

  constructor(
    private panierService : PanierService,
    private snackbarService : SnackbarService
  ) { }

  ngOnInit(): void {
    this.chargerProduitsPanier();
    this.nombreArticle();
    this.getPrixTotal();
  }

  chargerProduitsPanier() {
    this.cart = this.panierService.getProduitsPanier(); 
    console.log(this.cart)
  }

  supprimerProduit(indice : number) {
    this.panierService.supprimerDePanier(indice);
    this.snackbarService.openSnackBar('Produit supprimé de panier', 'supp');
    this.cart = this.panierService.getProduitsPanier(); 
    console.log(this.cart)
  }

  nombreArticle()
  {
    this.nombre_article= this.cart.length;
    console.log(this.nombre_article)
  }


  updatePrice() {
    this.panierService.calculPrix();
    this.getPrixTotal();
  }

  getPrixTotal()
  {
    this.prix_total = this.panierService.calculPrix();
  }



  


}
