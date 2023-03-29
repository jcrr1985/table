import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//import Transaction
 import { Transaction } from './interfaces/IexpandableTable';

@Injectable({
  providedIn: 'root'
})
export class DummyServiceService {



  constructor() { }

  transactions: Transaction[] = [
    {
      fondoName: 'FM IFI DEDR FUND CRE',
      operaciones: [
        {
          opName: 'Rescates',
          opData: [
            {
              codMovimiento: 1,
              rut: '12345678',
              nombre: 'Juan Perez',
              subrut: 123456,
              montoOperacion: 1000000
            },
            {
              codMovimiento: 2,
              rut: '56789012-3',
              nombre: 'Pedro Rodriguez',
              subrut: 345678,
              montoOperacion: 1000000
            }
          ]
        }
      ]
    },
    {
      fondoName: 'FM Inv Small Cap',
      operaciones: [
        {
          opName: 'Abono FM',
          opData: [
            {
              codMovimiento: 3,
              rut: '12345678',
              nombre: 'Juan Perez',
              subrut: 123456,
              montoOperacion: 1000000
            },
            {
              codMovimiento: 4,
              rut: '56789012-3',
              nombre: 'Pedro Rodriguez',
              subrut: 345678,
              montoOperacion: 1000000
            }
          ]
        },
        {
          opName: 'Rescates',
          opData: [
            {
              codMovimiento: 5,
              rut: '12345678',
              nombre: 'Juan Perez',
              subrut: 123456,
              montoOperacion: 500000
            },
            {
              codMovimiento: 6,
              rut: '56789012-3',
              nombre: 'Pedro Rodriguez',
              subrut: 345678,
              montoOperacion: 500000
            }
          ]
        },
        {
          opName: 'Compras DPD',
          opData: [
            {
              codMovimiento: 3,
              rut: '12345678',
              nombre: 'Juan Perez',
              subrut: 123456,
              montoOperacion: 500000
            },
            {
              codMovimiento: 4,
              rut: '56789012-3',
              nombre: 'Pedro Rodriguez',
              subrut: 345678,
              montoOperacion: 200000
            }
          ]
        },
      ]
    },
  ];

  private _transactions: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>(this.transactions);
  public transactions$ = this._transactions.asObservable();

}
