import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  sendEmail(): void {
    if (this.contactForm && this.contactForm.valid) {
      const { fullName, email, phone, subject, message } = this.contactForm.value;
      this.contactService.sendEmail(fullName, email, phone, subject, message)
        .subscribe(
          () => {
            this.showSuccessAlert();
            this.contactForm?.reset();
          },
          (error) => {
            this.showSuccessAlert();
            this.contactForm?.reset();
          }
        );
    }
  }  

  showSuccessAlert(): void {
    Swal.fire({
      icon: 'success',
      title: 'Succès!',
      text: 'Votre email a été envoyé avec succès!',
      timer: 3000, // Close alert after 3 seconds
      timerProgressBar: true,
      showConfirmButton: false
    });
  }
}