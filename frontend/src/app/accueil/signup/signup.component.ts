import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  hidePassword: boolean = true;
  redirectUrl: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private formBuilder: FormBuilder
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,3}')]],
      motDePasse: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d!@#$%^&*()]+$')]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cin: ['', Validators.required],
      role: ['proprietaire']
    });
  }

  ngOnInit(): void {
    this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || null;
    const roleFromService = this.roleService.getRole();
    this.signupForm.patchValue({ role: roleFromService || 'proprietaire' });
  }

  signup() {
    if (this.signupForm.invalid) {
      Swal.fire('Champs invalides', 'Veuillez vérifier les champs invalides.', 'warning');
      return;
    }

    this.authService.signup(this.signupForm.value).subscribe(
      (response) => {
        this.authService.storeToken(response.token);
        const role = this.signupForm.get('role')?.value || 'proprietaire'; // Récupérer le rôle
        const redirectUrl = this.getDashboardRoute(role); // Obtenir la route du tableau de bord correspondant au rôle
        this.router.navigate([redirectUrl]);
      },
      (error) => {
        console.error('Erreur lors de l\'inscription :', error);
        if (error.status === 409) {
          Swal.fire('Email déjà utilisé', 'L\'adresse email que vous avez fournie est déjà associée à un compte.', 'warning');
        } else {
          Swal.fire('Erreur', 'Erreur lors de l\'inscription. Veuillez réessayer.', 'error');
        }
      }
    );
  }

  // Fonction pour obtenir la route du tableau de bord en fonction du rôle
  private getDashboardRoute(role: string): string {
    switch(role) {
      case 'proprietaire':
        return '/prop-dashboard';
      case 'gardien':
        return '/dashboardGard';
      case 'veterinaire':
        return '/dashboardVet';
      case 'admin':
        return '/admin-dashboard';
      default:
        return '/accueil';
    }
  }
}
