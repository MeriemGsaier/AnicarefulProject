import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { ProfileService } from '../services/profile.service';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {

  search: boolean = false;
  prenom: string = '';
  photo: string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private authService: AuthService, private profileService: ProfileService) { }

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
      link: "/admin-dashboard/categories",
      icon: "sidebar",
      menu: "Categories",
    },
    {
      link: "/admin-dashboard/produits",
      icon: "server",
      menu: "Produits",
    },
    {
      link: "/admin-dashboard/commandes",
      icon: "shopping-cart",
      menu: "Commandes",
    },
    {
      link: "/admin-dashboard/utilisateurs",
      icon: "users",
      menu: "Utilisateurs",
    },
    {
      link: "/admin-dashboard/contenu-informatif",
      icon: "file-text",
      menu: "Contenu informatif",
    },
   
  ]

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
