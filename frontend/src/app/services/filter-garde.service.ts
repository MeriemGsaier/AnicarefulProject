import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterGardeService {

  private filtersSubject = new BehaviorSubject<any>({});
  filters$ = this.filtersSubject.asObservable();

  setFilters(filters: any) {
  this.filtersSubject.next(filters);
  }
}
