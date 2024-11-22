import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Globalconstants } from 'src/app/shared/globalconstants';
import Swal from 'sweetalert2';
/*
export interface Produit {
  id: number;
  libelle: string;
  prix : number;
  description : string;
  categorie : string;
  photo : string;
}
*/
/*
const ELEMENT_DATA: Produit[] = [
  { id: 1, libelle: 'AMITY ECO LINE POUR CHIOT 4 KG',prix:46,description:'Croquette Chien',categorie:'Alimentation',photo:'../../assets/images/prod1.png'},
  { id: 2, libelle: 'OWNAT CHIEN ENERGY 4 KG',prix:64,description:'Croquette Chien',categorie:'Alimentation',photo:'../../assets/images/prod2.webp'},
  { id: 3, libelle: 'Lara Junior 2 Kg',prix:39,description:'Croquette Chat',categorie:'Alimentation',photo:'../../assets/images/prod3.png'},
  { id: 4, libelle: 'JOSERA JosiCat Volaille Croquante 650',prix:18,description:'Croquette Chat',categorie:'Alimentation',photo:'../../assets/images/prod4.jpg'},
  { id: 5, libelle: 'AMITY ECO LINE POUR CHIOT 4 KG',prix:46,description:'Croquette Chien',categorie:'Alimentation',photo:'../../assets/images/prod1.png'},
  { id: 6, libelle: 'OWNAT CHIEN ENERGY 4 KG',prix:64,description:'Croquette Chien',categorie:'Alimentation',photo:'../../assets/images/prod2.webp'},
  { id: 7, libelle: 'Lara Junior 2 Kg',prix:39,description:'Croquette Chat',categorie:'Alimentation',photo:'../../assets/images/prod3.png'},
  
];
*/

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit {

  displayedColumns: string[] = ['id','libelle','prix','description','nomcategorie','photo','actions'];
  //dataSource = ELEMENT_DATA;
  dataSource:any;
  responseMessage:any;
  constructor(private router : Router,
    private produitService : ProduitService,
    private snackbarService : SnackbarService,
    private dialog : MatDialog,) { }

  ngOnInit(): void {
    this.tableData();
  }

   
  tableData(){ 
    this.produitService.get().subscribe((response : any)=>{
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

  deleteProduit(id: number) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer ce produit ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00c292',
      cancelButtonColor: '#f56565',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.produitService.delete(id).subscribe(
          (response: any) => {
            Swal.fire('Supprimé', response.message, 'success');
            // Recharger les données après suppression
            this.tableData();
          },
          (error) => {
            Swal.fire('Erreur', 'Erreur lors de la suppression du produit', 'error');
          }
        );
      }
    });
  }




}
