import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CalendarOptions, EventClickArg, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { ActivatedRoute } from "@angular/router";
import { PlanificationService } from "src/app/services/planification.service";
import { RendezVousService } from "src/app/services/rendez-vous.service";
import { ProfileService } from "src/app/services/profile.service";
import { MatDialog } from "@angular/material/dialog";
import { RendezVousDialogComponent } from "../rendez-vous-dialog/rendez-vous-dialog.component";
import Swal from "sweetalert2";
import { UtilisateurService } from "src/app/services/utilisateur.service";
@Component({
  selector: "app-prendre-rv",
  templateUrl: "./prendre-rv.component.html",
  styleUrls: ["./prendre-rv.component.scss"],
})
export class PrendreRvComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: "timeGridWeek",
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    events: [], // Les événements seront ajoutés dynamiquement
    locale: frLocale,
    eventClick: this.handleEventClick.bind(this),
  };
  id_vet!: number;
  id_prop!: string;
  userRendezVous: any[] = [];
  prenom_vet!: string;
  nom_vet!: string;

  constructor(
    private planificationService: PlanificationService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private rendezvousService: RendezVousService,
    private profileService: ProfileService,
    private dialog: MatDialog,
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id_vet = params["id"];
      this.getProfile();
      this.getInfosVet(this.id_vet);
      this.getSousIntervalles();
    });
  }

  getProfile(): void {
    this.profileService.getProfile().subscribe(
      (response) => {
        this.id_prop = response.id;
        this.getUserRendezVous();
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération du profil : ",
          error
        );
      }
    );
  }
  getInfosVet(vetID: number) {
    this.utilisateurService.getVetById(vetID).subscribe(
      (response: any) => {
        console.log("response info", response);
        this.nom_vet = response[0].nom;
        this.prenom_vet = response[0].prenom;
        console.log(this.nom_vet);
      },
      (error) => {
        console.error(
          "Erreur lors du chargement des informations du vétérinaire :",
          error
        );
      }
    );
  }

  getUserRendezVous(): void {
    this.rendezvousService.getUserRendezVous(this.id_prop).subscribe(
      (rendezVous) => {
        this.userRendezVous = rendezVous;
        this.getSousIntervalles();
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des rendez-vous de l'utilisateur : ",
          error
        );
      }
    );
  }

  getSousIntervalles(): void {
    this.planificationService
      .getSousIntervallesByVet(this.id_vet)
      .subscribe((sousIntervalles: any) => {
        const events: EventInput[] = [];
        sousIntervalles.forEach((interval: any) => {
          const isoDate = new Date(interval.date).toISOString();
          const dateWithoutTime = isoDate.split("T")[0];
          const startDateTime = dateWithoutTime + "T" + interval.heure_debut;
          const endDateTime = dateWithoutTime + "T" + interval.heure_fin;
          let color = "#00c292";
          let title = "Disponible";
          let disponible = true;
          let hasAppointment = false;

          // Chercher si l'intervalle a un rendez-vous
          for (let rdv of this.userRendezVous) {
            if (rdv.id_sousIntervalle === interval.id) {
              hasAppointment = true;
              break; // Sortir de la boucle dès qu'un rendez-vous est trouvé
            }
          }

          if (interval.etat === "disponible") {
            color = "#00c292";
            disponible = true;
            title = "Disponible";
          } else if (hasAppointment) {
            color = "#03c9d7"; // Bleu
            title = "Votre rendez-vous";
            disponible = false;
          } else {
            color = "#b5b5b5";
            title = "Indisponible";
            disponible = false;
          }

          events.push({
            title: title,
            start: startDateTime,
            end: endDateTime,
            color: color,
            id: interval.id,
            disponible: disponible,
          });
        });
        this.calendarOptions.events = events;
        this.cdr.detectChanges();
      });
  }



  handleEventClick(clickInfo: EventClickArg): void {
    const eventStartDate: Date = clickInfo.event.start as Date;
    const time: string = eventStartDate.toTimeString().split(" ")[0];
    const data = {
      id_proprietaire: this.id_prop,
      heure: time,
      date: clickInfo.event.start,
      id_intervalle: clickInfo.event.id,
    };

    //déterminer si event est dispo
    const isAvailable = clickInfo.event.extendedProps["disponible"];

    if (!isAvailable) {
      return;
    }

    const datePart = data.date ? new Date(data.date).toLocaleDateString() : "";
    const heurePart = data.heure
      ? data.heure.split(":").slice(0, 2).join(":")
      : "";

    Swal.fire({
      title: "Confirmation de prise de rendez-vous",
      text: `Voulez-vous vraiment prendre un rendez-vous pour la réservation pour le ${datePart} à ${heurePart} ?`,
      showCancelButton: true,
      confirmButtonText: "Prendre rendez-vous",
      confirmButtonColor: "#00c292",
      cancelButtonColor: "#f56565",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        this.rendezvousService.add(data).subscribe(
          (response) => {
            Swal.fire({
              icon: "success",
              text: "Votre rendez-vous est pris avec succès",
              showConfirmButton: false,
              timer: 2000,
            });
            // Rafraîchir les événements après l'ajout du rendez-vous
            this.getSousIntervalles();
            window.location.reload();
          },
          (error) => {
            console.error(
              "Une erreur s'est produite lors de la prise du rendez-vous : ",
              error
            );
          }
        );
      }
    });
  }
}