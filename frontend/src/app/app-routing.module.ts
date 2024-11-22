import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlertsComponent } from "./components/alerts/alerts.component";
import { ButtonsComponent } from "./components/buttons/buttons.component";
import { ChipsComponent } from "./components/chips/chips.component";
import { ExpansionComponent } from "./components/expansion/expansion.component";
import { FormsComponent } from "./components/forms/forms.component";
import { GridListComponent } from "./components/grid-list/grid-list.component";
import { MenuComponent } from "./components/menu/menu.component";
import { ProgressSnipperComponent } from "./components/progress-snipper/progress-snipper.component";
import { ProgressComponent } from "./components/progress/progress.component";
import { SlideToggleComponent } from "./components/slide-toggle/slide-toggle.component";
import { SliderComponent } from "./components/slider/slider.component";
import { SnackbarComponent } from "./components/snackbar/snackbar.component";
import { TabsComponent } from "./components/tabs/tabs.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { TooltipsComponent } from "./components/tooltips/tooltips.component";
import { ProductComponent } from "./dashboard/dashboard-components/product/product.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FullComponent } from "./layouts/full/full.component";
import { AdminSidebarComponent } from "./admin-sidebar/admin-sidebar.component";
import { CategoriesComponent } from "./admin/categories/categories.component";
import { ProduitsComponent } from "./admin/produits/produits.component";
import { CommandesComponent } from "./admin/commandes/commandes.component";
import { UtilisateursComponent } from "./admin/utilisateurs/utilisateurs.component";
import { ContenuInformatifComponent } from "./admin/contenu-informatif/contenu-informatif.component";
import { AjoutCategorieComponent } from "./admin/ajout-categorie/ajout-categorie.component";
import { AjoutProduitComponent } from "./admin/ajout-produit/ajout-produit.component";
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
import { ModifierCategorieComponent } from "./admin/modifier-categorie/modifier-categorie.component";
import { ModifieAnimalComponent } from "./propriétaire/modifie-animal/modifie-animal.component";
import { ModifieGardeComponent } from "./propriétaire/modifie-garde/modifie-garde.component";
import { InfoMedComponent } from "./propriétaire/info-med/info-med.component";
import { SideMenuVeterinaireComponent } from "./layouts/side-menu-veterinaire/side-menu-veterinaire.component";
import { SideMenuGardienComponent } from "./layouts/side-menu-gardien/side-menu-gardien.component";
import { AddContentComponent } from "./components/gardes/content/add-content/add-content.component";
import { ContentDetailsComponent } from "./components/gardes/content/content-details/content-details.component";
import { ContentComponent } from "./components/gardes/content/content.component";
import { DetailsGardeComponent } from "./components/gardes/details-garde/details-garde.component";
import { GardesComponent } from "./components/gardes/gardes.component";
import { CalendrierComponent } from "./components/veterinaire/calendrier/calendrier.component";
import { ListeRdvComponent } from "./components/veterinaire/rendez-vous/liste-rdv/liste-rdv.component";
import { PaiementComponent } from "./propriétaire/paiement/paiement.component";
import { ModifierProduitComponent } from "./admin/modifier-produit/modifier-produit.component";
import { AddPlanificationComponent } from "./components/veterinaire/calendrier/add-planification/add-planification.component";
import { GestionContentComponent } from "./components/gardes/content/gestion-content/gestion-content.component";
import { BlogComponent } from "./propriétaire/blog/blog.component";
import { DetailsContentComponent } from "./propriétaire/details-content/details-content.component";
import { PostulationsComponent } from "./propriétaire/postulations/postulations.component";
import { InfoGardienComponent } from "./propriétaire/info-gardien/info-gardien.component";
import { HomeComponent } from "./accueil/home/home.component";
import { LoginComponent } from "./accueil/login/login.component";
import { SignupComponent } from "./accueil/signup/signup.component";
import { AuthGuard } from "./services/auth.guard";
import { EditComponent } from "./propriétaire/edit/edit.component";
import { EditPasswordComponent } from "./propriétaire/edit-password/edit-password.component";
import { ContentVetComponent } from "./components/veterinaire/content-vet/content-vet.component";
import { GestionContentvetComponent } from "./components/veterinaire/content-vet/gestion-contentvet/gestion-contentvet.component";
import { AddContentvetComponent } from "./components/veterinaire/content-vet/add-contentvet/add-contentvet.component";
import { DetailsContentvetComponent } from "./components/veterinaire/content-vet/details-contentvet/details-contentvet.component";
import { ModifierPlanificationComponent } from "./components/veterinaire/calendrier/modifier-planification/modifier-planification.component";
import { EditProfileComponent } from "./propriétaire/edit-profile/edit-profile.component";
import { CompleteProfileComponent } from "./propriétaire/complete-profile/complete-profile.component";
import { ModifieProfilComponent } from "./settings/modifie-profil/modifie-profil.component";
import { ModifiePasswordComponent } from "./settings/modifie-password/modifie-password.component";
import { CompleteProfilComponent } from "./settings/complete-profil/complete-profil.component";
import { ProduitComponent } from "./accueil/sections/produit/produit.component";
import { BlogSectionComponent } from "./accueil/sections/blog-section/blog-section.component";
import { ContactComponent } from "./accueil/sections/contact/contact.component";
import { ServicesComponent } from "./accueil/sections/services/services.component";
import { WorksComponent } from "./accueil/sections/works/works.component";

const routes: Routes = [
  {
    path: "",
    component: FullComponent,
    children: [
      { path: "", redirectTo: "/accueil/accueil", pathMatch: "full" },
      { path: "home", component: DashboardComponent },
      { path: "alerts", component: AlertsComponent },
      { path: "forms", component: FormsComponent },
      { path: "table", component: ProductComponent },
      { path: "grid-list", component: GridListComponent },
      { path: "menu", component: MenuComponent },
      { path: "tabs", component: TabsComponent },
      { path: "expansion", component: ExpansionComponent },
      { path: "chips", component: ChipsComponent },
      { path: "progress", component: ProgressComponent },
      { path: "toolbar", component: ToolbarComponent },
      { path: "progress-snipper", component: ProgressSnipperComponent },
      { path: "snackbar", component: SnackbarComponent },
      { path: "slider", component: SliderComponent },
      { path: "slide-toggle", component: SlideToggleComponent },
      { path: "tooltip", component: TooltipsComponent },
      { path: "button", component: ButtonsComponent },
    ],
  },
  //Vétérinaire
  {
    path: "dashboardVet",
    component: SideMenuVeterinaireComponent,
    children: [
      { path: "", redirectTo: "/dashboardVet/rendezVous", pathMatch: "full" },
      {
        path: "rendezVous",
        component: ListeRdvComponent,
        canActivate: [AuthGuard],
        data: { role: "veterinaire" },
      },
      {
        path: "planification",
        component: CalendrierComponent,
        canActivate: [AuthGuard],
        data: { role: "veterinaire" },
      },
      {
        path: "addPlanification",
        component: AddPlanificationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "editPlanification/:id",
        component: ModifierPlanificationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "content",
        component: ContentVetComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "detailsContent/:id",
        component: DetailsContentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "addContent",
        component: AddContentvetComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "gestionContent",
        component: GestionContentvetComponent,
        canActivate: [AuthGuard],
        data: { role: "veterinaire" },
      },
      {
        path: "modifie-profil",
        component: ModifieProfilComponent,
        canActivate: [AuthGuard],
        data: { role: "veterinaire" },
      },
      {
        path: "modifie-password",
        component: ModifiePasswordComponent,
        canActivate: [AuthGuard],
        data: { role: "veterinaire" },
      },
      {
        path: "complete-profil",
        component: CompleteProfilComponent,
        canActivate: [AuthGuard],
        data: { role: "veterinaire" },
      },
    ],
  },
  //Gardien
  {
    path: "dashboardGard",
    component: SideMenuGardienComponent,
    children: [
      { path: "", redirectTo: "/dashboardGard/gardes", pathMatch: "full" },
      {
        path: "gardes",
        component: GardesComponent,
        canActivate: [AuthGuard],
        data: { role: "gardien" },
      },
      {
        path: "detailsGarde/:id",
        component: DetailsGardeComponent,
        canActivate: [AuthGuard],
        data: { role: "gardien" },
      },
      {
        path: "content",
        component: ContentComponent,
        canActivate: [AuthGuard],
        data: { role: "gardien" },
      },
      {
        path: "detailsContent/:id",
        component: ContentDetailsComponent,
        canActivate: [AuthGuard],
        data: { role: "gardien" },
      },
      {
        path: "addContent",
        component: AddContentComponent,
        canActivate: [AuthGuard],
        data: { role: "gardien" },
      },
      {
        path: "gestionContent",
        component: GestionContentComponent,
        canActivate: [AuthGuard],
        data: { role: "gardien" },
      },
      {
        path: "modifie-profil",
        component: ModifieProfilComponent,
        canActivate: [AuthGuard],
        data: { role: "gardien" },
      },
      {
        path: "modifie-password",
        component: ModifiePasswordComponent,
        canActivate: [AuthGuard],
        data: { role: "gardien" },
      },
      {
        path: "complete-profil",
        component: CompleteProfilComponent,
        canActivate: [AuthGuard],
        data: { role: "gardien" },
      },
    ],
  },

  // admin
  {
    path: "admin-dashboard",
    component: AdminSidebarComponent,
    children: [
      {
        path: "",
        redirectTo: "/admin-dashboard/categories",
        pathMatch: "full",
      },
      {
        path: "categories",
        component: CategoriesComponent,
        canActivate: [AuthGuard],
        data: { role: "admin" },
      },
      {
        path: "produits",
        component: ProduitsComponent,
        canActivate: [AuthGuard],
        data: { role: "admin" },
      },
      {
        path: "commandes",
        component: CommandesComponent,
        canActivate: [AuthGuard],
        data: { role: "admin" },
      },
      {
        path: "utilisateurs",
        component: UtilisateursComponent,
        canActivate: [AuthGuard],
        data: { role: "admin" },
      },
      {
        path: "contenu-informatif",
        component: ContenuInformatifComponent,
        canActivate: [AuthGuard],
        data: { role: "admin" },
      },
      {
        path: "ajout-categorie",
        component: AjoutCategorieComponent,
        canActivate: [AuthGuard],
        data: { role: "admin" },
      },
      {
        path: "modifier-categorie/:id",
        component: ModifierCategorieComponent,
        canActivate: [AuthGuard],
        data: { role: "admin" },
      },
      {
        path: "ajout-produit",
        component: AjoutProduitComponent,
        canActivate: [AuthGuard],
        data: { role: "admin" },
      },
      {
        path: "modifier-produit/:id",
        component: ModifierProduitComponent,
        canActivate: [AuthGuard],
        data: { role: "admin" },
      },
      {
        path: "archives",
        component: ArchivesComponent,
        canActivate: [AuthGuard],
        data: { role: "admin" },
      },
      {
        path: "modifie-profil",
        component: ModifieProfilComponent,
        canActivate: [AuthGuard],
        data: { role: "admin" },
      },
      {
        path: "modifie-password",
        component: ModifiePasswordComponent,
        canActivate: [AuthGuard],
        data: { role: "admin" },
      },
      {
        path: "complete-profil",
        component: CompleteProfilComponent,
        canActivate: [AuthGuard],
        data: { role: "admin" },
      },
    ],
  },

  //propriétaire
  {
    path: "prop-dashboard",
    component: PropSidebarComponent,
    children: [
      { path: "", redirectTo: "/prop-dashboard/produits", pathMatch: "full" },
      {
        path: "produits",
        component: ProduitsPropComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "animaux",
        component: AnimauxComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "garde",
        component: GardeComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "rendez-vous",
        component: RendezVousComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "contenu-informatif",
        component: ContenuInformatifPropComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "blog",
        component: BlogComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "detailsContent/:id",
        component: DetailsContentComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "ajout-animal",
        component: AjoutAnimalComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "modifie-animal/:id",
        component: ModifieAnimalComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "demander-garde",
        component: DemandeGardeComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "modifie-garde/:id",
        component: ModifieGardeComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "ajout-contenu",
        component: AjoutContenuInfoComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "panier-prop",
        component: PanierComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "paiement",
        component: PaiementComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "prendre-rv/:id",
        component: PrendreRvComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "info-med/:id",
        component: InfoMedComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "postulations/:id",
        component: PostulationsComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "info-gardien/:id",
        component: InfoGardienComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      // {path:"edit", component:EditComponent, canActivate: [AuthGuard]},
      // {path:"edit-profile", component:EditProfileComponent, canActivate: [AuthGuard]},
      // {path:"complete-profile", component:CompleteProfileComponent, canActivate: [AuthGuard]},
      // {path:"edit-password", component:EditPasswordComponent, canActivate: [AuthGuard]}
      {
        path: "modifie-profil",
        component: ModifieProfilComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "modifie-password",
        component: ModifiePasswordComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
      {
        path: "complete-profil",
        component: CompleteProfilComponent,
        canActivate: [AuthGuard],
        data: { role: "proprietaire" },
      },
    ],
  },

  //accueil
  {
    path: "accueil",
    children: [
      { path: "", redirectTo: "accueil", pathMatch: "full" },
      { path: "accueil", component: HomeComponent },
      { path: "login", component: LoginComponent },
      { path: "signup", component: SignupComponent },
      { path: "accueil/produitsH", component: ProduitComponent },
      { path: "accueil/contenu-informatif", component: BlogSectionComponent },
      { path: "accueil/rejoignez-nous", component: WorksComponent },
      { path: "accueil/nos-services", component: ServicesComponent },
      { path: "accueil/contactez-nous", component: ContactComponent },
    ],
  },

  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
