import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Globalconstants } from 'src/app/shared/globalconstants';
import Swal from 'sweetalert2';
/*
export interface Utilisateur {
  cin: number;
  nom: string;
  prenom : string;
  email : string;
  telephone : number;
  role : string;
}

const ELEMENT_DATA: Utilisateur[] = [
  { cin: 10365203, nom: 'Lassoued',prenom:'Mahmoud',email:'mahmoud.lassoued@ensit.tn',telephone:52717930,role:'Medecin'},
  { cin: 10365203, nom: 'Sidi Mohamed',prenom:'ahmed',email:'ahmed.sidi.mohamed@ensit.tn',telephone:52717930,role:'Propriétaire'},
  { cin: 10365203, nom: 'Gsaier',prenom:'Mariem',email:'mariem.gsaier@ensit.tn',telephone:52717930,role:'Medecin'},
  { cin: 10365203, nom: 'Lassoued',prenom:'Mahmoud',email:'mahmoud.lassoued@ensit.tn',telephone:52717930,role:'Gardien'},
  { cin: 10365203, nom: 'Lassoued',prenom:'Mahmoud',email:'mahmoud.lassoued@ensit.tn',telephone:52717930,role:'Propriétaire'},
  { cin: 10365203, nom: 'Lassoued',prenom:'Mahmoud',email:'mahmoud.lassoued@ensit.tn',telephone:52717930,role:'Medecin'},


  
];
*/
@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {

  displayedColumns: string[] = ['cin','nom','prenom','email','telephone','role','actions'];
  //dataSource = ELEMENT_DATA;
  dataSource:any;
  responseMessage:any;


  constructor(private utilisateurService : UtilisateurService,
    private snackbarService : SnackbarService,
    ) { }

  ngOnInit(): void {
    this.tableData();
  }


  tableData(){ 
    this.utilisateurService.getUsers().subscribe((response : any)=>{
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

changerStatut(statut:any,id:any){
  var data = {
    statut:statut.toString(),
    id:id
  }
  this.utilisateurService.update(data).subscribe((respnse:any)=>{
    this.responseMessage=respnse?.message;
   Swal.fire('Succès', this.responseMessage, 'success');
  },(error:any)=>{
      if(error.error?.message)
      {
        this.responseMessage=error.error?.message;
      }
      else
      {
        this.responseMessage=Globalconstants.genericError;
      }
     Swal.fire('Erreur', this.responseMessage, 'error');
  })

}

}
