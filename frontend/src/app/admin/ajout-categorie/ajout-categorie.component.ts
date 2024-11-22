import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';
import { Globalconstants } from 'src/app/shared/globalconstants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout-categorie',
  templateUrl: './ajout-categorie.component.html',
  styleUrls: ['./ajout-categorie.component.scss']
})
export class AjoutCategorieComponent implements OnInit {
  categorieForm : any = FormGroup;
  responseMessage : any;
  onAddCategory = new EventEmitter();
  constructor(private router: Router,private formBuilder : FormBuilder,
    private categorieService : CategorieService,
    ) { }

  ngOnInit(): void {
    this.categorieForm = this.formBuilder.group({
      libelle: [null,[Validators.required]],
      photo: [null,[Validators.required]]
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

  ajoutercategorie() {

    if (!this.categorieForm.value.libelle || !this.categorieForm.get('photo').value) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs', 'error');
      return; 
    }


    const formData = new FormData();
    formData.append('libelle', this.categorieForm.value.libelle);
    formData.append('photo', this.categorieForm.get('photo').value); 
    this.categorieService.add(formData).subscribe((response: any) => {
      this.onAddCategory.emit();
      this.responseMessage = response?.message;
      Swal.fire('Succès', this.responseMessage, 'success');
      this.router.navigate(['/admin-dashboard/categories']);
    }, (error) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = Globalconstants.genericError;
      }
      Swal.fire('Erreur', this.responseMessage, 'error');
    });
  }
  

}
