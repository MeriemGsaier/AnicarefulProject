import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-info-med',
  templateUrl: './info-med.component.html',
  styleUrls: ['./info-med.component.scss']
})
export class InfoMedComponent implements OnInit {
  /*
  image_vet:string ="assets/images/vet1.jpg";
  nom_vet: string  ="Ahlem Ben Othman";
  email : string  ="ahlem@gmail.com";
  specialite: string ="Médecine générale";
  adresse_cab:string ="Ouedia, Tunis";
  tel_cab: number =52717930;
*/
  constructor(
    private utilisateurService: UtilisateurService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const vetID = params["id"];
      this.recupererVet(vetID);
    });
  }

  cards: any[] = [];

  recupererVet(vetID : number) {
    this.utilisateurService.getVetById(vetID).subscribe((response: any) => {
        
        this.cards = response.map((cardData: any) => ({
          photo : '../../assets/images/vet2.jpg',
          id:cardData.id,
          nom: cardData.nom,
          prenom: cardData.prenom,
          email:cardData.email,
          genre: cardData.genre,
          adresse_domicile: cardData.adresse_domicile,
          telephone: cardData.telephone,
          age:cardData.age,
          specialite: cardData.specialite,
          adresse_cabinet: cardData.adresse_cabinet,
          telephone_cabinet:cardData.telephone_cabinet,
          
        }));
        
      },
      (error) => {
        console.error('Erreur lors du chargement des informations du vétérinaire :', error);
        // Gérer l'erreur si nécessaire
      }
    );
  }
}
