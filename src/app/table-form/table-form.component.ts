import { Component, EventEmitter, Output } from '@angular/core';
 import {Origen, Contraparte} from '../interfaces/Iform';
@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss']
})
export class TableFormComponent {
  origen!: string;
  contraparte!: string;
  selectedCar!: string;
  selectedCurrency!: string;

  //event emitter for selectedCurrency
  @Output() _selectedCurrency: EventEmitter<string> = new EventEmitter<string>();

  foods: Origen[] = [
    {value: 'corredora', viewValue: 'Corredora'},
    {value: 'Administradora', viewValue: 'Administradora'},
  ];

  cars: Contraparte[] = [
    {value: 'corredora', viewValue: 'Corredora'},
    {value: 'Administradora', viewValue: 'Corredora'},
  ];

  currencies: any[] = [
    {value: 'CLP', viewValue: 'CLP'},
    {value: 'USD', viewValue: 'USD'},
  ];

  emitNewCurrency() {
    this._selectedCurrency.emit(this.selectedCurrency);
  }

  actualizar(){
    alert('actualizando...')
  }


}
