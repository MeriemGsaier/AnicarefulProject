import { Component, OnInit, SimpleChanges } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { PlanificationService } from "src/app/services/planification.service";
import { Globalconstants } from "src/app/shared/globalconstants";
import Swal from "sweetalert2";

@Component({
  selector: "app-modifier-planification",
  templateUrl: "./modifier-planification.component.html",
  styleUrls: ["./modifier-planification.component.scss"],
})
export class ModifierPlanificationComponent implements OnInit {
  planificationForm: any = FormGroup;
  responseMessage: any;
  id_veterinaire: string = "5"; // Remplacer par la logique pour récupérer l'id du vétérinaire
  intervalId: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private planificationService: PlanificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.planificationForm = this.formBuilder.group({
      date: [null, [Validators.required]],
      heure_debut: [null, [Validators.required]],
      heure_fin: [null, [Validators.required]],
    });

    this.route.params.subscribe((params: { [x: string]: any }) => {
      this.intervalId = params["id"];
      // Récupérer les informations de l'animal
      this.planificationService
        .getIntervalleById(this.intervalId)
        .subscribe((planification: any) => {
          // Pré-remplir les champs du formulaire avec les informations de la planification
          // Convertir la date en objet Date pour qu'elle soit correctement affichée dans l'input
          const formattedDate = new Date(planification.date);
          this.planificationForm.patchValue({
            date: formattedDate,
            heure_debut: planification.heure_debut,
            heure_fin: planification.heure_fin,
          });
          console.log("planification", planification);
          console.log("planificationForm", this.planificationForm.value);
        });
    });
  }

  modifierPlanification() {
    if (
      !this.planificationForm.value.date ||
      !this.planificationForm.value.heure_debut ||
      !this.planificationForm.value.heure_fin
    ) {
      Swal.fire("Erreur", "Veuillez remplir tous les champs", "error");
      return;
    }
    const data = {
      date: this.planificationForm.value.date.toISOString().split("T")[0],
      heure_debut: this.planificationForm.value.heure_debut,
      heure_fin: this.planificationForm.value.heure_fin,
    };

    this.planificationService
      .updatePlanification(this.intervalId, data)
      .subscribe(
        (response: any) => {
          this.responseMessage = response?.message;
          Swal.fire("Succès", this.responseMessage, "success");
          this.router.navigate(["/dashboardVet/planification"]);
        },
        (error: any) => {
          this.responseMessage =
            error?.error?.message || Globalconstants.genericError;
          Swal.fire("Erreur", this.responseMessage, "error");
        }
      );
  }
}
