import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GardeService } from 'src/app/services/garde.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-postulations',
  templateUrl: './postulations.component.html',
  styleUrls: ['./postulations.component.scss']
})
export class PostulationsComponent implements OnInit {

  constructor(private gardeService: GardeService,
    private route: ActivatedRoute,) { }

      gardeID! : number ;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
       this.gardeID = params["id"];
      this.loadPostulations(this.gardeID);
    });
    
  }


  cards: any[] = [];



loadPostulations(gardeID : number) {
  this.gardeService.getPostulations(gardeID).subscribe((response: any) => {
      
      this.cards = response.map((user: {id:number; nom: any; prenom: any }) => ({
        photo : '../../assets/images/p1.jpg',
        id:user.id,
        nom: user.nom,
        prenom: user.prenom,
        btn: "btn-info" 
      }));
      
    },
    (error) => {
      console.error('Erreur lors du chargement des postulations :', error);
      // Gérer l'erreur si nécessaire
    }
  );
}


accepterCandidature(idGardien: number) {
  console.log(idGardien)
  console.log(this.gardeID)
  Swal.fire({
    title: 'Confirmation',
    text: 'Voulez-vous vraiment accepter la candidature de ce gardien ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#00c292',
    cancelButtonColor: '#f56565',
    confirmButtonText: 'Oui, accepter',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      
      this.gardeService.accepterCandidature(this.gardeID,idGardien).subscribe(
        (response: any) => {
          Swal.fire('Candidature acceptée', response.message, 'success');
          // Recharger les données après suppression
        },
        (error) => {
          Swal.fire('Erreur', 'Erreur lors de l\'acceptation de la candidature', 'error');
        }
      );
    }
  });
}


refuserCandidature(idGardien: number) {
  Swal.fire({
    title: 'Confirmation',
    text: 'Voulez-vous vraiment refuser la candidature de ce gardien ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#00c292',
    cancelButtonColor: '#f56565',
    confirmButtonText: 'Oui, refuser',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      
      this.gardeService.refuserCandidature(this.gardeID,idGardien).subscribe(
        (response: any) => {
          Swal.fire('Candidature refusée', response.message, 'success');
          // Recharger les données après suppression
        },
        (error) => {
          Swal.fire('Erreur', 'Erreur lors du refus de la candidature', 'error');
        }
      );
    }
  });
}

}
