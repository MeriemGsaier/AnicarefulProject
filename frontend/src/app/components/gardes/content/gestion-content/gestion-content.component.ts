import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ContenuInformatifService } from "src/app/services/contenu-informatif.service";
import { ProfileService } from "src/app/services/profile.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { Globalconstants } from "src/app/shared/globalconstants";

@Component({
  selector: "app-gestion-content",
  templateUrl: "./gestion-content.component.html",
  styleUrls: ["./gestion-content.component.scss"],
})
export class GestionContentComponent implements OnInit {
  displayedColumns: string[] = [
    "titre",
    "description",
    "date",
    "photo",
    "etat",
  ];
  //dataSource = ELEMENT_DATA;
  dataSource: any;
  responseMessage: any;

  // a modifier twali id njibouha mel session selon kol user
  id_user!: number;

  constructor(
    private contenuInformatifService: ContenuInformatifService,
    private snackbarService: SnackbarService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    // Appelez la méthode de service pour récupérer les informations du profil
    this.profileService.getProfile().subscribe(
      (response) => {
        this.id_user = response.id;
        console.log(this.id_user);
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
    this.contenuInformatifService.getByuser(this.id_user).subscribe(
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
}
