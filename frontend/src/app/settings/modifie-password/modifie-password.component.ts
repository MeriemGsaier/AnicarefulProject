import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service'; // Importez le service AuthService
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifie-password',
  templateUrl: './modifie-password.component.html',
  styleUrls: ['./modifie-password.component.scss']
})
export class ModifiePasswordComponent implements OnInit {

  passwordForm: FormGroup = new FormGroup({});
  profileData: any;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    this.getProfile();
  }

  getProfile(): void {
    this.profileService.getProfile().subscribe(
      (response) => {
        this.profileData = response;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération du profil : ', error);
      }
    );
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      const { oldPassword, newPassword } = this.passwordForm.value;
      const userId = this.profileData.id;

      this.profileService.updatePassword(userId, oldPassword, newPassword).subscribe(
        (response) => {
          this.passwordForm.reset();
          Swal.fire('Succès', 'Mot de passe mis à jour avec succès', 'success');
          const homePath = this.authService.getHomePath(); // Obtenez le chemin de la page d'accueil basé sur le rôle de l'utilisateur
          if (homePath) {
            this.router.navigate([homePath]); // Naviguez vers la page d'accueil appropriée
          } else {
            console.error('Impossible de récupérer le chemin de la page d\'accueil');
          }
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la mise à jour du mot de passe : ', error);
          Swal.fire('Erreur', 'Une erreur s\'est produite lors de la mise à jour du mot de passe', 'error');
        }
      );
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmNewPassword = formGroup.get('confirmNewPassword')?.value;

    if (newPassword !== confirmNewPassword) {
      formGroup.get('confirmNewPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmNewPassword')?.setErrors(null);
    }
  }
}