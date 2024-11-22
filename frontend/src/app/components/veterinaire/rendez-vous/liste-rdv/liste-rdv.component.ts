import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Time, registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { Subject } from "rxjs";
import { RendezVousService } from "src/app/services/rendez-vous.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { Globalconstants } from "src/app/shared/globalconstants";
import Swal from "sweetalert2";
import { ProfileService } from "src/app/services/profile.service";
registerLocaleData(localeFr, "fr");

export interface PeriodicElement {
  cin: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: number;
  date: string; //date
  heure: string; //
}

@Component({
  selector: "app-liste-rdv",
  templateUrl: "./liste-rdv.component.html",
  styleUrls: ["./liste-rdv.component.scss"],
})
export class ListeRdvComponent implements OnInit {
  displayedColumns: string[] = [
    "cin",
    "nom",
    "prenom",
    "email",
    "telephone",
    "date",
    "heure",
    "actions",
  ];
  dataSource: any;
  responseMessage: any;
  id_user!: number;
  constructor(
    private rendezVousService: RendezVousService,
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
    this.rendezVousService.getAllByUser(this.id_user).subscribe(
      (response: any) => {
        // // Convertir les dates en tenant compte du fuseau horaire local
        // response.forEach((item: any) => {
        //   // console.log("itemDate", item);
        //   item.date = new Date(item.date);
        //   console.log("itemDate", item.date);
        // });
        this.dataSource = new MatTableDataSource(response);
        console.log(response);
      },
      (error) => {
        // Gestion des erreurs...
      }
    );
  }

  annulerRdv(id1: number, id2: number) {
    Swal.fire({
      title: "Confirmation",
      text: "Voulez-vous vraiment annuler ce rendez-vous ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00c292",
      cancelButtonColor: "#f56565",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        this.rendezVousService.annulerRdv(id1, id2).subscribe(
          (response: any) => {
            Swal.fire("Supprimé", response.message, "success");
            // Recharger les données après suppression
            this.tableData();
          },
          (error) => {
            Swal.fire(
              "Erreur",
              "Erreur lors de l'annulation du rendez-vous",
              "error"
            );
          }
        );
      }
    });
  }

  filterData($event: any) {
    $event.target.value.trim();
    $event.target.value.toLowerCase();
    this.dataSource.filter = $event.target.value;
  }
}
