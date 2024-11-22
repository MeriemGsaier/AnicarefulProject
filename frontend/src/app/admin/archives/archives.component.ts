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
  date : string;
  adresse : string;
  montant : number;
}

const ELEMENT_DATA: Commande[] = [
  { id: 1, client: 'Mahmoud Lassoued',date:'10/20/2012',adresse:'Ouerdia',montant:330},
  { id: 2, client: 'Mahmoud Lassoued',date:'10/20/2012',adresse:'Ouerdia',montant:330},
  { id: 3, client: 'Mahmoud Lassoued',date:'10/20/2012',adresse:'Ouerdia',montant:330},
  { id: 4, client: 'Mahmoud Lassoued',date:'10/20/2012',adresse:'Ouerdia',montant:330},
  { id: 5, client: 'Mahmoud Lassoued',date:'10/20/2012',adresse:'Ouerdia',montant:330},
  { id: 6, client: 'Mahmoud Lassoued',date:'10/20/2012',adresse:'Ouerdia',montant:330},

  
];
*/
@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss']
})
export class ArchivesComponent implements OnInit {
  
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
    this.commandeService.getArchives().subscribe((response : any)=>{
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

applyFilter(event:Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

restaurer(id:number)
{
  Swal.fire({
    title: 'Confirmation',
    text: 'Voulez-vous vraiment restaurer cette commande ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#00c292',
    cancelButtonColor: '#f56565',
    confirmButtonText: 'Oui, restaurer',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      
      this.commandeService.restaurer(id).subscribe(
       
        (response: any) => {
          Swal.fire('Restaurée', response.message, 'success');
          // Recharger les données après suppression
          this.tableData();
        },
        (error) => {
          Swal.fire('Erreur', 'Erreur lors de la restauration de la commande', 'error');
        }
      );
    }
  });
}


supprimerCommande(id:number)
{
  Swal.fire({
    title: 'Confirmation',
    text: 'Voulez-vous vraiment supprimer cette commande ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#00c292',
    cancelButtonColor: '#f56565',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      
      this.commandeService.delete(id).subscribe(
       
        (response: any) => {
          console.log(id)
          Swal.fire('Supprimée', response.message, 'success');
          // Recharger les données après suppression
          this.tableData();
        },
        (error) => {
          console.log(id)
          Swal.fire('Erreur', 'Erreur lors de la suppression de la commande', 'error');
        }
      );
    }
  });
}

}