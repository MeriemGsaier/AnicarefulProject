import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt'; // Importer le service JwtHelperService

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authTokenKey = 'authToken';
  // private jwtHelper = new JwtHelperService(); // Initialiser le service JwtHelperService

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    const loginUrl = 'http://localhost:3000/authentification/login';
    return this.http.post(loginUrl, credentials).pipe(
      map((response: any) => {
        this.storeToken(response.token);
        return response;
      })
    );
  }

  signup(user: any): Observable<any> {
    const signupUrl = 'http://localhost:3000/authentification/signup';
    return this.http.post(signupUrl, user).pipe(
      map((response: any) => {
        this.storeToken(response.token);
        return response;
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  storeToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.role;
    }
    return null;
  }

  clearToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }

  getHomePath(): string {
    const userRole = this.getUserRole();
    if (userRole === 'admin') {
      return '/admin-dashboard';
    } else if (userRole === 'proprietaire') {
      return '/prop-dashboard';
    } else if (userRole === 'veterinaire') {
      return '/dashboardVet';
    } else if (userRole === 'gardien') {
      return '/dashboardGard';
    } else {
      return '/home';
    }
  }

  logout(): void {
    this.clearToken();
    this.router.navigate(['/accueil']);
  }
}




















// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private authTokenKey = 'authToken';
//   private userRoleKey = 'userRole';

//   constructor(private http: HttpClient, private router: Router) {}

//   login(credentials: { email: string, password: string }): Observable<any> {
//     const loginUrl = 'http://localhost:3000/authentification/login';
//     return this.http.post(loginUrl, credentials).pipe(
//       map((response: any) => {
//         this.storeToken(response.token);
//         this.storeUserRole(response.role);
//         return response;
//       })
//     );
//   }

//   signup(user: any): Observable<any> {
//     const signupUrl = 'http://localhost:3000/authentification/signup';
//     return this.http.post(signupUrl, user).pipe(
//       map((response: any) => {
//         this.storeToken(response.token);
//         this.storeUserRole(response.role);
//         return response;
//       })
//     );
//   }

//   isAuthenticated(): boolean {
//     return !!this.getToken();
//   }

//   storeToken(token: string): void {
//     localStorage.setItem(this.authTokenKey, token);
//   }

//   getToken(): string | null {
//     return localStorage.getItem(this.authTokenKey);
//   }

//   storeUserRole(role: string): void {
//     localStorage.setItem(this.userRoleKey, role);
//   }

//   getUserRole(): string | null {
//     return localStorage.getItem(this.userRoleKey);
//   }

//   clearToken(): void {
//     localStorage.removeItem(this.authTokenKey);
//     localStorage.removeItem(this.userRoleKey);
//   }

//   getHomePath(): string {
//     const userRole = this.getUserRole();
//     if (userRole === 'admin') {
//       return '/admin-dashboard'; 
//     } else if (userRole === 'proprietaire') {
//       return '/prop-dashboard';
//     } else if (userRole === 'veterinaire') {
//       return '/dashboardVet';
//     } else if (userRole === 'gardien') {
//       return '/dashboardGard';
//     } else {
//       return '/home';
//     }
//   }  

//   logout(): void {
//     this.clearToken();
//     this.router.navigate(['/accueil']);
//   }
// }