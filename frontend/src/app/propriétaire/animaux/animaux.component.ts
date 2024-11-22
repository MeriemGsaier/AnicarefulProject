import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { AnimalService } from "src/app/services/animal.service";
import { ProfileService } from "src/app/services/profile.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { Globalconstants } from "src/app/shared/globalconstants";
import Swal from "sweetalert2";

@Component({
  selector: "app-animaux",
  templateUrl: "./animaux.component.html",
  styleUrls: ["./animaux.component.scss"],
})
export class AnimauxComponent implements OnInit {
  displayedColumns: string[] = [
    "nom",
    "espece",
    "race",
    "age",
    "sexe",
    "poids",
    "photo",
    "reg_alim",
    "actions",
  ];
  //dataSource = ELEMENT_DATA;
  dataSource: any;
  responseMessage: any;

  constructor(
    private animalService: AnimalService,
    private snackbarService: SnackbarService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getProfile();
    //this.tableData(); //pour éviter que tableData() s'execute avant getProfile()
  }

  id_prop!: number;

  getProfile(): void {
    // Appelez la méthode de service pour récupérer les informations du profil
    this.profileService.getProfile().subscribe(
      (response) => {
        this.id_prop = response.id;
        console.log(this.id_prop);
        this.tableData();
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération du profil : ",
          error
        );
      }
    );
  }

  tableData() {
    this.animalService.get(this.id_prop).subscribe(
      (response: any) => {
        this.dataSource = new MatTableDataSource(response);
      },
      (error) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = Globalconstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          Globalconstants.error
        );
      }
    );
  }

  deleteAnimal(id: number) {
    Swal.fire({
      title: "Confirmation",
      text: "Voulez-vous vraiment supprimer cet animal ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00c292",
      cancelButtonColor: "#f56565",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        this.animalService.delete(id).subscribe(
          (response: any) => {
            Swal.fire("Supprimé", response.message, "success");
            // Recharger les données après suppression
            this.tableData();
          },
          (error) => {
            Swal.fire(
              "Erreur",
              "Erreur lors de la suppression de l'animal",
              "error"
            );
          }
        );
      }
    });
  }
}
