import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Injectable, Inject } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { DetalleOperacion, Operacion, Transaction } from '../interfaces/IexpandableTable';
import { DummyServiceService } from '../dummy-service.service';

@Component({
  selector: 'app-expandable-table',
  templateUrl: './expandable-table.component.html',
  styleUrls: ['./expandable-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ExpandableTableComponent implements OnInit {

  displayedColumns: string[] = ['select', 'entidad', 'ingresos', 'egresos', 'total'];
  expandedElement: Transaction | null = null;
  checkboxState: boolean[] = [];
  selected: boolean[] = [];
  // transactions: Transaction[] = [];


  constructor(public dialog: MatDialog, private dummyService: DummyServiceService ) { }

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


  ngOnInit(): void {
    this.dummyService.transactions$.subscribe((data: Transaction[]) => {
      console.log('data', data)
      this.transactions = data;
    });
  }

  public formatNumberWithCommas(num: number | undefined, maximumFractionDigits = 2): string {
    if (typeof num !== 'number') {
      return '-';
    }

    return num.toLocaleString(undefined, {
      useGrouping: true,
      maximumFractionDigits: maximumFractionDigits,
    });
  }

  public getTotalOperaciones(operaciones: Operacion[], tipo: string): number {
    let totalIngresos = 0;
    let totalEgresos = 0;


    operaciones.forEach(op => {
      op.opData.forEach(detalle => {
        if (op.opName === 'Rescate') {
          totalEgresos += detalle.montoOperacion;
        } else if (op.opName === 'Abono X') {
          totalIngresos += detalle.montoOperacion;
        }
      });
    });

    return tipo === 'ingresos' ? totalIngresos : totalEgresos;
  }

  public onCheckboxChange(event: any, detalle: any) {
    event.stopPropagation();
    console.log('detalle', detalle)
  }

  public toggleSelect(el: any): void {
    const selectedIndex = this.selected.indexOf(el);

    if (selectedIndex === -1) {
      this.selected.push(el);
    } else {
      this.selected.splice(selectedIndex, 1);
    }
  }

  public toggleCheckbox(index: number): void {
    // Cambiar el estado del checkbox correspondiente al índice proporcionado
    this.checkboxState[index] = !this.checkboxState[index];
  }

  public isCheckboxChecked(index: number): boolean {
    // Devuelve el estado del checkbox correspondiente al índice proporcionado
    return this.checkboxState[index];
  }

  public isAnyCheckboxChecked(): boolean {
    // Devuelve verdadero si al menos un checkbox está marcado
    return this.checkboxState.some(state => state);
  }


  public openModal(detalleOperacion: DetalleOperacion[]): void {
    this.dialog.open(ModalComponent, {
      data: detalleOperacion
    });
  }

  public getTotalIngresos(transactions: Transaction[]): number {
    let totalIngresos = 0;
    transactions.forEach(transaction => {
      totalIngresos += this.getTotalOperaciones(transaction.operaciones, 'ingresos');
    });
    return totalIngresos;
  }

  public getTotalEgresos(transactions: Transaction[]): number {
    let totalEgresos = 0;
    transactions.forEach(transaction => {
      totalEgresos += this.getTotalOperaciones(transaction.operaciones, 'egresos');
    });
    return totalEgresos;
  }

  public getTotal(transactions: Transaction[]): number {
    return this.getTotalIngresos(transactions) - this.getTotalEgresos(transactions);
  }

}
