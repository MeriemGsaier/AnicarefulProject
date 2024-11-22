import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private selectedRole: string = '';

  setRole(role: string) {
    this.selectedRole = role;
    console.log('Role: service' + role);
  }

  getRole(): string {
    console.log('Role: service' + this.selectedRole);
    return this.selectedRole;
  }

  clearRole(): void {
    this.selectedRole = '';
  }
}