import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-rendez-vous-dialog",
  templateUrl: "./rendez-vous-dialog.component.html",
  styleUrls: ["./rendez-vous-dialog.component.scss"],
})
export class RendezVousDialogComponent implements OnInit {
  rdvForm: any = FormGroup;
  submitted: any = false;
  constructor(
    public dialogRef: MatDialogRef<RendezVousDialogComponent>,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.rdvForm = this.formbuilder.group({
      heure: ["", Validators.required],
    });
  }

  closeDialog(result?: any) {
    if (this.rdvForm.valid) {
      this.dialogRef.close(this.rdvForm.value.heure);
    } else {
      this.dialogRef.close();
    }
  }
  get control(): { [key: string]: AbstractControl } {
    return this.rdvForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.rdvForm.invalid) {
      return;
    }
  }
}
