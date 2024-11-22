import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {

  profileForm: FormGroup = new FormGroup({});
  proprietaireId: string | undefined;

  constructor(private fb: FormBuilder, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      genre: [''],
      adresse_domicile: [''],
      telephone: [''],
      age: ['', Validators.required]
    });

    this.getProfile();
  }

  getProfile(): void {
    this.profileService.getProfile().subscribe(
      (response) => {
        this.profileForm.setValue({
          genre: response.genre || '',
          adresse_domicile: response.adresse_domicile || '',
          telephone: response.telephone || '',
          age: response.age || '' 
        });
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération du profil : ', error);
      }
    );
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.profileService.completeProfile(this.profileForm.value).subscribe(
        (response) => {
          console.log('Profil mis à jour avec succès : ', response);
          Swal.fire('Succès', 'Votre profil a été mis à jour avec succès.', 'success');
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