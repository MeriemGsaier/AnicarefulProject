import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:3000/profile';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer + ' + localStorage.getItem('token'));
    return this.http.get<any>(`${this.baseUrl}/get-profile`, { headers });
  }

  getGardienProfile(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer + ' + localStorage.getItem('token'));
    return this.http.get<any>(`${this.baseUrl}/get-profile`, { headers });
  }

  getVeterinaireProfile(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer + ' + localStorage.getItem('token'));
    return this.http.get<any>(`${this.baseUrl}/get-profile`, { headers });
  }

  getProprietaireProfile(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer + ' + localStorage.getItem('token'));
    return this.http.get<any>(`${this.baseUrl}/get-profile`, { headers });
  }

  getAdminProfile(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer + ' + localStorage.getItem('token'));
    return this.http.get<any>(`${this.baseUrl}/get-profile`, { headers });
  }

  completeProfile(profileData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    console.log('completeProfile', headers, profileData);
    return this.http.put<any>(`${this.baseUrl}/complete-profile`, profileData, { headers });
  }

  // Méthode pour mettre à jour le profil
  updateProfile(profileData: any): Observable<any> {
    console.log('updateProfile', profileData);
    return this.http.put<any>(`${this.baseUrl}/update-profile`, profileData);
  }

  updatePassword(userId: string, oldPassword: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const body = { userId, oldPassword, newPassword }; // Ajoutez également l'ID de l'utilisateur

    // Envoyez la requête HTTP POST avec l'en-tête d'authentification et les données du mot de passe
    return this.http.put<any>(`${this.baseUrl}/update-password`, body, { headers });
  }
}