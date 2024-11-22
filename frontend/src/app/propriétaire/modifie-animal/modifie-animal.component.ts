import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AnimalService } from "src/app/services/animal.service";
import { Globalconstants } from "src/app/shared/globalconstants";
import Swal from "sweetalert2";

@Component({
  selector: "app-modifie-animal",
  templateUrl: "./modifie-animal.component.html",
  styleUrls: ["./modifie-animal.component.scss"],
})
export class ModifieAnimalComponent implements OnInit {
  animalForm: any = FormGroup;
  responseMessage: any;
  animalId: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private animalService: AnimalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.animalForm = this.formBuilder.group({
      nom: [null, [Validators.required]],
      espece: [null, [Validators.required]],
      race: [null, [Validators.required]],
      age: [null, [Validators.required]],
      sexe: [null, [Validators.required]],
      poids: [null, [Validators.required]],
      info_med: [null, [Validators.required]],
      reg_alim: [null, [Validators.required]],
    });

    this.route.params.subscribe((params: { [x: string]: any }) => {
      this.animalId = params["id"];
      // Récupérer les informations de l'animal
      this.animalService.getById(this.animalId).subscribe((animal: any) => {
        // Pré-remplir les champs du formulaire avec les informations de l'animal
        this.animalForm.patchValue({
          nom: animal.nom,
          espece: animal.espece,
          race: animal.race,
          age: animal.age,
          sexe: animal.sexe,
          poids: animal.poids,
          info_med: animal.information_medicale,
          reg_alim: animal.regime_alimentaire,
        });
      });
    });
  }

  modifieranimal() {
    if (
      !this.animalForm.value.nom ||
      !this.animalForm.value.espece ||
      !this.animalForm.value.race ||
      !this.animalForm.value.age ||
      !this.animalForm.value.sexe ||
      !this.animalForm.value.poids ||
      !this.animalForm.value.info_med ||
      !this.animalForm.value.reg_alim
    ) {
      Swal.fire("Erreur", "Veuillez remplir tous les champs", "error");
      return;
    }

    var formData = this.animalForm.value;
    var data = {
      nom: formData.nom,
      espece: formData.espece,
      race: formData.race,
      age: formData.age,
      sexe: formData.sexe,
      poids: formData.poids,
      info_med: formData.info_med,
      reg_alim: formData.reg_alim,
    };
    console.log(data);
    this.animalService.update(this.animalId, data).subscribe(
      (response: any) => {
        this.responseMessage = response?.message;
        Swal.fire("Succès", this.responseMessage, "success");
        this.router.navigate(["/prop-dashboard/animaux"]);
      },
      (error: { error: { message: any } }) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = Globalconstants.genericError;
        }
        Swal.fire("Erreur", this.responseMessage, "error");
      }
    );
  }
}
