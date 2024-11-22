import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PlanificationService } from "src/app/services/planification.service";
import { ProfileService } from "src/app/services/profile.service";
import { Globalconstants } from "src/app/shared/globalconstants";
import Swal from "sweetalert2";

// Modèle de données pour les intervalles
interface Interval {
  heure_debut: string;
  heure_fin: string;
}

@Component({
  selector: "app-add-planification",
  templateUrl: "./add-planification.component.html",
  styleUrls: ["./add-planification.component.scss"],
})
export class AddPlanificationComponent implements OnInit {
  planificationForm: any = FormGroup;
  responseMessage: any;
  id_user!: string;
  planification: any = {
    date: "",
    intervals: [{ heure_debut: "", heure_fin: "" }],
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private planificationService: PlanificationService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.planificationForm = this.formBuilder.group({
      date: [null, [Validators.required]],
      intervals: this.formBuilder.array([]),
    });
    this.getProfile();
  }
  getProfile(): void {
    // Appelez la méthode de service pour récupérer les informations du profil
    this.profileService.getProfile().subscribe(
      (response) => {
        this.id_user = response.id;
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération du profil : ",
          error
        );
      }
    );
  }

  // Ajouter un intervalle supplémentaire
  addInterval() {
    this.planification.intervals.push({ heure_debut: "", heure_fin: "" });
  }

  // Supprimer un intervalle supplémentaire
  removeInterval(index: number) {
    this.planification.intervals.splice(index, 1);
  }

  // Ajout d'une planification
  ajouterPlanification() {
    if (!this.planification.date || !this.planification.intervals.length) {
      Swal.fire("Erreur", "Veuillez remplir tous les champs", "error");
      return;
    }

    const localDate = new Date(this.planification.date);
    const utcDate = new Date(
      Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate(),
        0,
        0,
        0
      )
    );
    const utcDateString = utcDate.toISOString().split("T")[0];

    const data = {
      date: utcDateString,
      intervals: this.planification.intervals,
      id_veterinaire: this.id_user,
    };

    console.log(data);
    // Envoyer les données au backend
    this.planificationService.addPlanification(data).subscribe(
      (response: any) => {
        this.responseMessage = response?.message;
        Swal.fire("Succès", this.responseMessage, "success");
        this.router.navigate(["/dashboardVet/planification"]);
      },
      (error: any) => {
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
