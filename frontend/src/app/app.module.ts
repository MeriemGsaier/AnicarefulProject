import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FeatherModule } from "angular-feather";
import { allIcons } from "angular-feather/icons";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FullComponent } from "./layouts/full/full.component";
import { DemoFlexyModule } from "./demo-flexy-module";

// Modules
import { DashboardModule } from "./dashboard/dashboard.module";
import { ComponentsModule } from "./components/components.module";
import { AdminSidebarComponent } from "./admin-sidebar/admin-sidebar.component";
import { CategoriesComponent } from "./admin/categories/categories.component";
import { ProduitsComponent } from "./admin/produits/produits.component";
import { CommandesComponent } from "./admin/commandes/commandes.component";
import { UtilisateursComponent } from "./admin/utilisateurs/utilisateurs.component";
import { ContenuInformatifComponent } from "./admin/contenu-informatif/contenu-informatif.component";
import { AjoutProduitComponent } from "./admin/ajout-produit/ajout-produit.component";
import { AjoutCategorieComponent } from "./admin/ajout-categorie/ajout-categorie.component";
import { DatePipe } from "@angular/common";
import { ArchivesComponent } from "./admin/archives/archives.component";
import { PropSidebarComponent } from "./prop-sidebar/prop-sidebar.component";
import { AnimauxComponent } from "./propriétaire/animaux/animaux.component";
import { GardeComponent } from "./propriétaire/garde/garde.component";
import { RendezVousComponent } from "./propriétaire/rendez-vous/rendez-vous.component";
import { ProduitsPropComponent } from "./propriétaire/produits-prop/produits-prop.component";
import { ContenuInformatifPropComponent } from "./propriétaire/contenu-informatif-prop/contenu-informatif-prop.component";
import { AjoutAnimalComponent } from "./propriétaire/ajout-animal/ajout-animal.component";
import { DemandeGardeComponent } from "./propriétaire/demande-garde/demande-garde.component";
import { AjoutContenuInfoComponent } from "./propriétaire/ajout-contenu-info/ajout-contenu-info.component";
import { PanierComponent } from "./propriétaire/panier/panier.component";
import { PrendreRvComponent } from "./propriétaire/prendre-rv/prendre-rv.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CategorieService } from "./services/categorie.service";
import { SnackbarService } from "./services/snackbar.service";
import { ModifierCategorieComponent } from "./admin/modifier-categorie/modifier-categorie.component";
import { ModifieAnimalComponent } from "./propriétaire/modifie-animal/modifie-animal.component";
import { ModifieGardeComponent } from "./propriétaire/modifie-garde/modifie-garde.component";
import { InfoMedComponent } from "./propriétaire/info-med/info-med.component";
import { SideMenuVeterinaireComponent } from "./layouts/side-menu-veterinaire/side-menu-veterinaire.component";
import { SideMenuGardienComponent } from "./layouts/side-menu-gardien/side-menu-gardien.component";
import { PaiementComponent } from './propriétaire/paiement/paiement.component';
import { ModifierProduitComponent } from './admin/modifier-produit/modifier-produit.component';
import { FullCalendarModule } from "@fullcalendar/angular";
import { BlogComponent } from './propriétaire/blog/blog.component';
import { DetailsContentComponent } from './propriétaire/details-content/details-content.component';
import { PostulationsComponent } from './propriétaire/postulations/postulations.component';
import { InfoGardienComponent } from './propriétaire/info-gardien/info-gardien.component';
import { HomeComponent } from './accueil/home/home.component';
import { LoginComponent } from './accueil/login/login.component';
import { SignupComponent } from './accueil/signup/signup.component';
import { NavbarComponent } from './accueil/shared/navbar/navbar.component';
import { FooterComponent } from './accueil/shared/footer/footer.component';
import { BlogSectionComponent } from './accueil/sections/blog-section/blog-section.component';
import { ContactComponent } from './accueil/sections/contact/contact.component';
import { HeroComponent } from './accueil/sections/hero/hero.component';
import { NumbersComponent } from './accueil/sections/numbers/numbers.component';
import { ProduitComponent } from './accueil/sections/produit/produit.component';
import { ServicesComponent } from './accueil/sections/services/services.component';
import { TestimonialsComponent } from './accueil/sections/testimonials/testimonials.component';
import { WorksComponent } from './accueil/sections/works/works.component';
import { EditComponent } from './propriétaire/edit/edit.component';
import { EditPasswordComponent } from './propriétaire/edit-password/edit-password.component';
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { EditProfileComponent } from './propriétaire/edit-profile/edit-profile.component';
import { CompleteProfileComponent } from './propriétaire/complete-profile/complete-profile.component';
import { ModifieProfilComponent } from './settings/modifie-profil/modifie-profil.component';
import { CompleteProfilComponent } from './settings/complete-profil/complete-profil.component';
import { ModifiePasswordComponent } from './settings/modifie-password/modifie-password.component';
import { HasRoleDirective } from './directive/has-role.directive';
import { RendezVousDialogComponent } from './propriétaire/rendez-vous-dialog/rendez-vous-dialog.component';
import { DescriptionDialogComponent } from "./admin/description-dialog/description-dialog.component";
import { MatBadgeModule } from "@angular/material/badge";


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AdminSidebarComponent,
    CategoriesComponent,
    ProduitsComponent,
    CommandesComponent,
    UtilisateursComponent,
    ContenuInformatifComponent,
    AjoutProduitComponent,
    AjoutCategorieComponent,
    ArchivesComponent,
    PropSidebarComponent,
    AnimauxComponent,
    GardeComponent,
    RendezVousComponent,
    ProduitsPropComponent,
    ContenuInformatifPropComponent,
    AjoutAnimalComponent,
    DemandeGardeComponent,
    AjoutContenuInfoComponent,
    PanierComponent,
    PrendreRvComponent,
    ModifierCategorieComponent,
    ModifieAnimalComponent,
    ModifieGardeComponent,
    InfoMedComponent,
    SideMenuVeterinaireComponent,
    SideMenuGardienComponent,
    PaiementComponent,
    ModifierProduitComponent,
    BlogComponent,
    DetailsContentComponent,
    PostulationsComponent,
    InfoGardienComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    FooterComponent,
    BlogSectionComponent,
    ContactComponent,
    HeroComponent,
    NumbersComponent,
    ProduitComponent,
    ServicesComponent,
    TestimonialsComponent,
    WorksComponent,
    EditComponent,
    EditPasswordComponent,
    EditProfileComponent,
    CompleteProfileComponent,
    ModifieProfilComponent,
    CompleteProfilComponent,
    ModifiePasswordComponent,
    HasRoleDirective,
    RendezVousDialogComponent,
    DescriptionDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    MatBadgeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Indique qu'il peut y avoir plusieurs interceptors
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
