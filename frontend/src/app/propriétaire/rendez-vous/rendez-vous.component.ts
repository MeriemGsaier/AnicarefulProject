import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Globalconstants } from 'src/app/shared/globalconstants';


interface rdv {
  id_vet : number;
  image_vet:string;
  nom_vet: string;
  prenom_vet: string;
  specialite: string;
  adresse_cab:string,
  tel_cab: number;
}


@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.scss']
})
export class RendezVousComponent implements OnInit {

  cards: rdv [] = [];
  responseMessage: any;
  //id_user: number = 1;

  constructor(
    private snackbarService: SnackbarService,
    private router: Router,
    private utilisateurService: UtilisateurService
  ) { }

  ngOnInit(): void {
    this.getContent();
  }

  getContent() {
    this.utilisateurService.getVets().subscribe((response: any) => {
        //console.log("response", response);
        
        this.cards = response.map((cardData: any) => ({
          id_vet: cardData.id,
          nom_vet: cardData.nom,
          prenom_vet: cardData.prenom,
          image_vet: "assets/images/vet2.jpg",
          //image_vet: cardData.photo,
          specialite: cardData.specialite,
          adresse_cab: cardData.adresse_cabinet,
          tel_cab: cardData.telephone_cabinet,
        }));
       
      },
      (error) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = Globalconstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          Globalconstants.error
        );
      }
    );
  }

 
  
  /*
    {
      image_vet: "assets/images/vet1.jpg",
      nom_vet:"Ahlem Ben Othman",
      specialite:"Médecine générale	",
      adresse_cab: "Ouedia, Tunis",
      tel: 52717930,
    },
    {
      image_vet: "assets/images/vet2.jpg",
      nom_vet:"Mourad Kacem",
      specialite:"Chirurgie",
      adresse_cab: "Montfleury, Tunis",
      tel: 52717930,
    },
    {
      image_vet: "assets/images/vet3.webp",
      nom_vet:"Jamel Sallemi",
      specialite:"Médecine interne	",
      adresse_cab: "Mohamed IV, Tunis",
      tel: 52717930,
    },
    {
      image_vet: "assets/images/vet1.jpg",
      nom_vet:"Ahlem Ben Othman",
      specialite:"Médecine générale	",
      adresse_cab: "Ouedia, Tunis",
      tel: 52717930,
    },
    {
      image_vet: "assets/images/vet2.jpg",
      nom_vet:"Mourad Kacem",
      specialite:"Chirurgie",
      adresse_cab: "Montfleury, Tunis",
      tel: 52717930,
    },
    {
      image_vet: "assets/images/vet3.webp",
      nom_vet:"Jamel Sallemi",
      specialite:"Médecine interne	",
      adresse_cab: "Mohamed IV, Tunis",
      tel: 52717930,
    },
    {
      image_vet: "assets/images/vet1.jpg",
      nom_vet:"Ahlem Ben Othman",
      specialite:"Médecine générale	",
      adresse_cab: "Ouedia, Tunis",
      tel: 52717930,
    },
    {
      image_vet: "assets/images/vet2.jpg",
      nom_vet:"Mourad Kacem",
      specialite:"Chirurgie",
      adresse_cab: "Montfleury, Tunis",
      tel: 52717930,
    },
    {
      image_vet: "assets/images/vet3.webp",
      nom_vet:"Jamel Sallemi",
      specialite:"Médecine interne	",
      adresse_cab: "Mohamed IV, Tunis",
      tel: 52717930,
    },
    
  ]
  */

}
