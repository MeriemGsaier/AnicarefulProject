import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  icons: { name: string; link: string; }[] = [
    { name: 'chat', link: '/testimonials' },
    { name: 'people', link: '/team' },
    { name: 'info', link: '/services' },
    { name: 'build', link: '/skills' },
    { name: 'settings', link: '/work-steps' },
    { name: 'event', link: '/events' },
    { name: 'monetization_on', link: '/pricing' },
    { name: 'ondemand_video', link: '/videos' },
    { name: 'bar_chart', link: '/stats' },
    { name: 'local_offer', link: '/discount' }
  ];

  getIconLabel(iconName: string): string {
    return iconName;
  }

  getFirstHalfIcons(): { name: string; link: string; }[] {
    const halfIndex = Math.ceil(this.icons.length / 2);
    return this.icons.slice(0, halfIndex);
  }

  getSecondHalfIcons(): { name: string; link: string; }[] {
    const halfIndex = Math.ceil(this.icons.length / 2);
    return this.icons.slice(halfIndex);
  }

  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
  }

  selectProprietaire(): void {
    this.roleService.setRole('proprietaire');
    console.log('Role: navbar: proprietaire');
  }

}
