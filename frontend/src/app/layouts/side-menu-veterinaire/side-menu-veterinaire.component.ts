import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { ProfileService } from 'src/app/services/profile.service';
import Swal from "sweetalert2";

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: "app-side-menu-veterinaire",
  templateUrl: "./side-menu-veterinaire.component.html",
  styleUrls: ["./side-menu-veterinaire.component.scss"],
})
export class SideMenuVeterinaireComponent {
  //private roles: string[] = [];
  //isLoggedIn = false;
  //showAdminBoard = false;
  //showObserverBoard = false;
  //prenom?: string;
  //nom_societe?: string;

  search: boolean = false;
  prenom: string = '';
  photo: string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

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
        this.authService.logout();
      }
    });
  }

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/dashboardVet/rendezVous",
      icon: "recent_actors",
      menu: "Rendez-vous",
    },
    {
      link: "/dashboardVet/planification",
      icon: "date_range",
      menu: "Planification",
    },
    {
      link: "/dashboardVet/content",
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
