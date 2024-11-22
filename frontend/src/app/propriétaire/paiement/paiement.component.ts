import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommandeService } from 'src/app/services/commande.service';
import { PanierService } from 'src/app/services/panier.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Globalconstants } from 'src/app/shared/globalconstants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {
  isChecked: boolean = false;
  numerocarte!: number;
  prix_total!: number;

  commandeForm : any = FormGroup;
  responseMessage : any;

  constructor(private panierService : PanierService,
    private router: Router,private formBuilder : FormBuilder,
    private commandeService : CommandeService,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.commandeForm = this.formBuilder.group({
      numerocarte: [null,[Validators.required]],
      adresselivraison: [null,[Validators.required]],
    });
    this.getPrixTotal();
    this.getProfile();
    
  }

  toggleAdresseVisibility(): void {
    this.isChecked = !this.isChecked;
  }

  getPrixTotal()
  {
    this.prix_total = this.panierService.calculPrix();
  }

  id_prop! : string ;

  getProfile(): void {
    // Appelez la méthode de service pour récupérer les informations du profil
    this.profileService.getProfile().subscribe(
      (response) => {
        this.id_prop=response.id; 
        console.log(this.id_prop)
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération du profil : ', error);
      }
    );
  }

  passerCommande(){

    if (!this.commandeForm.value.numerocarte || !this.commandeForm.value.adresselivraison ){
      Swal.fire('Erreur', 'Veuillez remplir tous les champs', 'error');
      return; 
    }

    // const formData = new FormData();
    // formData.append('id_proprietaire', this.id_prop); // bech tetbadel bel session
    // formData.append('date', new Date().toISOString());
    // formData.append('adresse_livraison', this.commandeForm.value.adresselivraison);
    // formData.append('montant', this.prix_total.toString()); 
    // formData.append('etat_archive', "false"); 
    // console.log(formData)

    var formData = this.commandeForm.value;
    var data = {
      id_proprietaire : this.id_prop,
      date : new Date().toISOString(),
      adresse_livraison : this.commandeForm.value.adresselivraison,
      montant : this.prix_total.toString(),
      etat_archive : "false",
    }
    console.log(data)

    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment passer cette commande ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00c292',
      cancelButtonColor: '#f56565',
      confirmButtonText: 'Oui, passer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
    this.commandeService.add(data).subscribe((response : any)=>{
      this.responseMessage=response?.message;
      Swal.fire('Succès', this.responseMessage, 'success');
      this.router.navigate(['/prop-dashboard/produits']);
    },(error) => {
      if(error.error?.message)
      {
        this.responseMessage=error.error?.message;
      }
      else
      {
        this.responseMessage=Globalconstants.genericError;
      }
      Swal.fire('Erreur', this.responseMessage, 'error');
    }
    );
  }
});
  }

}
