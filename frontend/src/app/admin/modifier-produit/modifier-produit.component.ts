import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';
import { ProduitService } from 'src/app/services/produit.service';
import { Globalconstants } from 'src/app/shared/globalconstants';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier-produit',
  templateUrl: './modifier-produit.component.html',
  styleUrls: ['./modifier-produit.component.scss']
})
export class ModifierProduitComponent implements OnInit {

  produitForm: any = FormGroup;
  productId: any;
  responseMessage: any;
  categories: any[] = [];

  constructor(private router : Router,private formBuilder: FormBuilder, private produitService: ProduitService, private route: ActivatedRoute,private categorieService: CategorieService) { 
    this.produitForm = this.formBuilder.group({
      libelle: [null,[Validators.required]],
      categorie: [null,[Validators.required]],
      prix: [null,[Validators.required]],
      description: [null,[Validators.required]],
      photo: [null,[Validators.required]],
    });
  }



  ngOnInit(): void {
    this.getCategories();

    // Récupérer l'ID du produit depuis l'URL
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      // Récupérer les informations de la catégorie
      this.produitService.getById(this.productId).subscribe((produit: any) => {
        // Pré-remplir les champs du formulaire avec les informations de la catégorie
        this.produitForm.patchValue({
          libelle: produit.libelle,
          categorie: produit.categorie,
          prix: produit.prix,
          description: produit.description,
          photo: produit.photo
        });
      });
    });
    
  }

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



  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.produitForm.patchValue({
        photo: file
      });
      this.produitForm.get('photo').updateValueAndValidity();
    }
  }

  
  modifierproduit(): void {

    if (!this.produitForm.value.libelle || !this.produitForm.value.categorie || !this.produitForm.value.prix 
      || !this.produitForm.value.description || !this.produitForm.get('photo').value){
     Swal.fire('Erreur', 'Veuillez remplir tous les champs', 'error');
     return; 
   }

   const formData = new FormData();
    formData.append('libelle', this.produitForm.value.libelle);
    formData.append('prix', this.produitForm.value.prix);
    formData.append('description', this.produitForm.value.description);
    formData.append('photo', this.produitForm.get('photo').value); 
    formData.append('id_categorie', this.produitForm.value.categorie); 

    this.produitService.update(this.productId,formData).subscribe(
      (response: any) => {
        this.responseMessage = response.message;
        Swal.fire('Succès', this.responseMessage, 'success');
        this.router.navigate(['/admin-dashboard/produits']);
      },
      (error) => {
        if (error.error?.message) {
          this.responseMessage = error.error.message;
        } else {
          this.responseMessage = Globalconstants.genericError;
        }
        Swal.fire('Erreur', this.responseMessage, 'error');
      }
    );
  }

}
