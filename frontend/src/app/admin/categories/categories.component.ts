import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Globalconstants } from 'src/app/shared/globalconstants';
import Swal from 'sweetalert2';
/*
export interface Categorie {
  id: number;
  libelle: string;
  photo :string;
}
*/

/*
const ELEMENT_DATA: Categorie[] = [
  { id: 1, libelle: 'Alimentation',photo:'../../assets/images/pet-food.png'},
  { id: 2, libelle: 'Jouets',photo:'../../assets/images/toys.png'},
  { id: 3, libelle: 'Accessoires' ,photo:'../../assets/images/accessories.png'},
  { id: 4, libelle: 'Soins et hygiène',photo:'../../assets/images/healthcare.png'},
  { id: 5, libelle: 'Santé et bien-être',photo:'../../assets/images/sante.png'},
  { id: 6, libelle: 'Education et dressage',photo:'../../assets/images/horse.png'},
];
*/


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})


export class CategoriesComponent implements OnInit {

  displayedColumns: string[] = ['id','libelle','photo','actions'];
  //dataSource = ELEMENT_DATA;
  dataSource:any;
  responseMessage:any;
  constructor(
    private router : Router,
    private categorieService : CategorieService,
    private snackbarService : SnackbarService,
    private dialog : MatDialog,
  ) { }


  ngOnInit(): void {
    this.tableData();
  }

  
  tableData(){ 
    this.categorieService.get().subscribe((response : any)=>{
      this.dataSource=new MatTableDataSource(response);
      console.log(response);
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

  deleteCategorie(id: number) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer cette catégorie ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00c292',
      cancelButtonColor: '#f56565',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.categorieService.delete(id).subscribe(
          (response: any) => {
            Swal.fire('Supprimé', response.message, 'success');
            // Recharger les données après suppression
            this.tableData();
          },
          (error) => {
            Swal.fire('Erreur', 'Erreur lors de la suppression de la catégorie', 'error');
          }
        );
      }
    });
  }
}


