import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  profileForm: FormGroup = new FormGroup({});
  proprietaireId: string | undefined; // Assurez-vous de bien initialiser cette variable

  constructor(private fb: FormBuilder, private profileService: ProfileService) { }

  ngOnInit(): void {
    // Créez le formulaire réactif avec les champs nécessaires
    this.profileForm = this.fb.group({
      cin: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: ['', Validators.required],
      genre: [''],
      adresse_domicile: [''],
      telephone: [''],
      age: ['', Validators.required]
    });

    // Appelez la méthode pour récupérer les informations du profil
    this.getProfile();
  }

  // Méthode pour récupérer les informations du profil
  getProfile(): void {
    // Appelez la méthode de service pour récupérer les informations du profil
    this.profileService.getProfile().subscribe(
      (response) => {
        // Mettez à jour les valeurs des champs du formulaire avec les données récupérées
        this.profileForm.patchValue({
          cin: response.cin,
          nom: response.nom,
          prenom: response.prenom,
          email: response.email,
          genre: response.genre,
          adresse_domicile: response.adresse_domicile,
          telephone: response.telephone,
          age: response.age
        });
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération du profil : ', error);
      }
    );
  }

  // Méthode pour soumettre le formulaire
  onSubmit(): void {
    if (this.profileForm.valid) {
      // Appelez la méthode de service pour mettre à jour le profil
      this.profileService.updateProfile(this.profileForm.value).subscribe(
        (response) => {
          console.log('Profil mis à jour avec succès : ', response);
          // Réinitialisez le formulaire après la mise à jour réussie
          this.profileForm.reset();
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la mise à jour du profil : ', error);
        }
      );
    } else {
      console.log('Le formulaire n\'est pas valide');
    }
  }
  
}
