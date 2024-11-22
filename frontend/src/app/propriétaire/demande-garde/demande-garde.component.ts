import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalService } from 'src/app/services/animal.service';
import { GardeService } from 'src/app/services/garde.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Globalconstants } from 'src/app/shared/globalconstants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-garde',
  templateUrl: './demande-garde.component.html',
  styleUrls: ['./demande-garde.component.scss']
})
export class DemandeGardeComponent implements OnInit {
  gardeForm : any = FormGroup;
  responseMessage : any;
  animals: any[] = [];
  typeGarde : any [] = [];

  constructor(private router: Router,private formBuilder : FormBuilder,
    private gardeService : GardeService,
    private animalService : AnimalService,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.gardeForm = this.formBuilder.group({
      type_garde: [null,[Validators.required]],
      animal: [null,[Validators.required]],
      date_debut: [null,[Validators.required]],
      heure_debut: [null,[Validators.required]],
      date_fin: [null,[Validators.required]],
      heure_fin: [null,[Validators.required]],
      remarque: [null,[Validators.required]],
    });
    this.getProfile();
    this.getTypeGarde();
  }

   
   id_prop! : number;
  

   getTypeGarde() {
    this.gardeService.getTypeGarde().subscribe(
      (data: any) => {
        this.typeGarde = data; 
      },
      (error) => {
        console.log('Erreur lors de la récupération des gardes :', error);
      }
    );
  }

  
   getanimals() {
  this.animalService.get(this.id_prop).subscribe(
    (data: any) => {
      this.animals = data; 
    },
    (error) => {
      console.log('Erreur lors de la récupération des animaux :', error);
    }
  );
}

getProfile(): void {
  // Appelez la méthode de service pour récupérer les informations du profil
  this.profileService.getProfile().subscribe(
    (response) => {
      this.id_prop=response.id; 
      this.getanimals();
      console.log(this.id_prop)
    },
    (error) => {
      console.error('Une erreur s\'est produite lors de la récupération du profil : ', error);
    }
  );
}




  demanderGarde(){

    if (!this.gardeForm.value.type_garde || !this.gardeForm.value.animal || !this.gardeForm.value.date_debut 
       || !this.gardeForm.value.heure_debut || !this.gardeForm.value.date_fin || !this.gardeForm.value.heure_fin
       || !this.gardeForm.value.remarque) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs', 'error');
      return; 
    }

    
    var formData = this.gardeForm.value;
    var data = {
      date_debut : formData.date_debut,
      date_fin : formData.date_fin,
      heure_deb : formData.heure_debut,
      heure_fin : formData.heure_fin,
      remarque : formData.remarque,
      id_animal : formData.animal,
      id_proprietaire : this.id_prop,
      type_garde : formData.type_garde,
    }
    console.log(data)
    this.gardeService.add(data).subscribe((response : any)=>{
      this.responseMessage=response?.message;
      Swal.fire('Succès', this.responseMessage, 'success');
      this.router.navigate(['/prop-dashboard/garde']);
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
