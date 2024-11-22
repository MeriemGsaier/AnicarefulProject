import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GardeService } from 'src/app/services/garde.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Globalconstants } from 'src/app/shared/globalconstants';

@Component({
  selector: 'app-modifie-garde',
  templateUrl: './modifie-garde.component.html',
  styleUrls: ['./modifie-garde.component.scss'],
  providers: [DatePipe]
})
export class ModifieGardeComponent implements OnInit {
  gardeForm : any = FormGroup;
  responseMessage : any;
  gardeId: any;

  constructor(private router: Router,private formBuilder : FormBuilder,
    private gardeService : GardeService, private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.gardeForm = this.formBuilder.group({
      type_garde: [null,[Validators.required]],
      animal: [null,[Validators.required]],
      date_debut: [null,[Validators.required]],
      heure_debut: [null,[Validators.required]],
      date_fin: [null,[Validators.required]],
      heure_fin: [null,[Validators.required]],
      remarque: [null,[Validators.required]],
    });

      this.route.params.subscribe((params: { [x: string]: any; }) => {
        this.gardeId = params['id'];
        // Récupérer les informations de l'animal
        this.gardeService.getById(this.gardeId).subscribe((garde: any) => {
          // Formater les dates récupérées
        const formattedDateDebut = this.datePipe.transform(garde.date_debut, 'yyyy-MM-dd');
        const formattedDateFin = this.datePipe.transform(garde.date_fin, 'yyyy-MM-dd');
          // Pré-remplir les champs du formulaire avec les informations de l'animal
          this.gardeForm.patchValue({
            date_debut : formattedDateDebut,
            date_fin : formattedDateFin,
            heure_debut : garde.heure_deb,
            heure_fin : garde.heure_fin,
            remarque : garde.remarque,
            animal : garde.nom,
            type_garde : garde.libelle,
          });
        });
      });
  }

  modifierGarde(){

    if (!this.gardeForm.value.type_garde || !this.gardeForm.value.animal || !this.gardeForm.value.date_debut 
      || !this.gardeForm.value.heure_debut || !this.gardeForm.value.date_fin || !this.gardeForm.value.heure_fin
      || !this.gardeForm.value.remarque) {
     Swal.fire('Erreur', 'Veuillez remplir tous les champs', 'error');
     return; 
   }

   var formData = this.gardeForm.value;
   var data = {
     date_debut : formData.date_debut,
     date_fin : formData.date_fin,
     heure_deb : formData.heure_debut,
     heure_fin : formData.heure_fin,
     remarque : formData.remarque,
     id_animal : formData.animal,
     type_garde : formData.type_garde,
   }

    //console.log(data)
    //console.log(this.gardeId)
    this.gardeService.update(this.gardeId,data).subscribe((response : any)=>{
      this.responseMessage=response?.message;
      Swal.fire('Succès', this.responseMessage, 'success');
      this.router.navigate(['/prop-dashboard/garde']);
    },(error: { error: { message: any; }; }) => {
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
    )
  }

}
