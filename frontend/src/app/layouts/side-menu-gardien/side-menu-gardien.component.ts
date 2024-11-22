import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import { ProfileService } from "src/app/services/profile.service";
interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}
@Component({
  selector: "app-side-menu-gardien",
  templateUrl: "./side-menu-gardien.component.html",
  styleUrls: ["./side-menu-gardien.component.scss"],
})
export class SideMenuGardienComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  search: boolean = false;
  prenom: string = '';
  photo: string = '';

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private authService: AuthService, private profileService: ProfileService) {}

  deconnexion(): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00c292',
      cancelButtonColor: '#f56565',
      confirmButtonText: 'Oui, déconnexion',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.clearToken();
        this.router.navigate(['/accueil']);
      }
    });
  }
  
  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/dashboardGard/gardes",
      icon: "recent_actors",
      menu: "Gardes",
    },
    {
      link: "/dashboardGard/content",
      icon: "library_books",
      menu: "Contenu Informatif",
    },
  ];
  
  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.profileService.getProfile().subscribe(
      (response) => {
        this.prenom = response.prenom;
        this.photo = response.photo;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération du prénom : ', error);
      }
    );
  }
  
}
