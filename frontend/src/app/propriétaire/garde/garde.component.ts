import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GardeService } from 'src/app/services/garde.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Globalconstants } from 'src/app/shared/globalconstants';
import Swal from 'sweetalert2';
/*
export interface Garde {
  nom: string;
  datedeb: Date;
  heuredeb : string;
  datefin: Date;
  heurefin : string;
  remarque : string;
}

const ELEMENT_DATA: Garde[] = [
  { nom:"Max", datedeb: new Date("2024-02-26"),heuredeb:"09:00",datefin:new Date("2024-02-28"),heurefin:"18:00",remarque:"Garde régulière"},
  { nom:"Misty", datedeb: new Date("2024-02-26"),heuredeb:"09:00",datefin:new Date("2024-02-28"),heurefin:"18:00",remarque:"Garde régulière"},
  { nom:"Caramel", datedeb: new Date("2024-02-26"),heuredeb:"09:00",datefin:new Date("2024-02-28"),heurefin:"18:00",remarque:"Garde régulière"},

  
];
*/

@Component({
  selector: 'app-garde',
  templateUrl: './garde.component.html',
  styleUrls: ['./garde.component.scss']
})
export class GardeComponent implements OnInit {

  
  displayedColumns: string[] = ['nom','datedeb','heuredeb','datefin','heurefin','remarque','actions'];
  //dataSource = ELEMENT_DATA;
  dataSource:any;
  responseMessage:any;

  // a modifier twali id njibouha mel session selon kol user
  id_prop! : number;

  constructor(
    private gardeService : GardeService,
    private snackbarService : SnackbarService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.getProfile();
   //this.tableData();
  }

  getProfile(): void {
    // Appelez la méthode de service pour récupérer les informations du profil
    this.profileService.getProfile().subscribe(
      (response) => {
        this.id_prop=response.id; 
        console.log(this.id_prop)
        this.tableData()
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération du profil : ', error);
      }
    );
  }

  tableData(){ 
    this.gardeService.get(this.id_prop).subscribe((response : any)=>{
      this.dataSource=new MatTableDataSource(response);
    },(error) => {
      if(error.error?.message)
      {
        this.responseMessage=error.error?.message;
      }
      else
      {
        this.responseMessage=Globalconstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,Globalconstants.error);
    }
    )
  
}

deleteGarde(id: number) {
  Swal.fire({
    title: 'Confirmation',
    text: 'Voulez-vous vraiment supprimer cet garde ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#00c292',
    cancelButtonColor: '#f56565',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      
      this.gardeService.delete(id).subscribe(
        (response: any) => {
          Swal.fire('Supprimé', response.message, 'success');
          // Recharger les données après suppression
          this.tableData();
        },
        (error) => {
          Swal.fire('Erreur', 'Erreur lors de la suppression du garde', 'error');
        }
      );
    }
  });
}

}
