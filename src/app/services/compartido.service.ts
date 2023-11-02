import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  private selectedProcedure = new BehaviorSubject<any>(null);

  setSelectedProcedure(procedure: any) {
    this.selectedProcedure.next(procedure);
  }

  getSelectedProcedure(): Observable<any> {
    return this.selectedProcedure.asObservable();
  }

  clearSelection() {
    this.selectedProcedure.next(null);
  }
}
