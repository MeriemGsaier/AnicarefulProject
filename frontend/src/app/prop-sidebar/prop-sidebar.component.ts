import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-prop-sidebar',
  templateUrl: './prop-sidebar.component.html',
  styleUrls: ['./prop-sidebar.component.scss']
})
export class PropSidebarComponent {

  search: boolean = false;
  prenom: string = '';
  photo: string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(private breakpointObserver: BreakpointObserver,private router: Router, private authService: AuthService, private profileService: ProfileService) { }

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
      link: "/prop-dashboard/produits",
      icon: "server",
      menu: "Produits animaux",
    },
    {
      link: "/prop-dashboard/animaux",
      icon: "github",
      menu: "Mes animaux",
    },
    {
      link: "/prop-dashboard/garde",
      icon: "eye",
      menu: "Garde",
    },
    {
      link: "/prop-dashboard/rendez-vous",
      icon: "calendar",
      menu: "Rendez-vous",
    },
    {
      link: "/prop-dashboard/blog",
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
