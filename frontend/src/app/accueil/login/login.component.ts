import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  hidePassword: boolean = true;
  redirectUrl: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.redirectUrl = this.route.snapshot.queryParams["redirectUrl"] || null;
  }

  login() {
    if (!this.email || !this.password) {
      Swal.fire(
        "Champs obligatoires",
        "Veuillez remplir tous les champs obligatoires.",
        "warning"
      );
      return;
    }

    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe(
        (response) => {
          localStorage.setItem("authToken", response.token);
          const redirectUrl = this.redirectUrl
            ? this.redirectUrl
            : this.getDashboardRoute(response.role);
          this.router.navigate([redirectUrl]);
        },
        (error) => {
          console.error("Erreur lors de la connexion :", error);
          if (error.status === 404) {
            Swal.fire({
              title: "Email non trouvé",
              text: "L'adresse email que vous avez fournie n'est associée à aucun compte. Voulez-vous vous inscrire ?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Oui, m'inscrire",
              cancelButtonText: "Non, annuler",
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(["/accueil/signup"]);
              }
            });
          } else if (
            error.status === 401 &&
            error.error.message ===
              "Votre compte est inactif. Veuillez contacter un administrateur."
          ) {
            Swal.fire(
              "Compte inactif",
              "Votre compte est inactif. Veuillez contacter l'administrateur.",
              "error"
            );
          } else {
            Swal.fire(
              "Erreur",
              "Erreur lors de la connexion. Veuillez réessayer.",
              "error"
            );
          }
        }
      );
  }

  private getDashboardRoute(role: string): string {
    switch (role) {
      case "proprietaire":
        return "/prop-dashboard";
      case "gardien":
        return "/dashboardGard";
      case "veterinaire":
        return "/dashboardVet";
      case "admin":
        return "/admin-dashboard";
      default:
        return "/accueil";
    }
  }
}
