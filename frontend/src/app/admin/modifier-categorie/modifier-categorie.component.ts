import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';
import { Globalconstants } from 'src/app/shared/globalconstants';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modifier-categorie',
  templateUrl: './modifier-categorie.component.html',
  styleUrls: ['./modifier-categorie.component.scss']
})
export class ModifierCategorieComponent implements OnInit {

  categorieForm: any = FormGroup;
  categorieId: any;
  responseMessage: any;
  
    constructor(private router : Router,private formBuilder: FormBuilder, private categorieService: CategorieService, private route: ActivatedRoute) {
    this.categorieForm = this.formBuilder.group({
      libelle: [null, [Validators.required]],
      photo: [null, [Validators.required]]
    });
  }

 

  ngOnInit(): void {
    // Récupérer l'ID de la catégorie depuis l'URL
    this.route.params.subscribe(params => {
      this.categorieId = params['id'];
      // Récupérer les informations de la catégorie
      this.categorieService.getById(this.categorieId).subscribe((categorie: any) => {
        // Pré-remplir les champs du formulaire avec les informations de la catégorie
        this.categorieForm.patchValue({
          libelle: categorie.libelle,
          photo: categorie.photo
        });
      });
    });
  }


  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.categorieForm.patchValue({
        photo: file
      });
      this.categorieForm.get('photo').updateValueAndValidity();
    }
  }

  modifierCategorie(): void {

    if (!this.categorieForm.value.libelle || !this.categorieForm.get('photo').value) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs', 'error');
      return; 
    }

    const formData = new FormData();
    formData.append('libelle', this.categorieForm.value.libelle);
    formData.append('photo', this.categorieForm.get('photo').value); 
    console.log(this.categorieId);
    this.categorieService.update(this.categorieId,formData).subscribe(
      (response: any) => {
        this.responseMessage = response.message;
        Swal.fire('Succès', this.responseMessage, 'success');
        this.router.navigate(['/admin-dashboard/categories']);
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
