import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {

  categories = ['Veterinaire', 'Gardien'];
  selectedCategory = 'Veterinaire';

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  filterByCategory(products: any[], category: string): any[] {
    if (!category || category === '') {
      return products;
    }
    return products.filter((product) => product.category === category);
  }

  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
  }

  selectProprietaire(role: string): void {
    this.roleService.setRole(role);
  }

}
