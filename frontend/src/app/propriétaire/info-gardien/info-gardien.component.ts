import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-info-gardien',
  templateUrl: './info-gardien.component.html',
  styleUrls: ['./info-gardien.component.scss']
})
export class InfoGardienComponent implements OnInit {

  constructor(
    private utilisateurService: UtilisateurService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const gardienID = params["id"];
      this.recupererGardien(gardienID);
    });
}
      cards: any[] = [];

      recupererGardien(gardienID : number) {
        this.utilisateurService.getGardienById(gardienID).subscribe((response: any) => {
            
            this.cards = response.map((user: {id:number; nom: any; prenom: any;email:any;genre:any;adresse_domicile:any;telephone:any;photo:any;age:any;competences:any;experiences:any; }) => ({
              photo : '../../assets/images/p1.jpg',
              id:user.id,
              nom: user.nom,
              prenom: user.prenom,
              email:user.email,
              genre: user.genre,
              adresse_domicile: user.adresse_domicile,
              telephone: user.telephone,
              age:user.age,
              competences: user.competences,
              experiences: user.experiences,
              
            }));
            
          },
          (error) => {
            console.error('Erreur lors du chargement des informations du gardien :', error);
            // Gérer l'erreur si nécessaire
          }
        );
      }
}
