import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommandeService } from 'src/app/services/commande.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Globalconstants } from 'src/app/shared/globalconstants';
import Swal from 'sweetalert2';
/*
export interface Commande {
  id: number;
  client: string;
  date : Date;
  adresse : string;
  montant : number;
}

const ELEMENT_DATA: Commande[] = [
  { id: 1, client: 'Mahmoud Lassoued',date:new Date('10/20/2012'),adresse:'Ouerdia',montant:330},
  { id: 2, client: 'Mahmoud Lassoued',date:new Date('10/20/2012'),adresse:'Ouerdia',montant:330},
  { id: 3, client: 'Mahmoud Lassoued',date:new Date('10/20/2012'),adresse:'Ouerdia',montant:330},
  { id: 4, client: 'Mahmoud Lassoued',date:new Date('10/20/2012'),adresse:'Ouerdia',montant:330},
  { id: 5, client: 'Mahmoud Lassoued',date:new Date('10/20/2012'),adresse:'Ouerdia',montant:330},
  { id: 6, client: 'Mahmoud Lassoued',date:new Date('10/20/2012'),adresse:'Ouerdia',montant:330},

  
];
*/
@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {

  //pour la partie filtre date
  datedeb!: Date;
  datefin!: Date;

  displayedColumns: string[] = ['id','client','date','adresse','montant','actions'];
  //dataSource = ELEMENT_DATA;
  dataSource:any;
  responseMessage:any;
  constructor(private router : Router,
    private commandeService : CommandeService,
    private snackbarService : SnackbarService,
    private dialog : MatDialog) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(){ 
    this.commandeService.getNonArchives().subscribe((response : any)=>{
      this.dataSource=new MatTableDataSource(response);
       // Appliquer le filtre si les dates sont spécifiées
       if (this.datedeb && this.datefin) {
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const dateCommande = new Date(data.date);
          return dateCommande >= this.datedeb && dateCommande <= this.datefin;
        };
        this.dataSource.filter = 'filter'; // Appliquer le filtre
      }
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

datePickerInput() {
  // Appeler tableData() pour mettre à jour le tableau avec les nouvelles dates
  this.tableData();
  //console.log(this.datedeb);
  //console.log(this.datefin);
}

applyFilter(event:Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

archiver(id:number)
{
  Swal.fire({
    title: 'Confirmation',
    text: 'Voulez-vous vraiment archiver cette commande ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#00c292',
    cancelButtonColor: '#f56565',
    confirmButtonText: 'Oui, archiver',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      
      this.commandeService.archiver(id).subscribe(
       
        (response: any) => {
          Swal.fire('Archivée', response.message, 'success');
          // Recharger les données après suppression
          this.tableData();
        },
        (error) => {
          Swal.fire('Erreur', 'Erreur lors de l \'archivage du commande', 'error');
        }
      );
    }
  });

}



}
