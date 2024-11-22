import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-complete-profil',
  templateUrl: './complete-profil.component.html',
  styleUrls: ['./complete-profil.component.scss']
})
export class CompleteProfilComponent implements OnInit {

  profileForm: FormGroup = new FormGroup({});
  proprietaireId: string | undefined;
  role: string | undefined;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      photo: [''],
      genre: [''],
      adresse_domicile: [''],
      telephone: [''],
      age: ['', Validators.required],
      competences: [''], // Ajouté pour le rôle 'gardien'
      experiences: [''], // Ajouté pour le rôle 'gardien'
      specialite: [''], // Ajouté pour le rôle 'veterinaire'
      adresse_cabinet: [''], // Ajouté pour le rôle 'veterinaire'
      telephone_cabinet: [''] // Ajouté pour le rôle 'veterinaire'
    });

    this.getProfile();
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileForm.patchValue({
        photo: file
      });
      const photoControl = this.profileForm.get('photo');
      if (photoControl) {
        photoControl.updateValueAndValidity();
      }
    }
  }

  getProfile(): void {
    this.role = this.authService.getUserRole()?.toString(); // Récupérez le rôle de l'utilisateur
    console.log(this.role);

    if (this.role === 'gardien') {
      this.profileService.getGardienProfile().subscribe(
        (response) => {
          this.profileForm.patchValue({
            genre: response.genre || '',
            adresse_domicile: response.adresse_domicile || '',
            telephone: response.telephone || '',
            age: response.age || '',
            photo: response.photo || '',
            competences: response.competences || '', // Ajouté pour le rôle 'gardien'
            experiences: response.experiences || '' // Ajouté pour le rôle 'gardien'
          });
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération du profil : ', error);
        }
      );
    } else if (this.role === 'veterinaire') {
      this.profileService.getVeterinaireProfile().subscribe(
        (response) => {
          this.profileForm.patchValue({
            genre: response.genre || '',
            adresse_domicile: response.adresse_domicile || '',
            telephone: response.telephone || '',
            age: response.age || '',
            photo: response.photo || '',
            specialite: response.specialite || '', // Ajouté pour le rôle 'veterinaire'
            adresse_cabinet: response.adresse_cabinet || '', // Ajouté pour le rôle 'veterinaire'
            telephone_cabinet: response.telephone_cabinet || '' // Ajouté pour le rôle 'veterinaire'
          });
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération du profil : ', error);
        }
      );
    } else if (this.role === 'proprietaire' || this.role === 'admin') {
      this.profileService.getProprietaireProfile().subscribe(
        (response) => {
          this.profileForm.patchValue({
            genre: response.genre || '',
            adresse_domicile: response.adresse_domicile || '',
            telephone: response.telephone || '',
            age: response.age || '',
            photo: response.photo || ''
          });
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération du profil : ', error);
        }
      );
    } else {
      // Gérer le cas où l'utilisateur n'a pas de rôle valide
      console.error('Rôle utilisateur non valide');
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formData = new FormData();
      formData.append('genre', this.profileForm.value.genre);
      formData.append('adresse_domicile', this.profileForm.value.adresse_domicile);
      formData.append('telephone', this.profileForm.value.telephone);
      formData.append('age', this.profileForm.value.age);
      const photoControl = this.profileForm.get('photo');
      const photoValue = photoControl ? photoControl.value : null;
      formData.append('photo', photoValue);

      // Ajoutez les champs spécifiques au rôle dans formData
      if (this.role === 'gardien') {
        formData.append('competences', this.profileForm.value.competences);
        formData.append('experiences', this.profileForm.value.experiences);
      } else if (this.role === 'veterinaire') {
        formData.append('specialite', this.profileForm.value.specialite);
        formData.append('adresse_cabinet', this.profileForm.value.adresse_cabinet);
        formData.append('telephone_cabinet', this.profileForm.value.telephone_cabinet);
      }

      this.profileService.completeProfile(formData).subscribe(
        (response) => {
          console.log('Profil mis à jour avec succès : ', response);
          Swal.fire('Succès', 'Votre profil a été mis à jour avec succès.', 'success');
          // Rediriger l'utilisateur vers la page d'accueil appropriée selon son rôle
          const homePath = this.authService.getHomePath();
          if (homePath) {
            this.router.navigate([homePath]);
          } else {
            console.error('Impossible de récupérer le chemin de la page d\'accueil');
          }
          this.profileForm.reset();
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la mise à jour du profil : ', error);
          Swal.fire('Erreur', 'Une erreur s\'est produite lors de la mise à jour du profil.', 'error');
        }
      );
    } else {
      console.log('Le formulaire n\'est pas valide');
    }
  }

}