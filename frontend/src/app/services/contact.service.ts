import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private emailUrl = 'http://localhost:3000/contact/send-email';

  constructor(private http: HttpClient) {}

  sendEmail(name: string, email: string, phone: string, subject: string, message: string) {
    const data = {
      name,
      email,
      phone,
      subject,
      message
    };

    return this.http.post(this.emailUrl, data);
  }
}