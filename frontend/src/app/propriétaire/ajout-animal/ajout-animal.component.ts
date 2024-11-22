import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalService } from 'src/app/services/animal.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Globalconstants } from 'src/app/shared/globalconstants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout-animal',
  templateUrl: './ajout-animal.component.html',
  styleUrls: ['./ajout-animal.component.scss']
})
export class AjoutAnimalComponent implements OnInit {
  animalForm : any = FormGroup;
  responseMessage : any;

  constructor(private router: Router,private formBuilder : FormBuilder,
    private animalService : AnimalService,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.animalForm = this.formBuilder.group({
      nom: [null,[Validators.required]],
      espece: [null,[Validators.required]],
      race: [null,[Validators.required]],
      age: [null,[Validators.required]],
      sexe: [null,[Validators.required]],
      poids: [null,[Validators.required]],
      photo: [null,[Validators.required]],
      info_med: [null,[Validators.required]],
      reg_alim: [null,[Validators.required]],
    });
    this.getProfile();
  }

  

 
  id_prop!: string;

  getProfile(): void {
    // Appelez la méthode de service pour récupérer les informations du profil
    this.profileService.getProfile().subscribe(
      (response) => {
        this.id_prop=response.id; 
        console.log(this.id_prop)
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération du profil : ', error);
      }
    );
  }






  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.animalForm.patchValue({
        photo: file
      });
      this.animalForm.get('photo').updateValueAndValidity();
    }
  }

  ajouteranimal(){

    if (!this.animalForm.value.nom || !this.animalForm.value.espece || !this.animalForm.value.race 
       || !this.animalForm.value.age || !this.animalForm.value.sexe || !this.animalForm.value.poids || !this.animalForm.get('photo').value
       || !this.animalForm.value.info_med || !this.animalForm.value.reg_alim) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs', 'error');
      return; 
    }

    const formData = new FormData();
    formData.append('nom', this.animalForm.value.nom);
    formData.append('espece', this.animalForm.value.espece);
    formData.append('race', this.animalForm.value.race);
    formData.append('age', this.animalForm.value.age);
    formData.append('sexe', this.animalForm.value.sexe); 
    formData.append('poids', this.animalForm.value.poids);
    formData.append('photo', this.animalForm.get('photo').value);
    formData.append('info_med', this.animalForm.value.info_med);
    formData.append('reg_alim', this.animalForm.value.reg_alim); 
    formData.append('id_prop', this.id_prop);  


   
    console.log(formData)
    this.animalService.add(formData).subscribe((response : any)=>{
      this.responseMessage=response?.message;
      Swal.fire('Succès', this.responseMessage, 'success');
      this.router.navigate(['/prop-dashboard/animaux']);
    },(error: { error: { message: any; }; }) => {
      if(error.error?.message)
      {
        this.responseMessage=error.error?.message;
      }
      else
      {
        this.responseMessage=Globalconstants.genericError;
      }
      Swal.fire('Erreur', this.responseMessage, 'error');
    }
    )
  }
}


