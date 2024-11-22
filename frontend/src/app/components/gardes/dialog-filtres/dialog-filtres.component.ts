import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FilterGardeService } from "src/app/services/filter-garde.service";
import { GardeService } from "src/app/services/garde.service";

@Component({
  selector: "app-dialog-filtres",
  templateUrl: "./dialog-filtres.component.html",
  styleUrls: ["./dialog-filtres.component.scss"],
})
export class DialogFiltresComponent {

  
  typeGarde : any [] = [];

  selectedType: string = "";
  selectedLocation: string = "";
  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;
  selectedSpecies: string = "";

  constructor(public dialogRef: MatDialogRef<DialogFiltresComponent>,
    private gardeService : GardeService,
    private filterService : FilterGardeService) {}

    ngOnInit(): void {
      this.getTypeGarde();
      
    }

    onSpeciesChange(species: string) {
      // La valeur sélectionnée est stockée dans la variable selectedSpecies
      console.log("Espèce sélectionnée :", species);
    }


  getTypeGarde() {
    this.gardeService.getTypeGarde().subscribe(
      (data: any) => {
        this.typeGarde = data; 
      },
      (error) => {
        console.log('Erreur lors de la récupération des gardes :', error);
      }
    );
  }

  selectType(type: string) {
    this.selectedType = type;
  }
  
  applyFilters() {
    const filters = {
      type: this.selectedType,
      location: this.selectedLocation,
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate,
      species: this.selectedSpecies
    };
    console.log(this.selectedSpecies)
    this.filterService.setFilters(filters);
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
