import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private panier: any[] = [];
  prix_total!: number;

  constructor() { }

   

  ajouterAuPanier(produit: any) {
    const index = this.panier.findIndex(item => item.libelle === produit.libelle);
    if (index !== -1) {
      this.panier[index].quantite++;
    } else {
      this.panier.push({ ...produit, quantite: 1 });
    }
  }

  
  getProduitsPanier() {
    return this.panier; 
  }

  supprimerDePanier(indice_prod: number) {
    if (indice_prod >= 0 && indice_prod < this.panier.length)
    {
    this.panier.splice(indice_prod,1); 
    }
  }

 
  
  calculPrix() {
    this.prix_total = this.panier.reduce((total, produit) => total + (produit.prix * produit.quantite), 0);
    console.log(this.prix_total)
    return this.prix_total;
    
  }
}
