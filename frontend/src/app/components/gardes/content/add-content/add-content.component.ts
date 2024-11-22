import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ContenuInformatifService } from "src/app/services/contenu-informatif.service";
import { ProfileService } from "src/app/services/profile.service";
import { Globalconstants } from "src/app/shared/globalconstants";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-content",
  templateUrl: "./add-content.component.html",
  styleUrls: ["./add-content.component.scss"],
})
export class AddContentComponent implements OnInit {
  contentForm: any = FormGroup;
  responseMessage: any;
  id_user!: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private contenuInformatifService: ContenuInformatifService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.contentForm = this.formBuilder.group({
      titre: [null, [Validators.required]],
      photo: [null, [Validators.required]],
      description: [null, [Validators.required]],
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

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.contentForm.patchValue({
        photo: file,
      });
      this.contentForm.get("photo").updateValueAndValidity();
    }
  }

  ajouterContent() {
    if (
      !this.contentForm.value.titre ||
      !this.contentForm.get("photo").value ||
      !this.contentForm.value.description
    ) {
      Swal.fire("Erreur", "Veuillez remplir tous les champs", "error");
      return;
    }

    const formData = new FormData();
    formData.append("titre", this.contentForm.value.titre);
    formData.append("date", new Date().toISOString());
    formData.append("description", this.contentForm.value.description);
    formData.append("photo", this.contentForm.get("photo").value);
    formData.append("etat", "en attente");
    formData.append("id_utilisateur", this.id_user); /// bech tetbadel bel id_user bel session

    //console.log(formData)
    this.contenuInformatifService.add(formData).subscribe(
      (response: any) => {
        this.responseMessage = response?.message;
        Swal.fire("Succès", this.responseMessage, "success");
        this.router.navigate(["/dashboardGard/gestionContent"]);
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
