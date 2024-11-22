import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ContenuInformatifService } from "src/app/services/contenu-informatif.service";
import { ProfileService } from "src/app/services/profile.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { Globalconstants } from "src/app/shared/globalconstants";
/*
export interface Contenu {
  titre : string;
  date : string;
  description : string;
  photo : string;
  badge : string;
  etat : string;
}

const ELEMENT_DATA: Contenu[] = [
  { titre:'Guides d\'alimentation',date:'23/02/2024',description:'Conseils sur une alimentation équilibrée pour chaque type d\'animal de compagnie',photo:'../../assets/images/alimentation.jpeg', badge: 'badge-primary',etat:'En attente'},
  { titre:'Soins et hygiène',date:'23/02/2024',description:'Techniques de toilettage et de bain appropriées pour différents types de pelage',photo:'../../assets/images/soins.jpg', badge: 'badge-success',etat:'Approuvé'},
  { titre:'Santé et bien-être',date:'23/02/2024',description:'Articles sur les signes de maladie chez les animaux et quand consulter un vétérinaire',photo:'../../assets/images/santé.jpg', badge: 'badge-primary',etat:'En attente'},
  {titre:'Comportement animal',date:'23/02/2024',description:'Informations sur le comportement naturel des animaux',photo:'../../assets/images/comportement.jpg', badge: 'badge-success',etat:'Approuvé'},
  {titre:'Enrichissement et divertissement',date:'23/02/2024',description:'Idées d\'activités et de jeux pour divertir et stimuler les animaux à la maison',photo:'../../assets/images/enrichissement.jpg', badge: 'badge-primary',etat:'En attente'},
  { titre:'Voyages et activités en plein air',date:'23/02/2024',description:'Conseils pour voyager  avec des animaux ',photo:'../../assets/images/alimentation.jpeg', badge: 'badge-success',etat:'Approuvé'},

  
];
*/
@Component({
  selector: "app-contenu-informatif-prop",
  templateUrl: "./contenu-informatif-prop.component.html",
  styleUrls: ["./contenu-informatif-prop.component.scss"],
})
export class ContenuInformatifPropComponent implements OnInit {
  displayedColumns: string[] = [
    "titre",
    "description",
    "date",
    "photo",
    "etat",
  ];
  //dataSource = ELEMENT_DATA;
  dataSource: any;
  responseMessage: any;



  constructor(
    private contenuInformatifService: ContenuInformatifService,
    private snackbarService: SnackbarService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getProfile();
    //this.tableData();
  }

  id_user!: number;

  getProfile(): void {
    // Appelez la méthode de service pour récupérer les informations du profil
    this.profileService.getProfile().subscribe(
      (response) => {
        this.id_user=response.id; 
        console.log(this.id_user)
        this.tableData()
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération du profil : ', error);
      }
    );
  }

  tableData() {
    this.contenuInformatifService.getByuser(this.id_user).subscribe(
      (response: any) => {
        this.dataSource = new MatTableDataSource(response);
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
}
