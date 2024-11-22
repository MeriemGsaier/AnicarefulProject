import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CalendarOptions, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import frLocale from "@fullcalendar/core/locales/fr";
import { PlanificationService } from "src/app/services/planification.service";
import { forkJoin } from "rxjs";
import Swal from "sweetalert2";
import interactionPlugin from "@fullcalendar/interaction";
import { MatTableDataSource } from "@angular/material/table";
import { RendezVousService } from "src/app/services/rendez-vous.service";
import { Globalconstants } from "src/app/shared/globalconstants";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarService } from "src/app/services/snackbar.service";
import { Router } from "@angular/router";
import { ProfileService } from "src/app/services/profile.service";

@Component({
  selector: "app-calendrier",
  templateUrl: "./calendrier.component.html",
  styleUrls: ["./calendrier.component.scss"],
})
export class CalendrierComponent implements OnInit {
  id_user!: number;
  responseMessage?: any;
  calendarOptions: CalendarOptions = {
    initialView: "timeGridWeek",
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    events: [],
    locale: frLocale,
    eventDidMount: this.eventDidMount.bind(this),
  };

  constructor(
    private planificationService: PlanificationService,
    private rendezVousService: RendezVousService,
    private snackbarService: SnackbarService,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }
  getProfile(): void {
    //récupérer les informations du profil
    this.profileService.getProfile().subscribe(
      (response) => {
        this.id_user = response.id;
        console.log("id_user", this.id_user);
        this.fetchIntervallesForCurrentWeek();
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération du profil : ",
          error
        );
      }
    );
  }

  fetchIntervallesForCurrentWeek() {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1); // Lundi de la semaine actuelle

    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 7); // Dimanche de la semaine actuelle

    const dates = this.getDatesInRange(startOfWeek, endOfWeek);
    console.log("dates", dates);

    const fetchRequests = dates.map((date) =>
      this.planificationService.getIntervallesByDate(date, this.id_user)
    );

    // Combine multiple observables into a single observable
    forkJoin(fetchRequests).subscribe((responses: any) => {
      const events: EventInput[] = [];
      console.log("responses", responses);
      // Process each response
      responses.forEach((data: any, index: any) => {
        const date = dates[index];
        // Check if response data exists
        if (data.length > 0) {
          data.forEach((interval: any) => {
            console.log("interval", interval);
            events.push({
              title: "Disponible",
              start: date + "T" + interval.heure_debut,
              end: date + "T" + interval.heure_fin,
              color: "#00c292",
              id: interval.id,
            });
          });
          // Update calendar events
          console.log("events", events);
          this.calendarOptions.events = [...events];
        }
      });
    });
  }
  getDatesInRange(start: Date, end: Date): string[] {
    const dates = [];
    const currentDate = new Date(start);
    while (currentDate <= end) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
  // Suppression d'un intervalle horraire du calendrier
  deleteEvent(event: any) {
    // Extract the id from the event
    const id_intervalle = event.id;
    // Verification si il y a des rdv relatifs à 'intervalle horaire
    this.rendezVousService.getAllByIntervalleHorr(id_intervalle).subscribe(
      (response: any) => {
        console.log("response", response);
        if (response && response.length > 0) {
          // Open a confirmation dialog before deleting the event
          Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Vous avez des rendez-vous prévus pour cet intervalle horraire. Voulez-vous vraiment le supprimer?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00c292",
            cancelButtonColor: "#f56565",
            confirmButtonText: "Oui, supprimer!",
            cancelButtonText: "Annuler",
          }).then((result) => {
            if (result.isConfirmed) {
              // Remove the event from the calendar
              event.remove();
              this.rendezVousService.deleteByInterval(id_intervalle).subscribe(
                () => {
                  // Call the service to delete the interval from the database
                  this.planificationService
                    .deleteIntervalle(id_intervalle)
                    .subscribe(
                      (response: any) => {
                        console.log("Intervalle horaire supprimé:", response);
                        Swal.fire(
                          "Supprimé!",
                          "L'intervalle horaire a été supprimé.",
                          "success"
                        );
                      },
                      (error: any) => {
                        console.error(
                          "Erreur lors de la suppression de l'intervalle horaire:",
                          error
                        );
                        Swal.fire(
                          "Erreur",
                          "Une erreur s'est produite lors de la suppression de l'intervalle horaire.",
                          "error"
                        );
                      }
                    );
                },
                (error) => {
                  console.log(
                    "Erreur lors de la suppression de l'intervalle horaire.",
                    error
                  );
                }
              );
            }
          });
        }
        // s'il n y a pas de rendez-vous relatifs à l'intervalle horaire
        else {
          Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Cette action est irréversible. Voulez-vous vraiment le supprimer?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00c292",
            cancelButtonColor: "#f56565",
            confirmButtonText: "Oui, supprimer!",
          }).then((result) => {
            if (result.isConfirmed) {
              // retirer event du calendrier
              event.remove();
              console.log("id_intervalle", id_intervalle);
              // methode de suppression de l'intervalle
              this.planificationService
                .deleteIntervalle(id_intervalle)
                .subscribe(
                  (response: any) => {
                    console.log("Intervalle horaire supprimé:", response);
                    Swal.fire(
                      "Supprimé!",
                      "L'intervalle horaire a été supprimé.",
                      "success"
                    );
                  },
                  (error: any) => {
                    console.error(
                      "Erreur lors de la suppression de l'intervalle horaire:",
                      error
                    );
                    Swal.fire(
                      "Erreur",
                      "Une erreur s'est produite lors de la suppression de l'intervalle horaire.",
                      "error"
                    );
                  }
                );
            }
          });
        }
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

  eventDidMount(info: any) {
    // Create a button element
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Supprimer";
    deleteButton.style.backgroundColor = "#f56565";
    deleteButton.style.color = "#fff";
    deleteButton.style.border = "2px solid transparent";
    deleteButton.style.borderRadius = "10px";

    deleteButton.addEventListener("click", () => {
      this.deleteEvent(info.event);
    });

    // Append the button to the event element
    info.el.appendChild(deleteButton);

    // Create a button element for modification
    const modifyButton = document.createElement("button");
    modifyButton.innerHTML = "Modifier";
    modifyButton.style.backgroundColor = "#b6f2f6b7";
    modifyButton.style.color = "#02b6c3";
    modifyButton.style.border = "2px solid transparent";
    modifyButton.style.borderRadius = "10px";

    // Add click event listener for modification
    modifyButton.addEventListener("click", () => {
      // Récupérez l'ID de l'intervalle à partir de l'événement
      const intervalId = info.event.id;
      // Naviguez vers la nouvelle route en transmettant l'ID de l'intervalle comme paramètre d'URL
      this.router.navigate(["/dashboardVet/editPlanification", intervalId]);
    });

    // Append the modify button to the event element
    info.el.appendChild(modifyButton);
  }
}
