import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertsComponent } from "./alerts/alerts.component";
import { FeatherModule } from "angular-feather";
import { allIcons } from "angular-feather/icons";
import { FormsComponent } from "./forms/forms.component";
import { DemoFlexyModule } from "../demo-flexy-module";
import { GridListComponent } from "./grid-list/grid-list.component";
import { MenuComponent } from "./menu/menu.component";
import { TabsComponent } from "./tabs/tabs.component";
import { ExpansionComponent } from "./expansion/expansion.component";
import { ChipsComponent } from "./chips/chips.component";
import { ProgressComponent } from "./progress/progress.component";
import { FormsModule } from "@angular/forms";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { ProgressSnipperComponent } from "./progress-snipper/progress-snipper.component";
import { SnackbarComponent } from "./snackbar/snackbar.component";
import { SliderComponent } from "./slider/slider.component";
import { SlideToggleComponent } from "./slide-toggle/slide-toggle.component";
import { ButtonsComponent } from "./buttons/buttons.component";
import { TooltipsComponent } from "./tooltips/tooltips.component";
import { ListeRdvComponent } from "./veterinaire/rendez-vous/liste-rdv/liste-rdv.component";
import { CalendrierComponent } from "./veterinaire/calendrier/calendrier.component";
import { GardesComponent } from "./gardes/gardes.component";
import { DetailsGardeComponent } from "./gardes/details-garde/details-garde.component";
import { DialogFiltresComponent } from "./gardes/dialog-filtres/dialog-filtres.component";
import { ContentComponent } from "./gardes/content/content.component";
import { ContentDetailsComponent } from "./gardes/content/content-details/content-details.component";
import { AddContentComponent } from "./gardes/content/add-content/add-content.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FullCalendarModule } from "@fullcalendar/angular";
import { AddPlanificationComponent } from "./veterinaire/calendrier/add-planification/add-planification.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { GestionContentComponent } from "./gardes/content/gestion-content/gestion-content.component";
import { ContentVetComponent } from './veterinaire/content-vet/content-vet.component';
import { AddContentvetComponent } from './veterinaire/content-vet/add-contentvet/add-contentvet.component';
import { DetailsContentvetComponent } from './veterinaire/content-vet/details-contentvet/details-contentvet.component';
import { GestionContentvetComponent } from './veterinaire/content-vet/gestion-contentvet/gestion-contentvet.component';
import { ModifierPlanificationComponent } from './veterinaire/calendrier/modifier-planification/modifier-planification.component';
import { SupprimerPlanificationComponent } from './veterinaire/calendrier/supprimer-planification/supprimer-planification.component';
import { SupprimerHorraireComponent } from './veterinaire/calendrier/supprimer-horraire/supprimer-horraire.component';

@NgModule({
  declarations: [
    AlertsComponent,
    FormsComponent,
    GridListComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    ButtonsComponent,
    TooltipsComponent,
    ListeRdvComponent,
    CalendrierComponent,
    GardesComponent,
    DetailsGardeComponent,
    DialogFiltresComponent,
    ContentComponent,
    ContentDetailsComponent,
    AddContentComponent,
    AddPlanificationComponent,
    GestionContentComponent,
    ContentVetComponent,
    AddContentvetComponent,
    DetailsContentvetComponent,
    GestionContentvetComponent,
    ModifierPlanificationComponent,
    SupprimerPlanificationComponent,
    SupprimerHorraireComponent,
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    FormsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    AlertsComponent,
    FormsComponent,
    GridListComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    ButtonsComponent,
  ],
})
export class ComponentsModule {}
