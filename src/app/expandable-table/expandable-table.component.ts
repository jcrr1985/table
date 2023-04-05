import { Component, OnInit, Injectable, Inject, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { DetalleOperacion, Operacion, Transaction } from '../interfaces/IexpandableTable';
import { ExportService } from '../services/export.service';

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

export class ExpandableTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['select', 'entidad', 'ingresos', 'egresos', 'total'];
  expandedElement: Transaction | null = null;
  checkboxState: boolean[] = [];
  selected: any[] = [];
  selectedDetail: any[] = [];
  transactions: Transaction[] = [
    {
      fondoName: 'FM IFI DEDR FUND CRE',
      operaciones: [
        {
          opName: 'Rescate',
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
          opName: 'Abono X',
          opData: [
            {
              codMovimiento: 3,
              rut: '12345678',
              nombre: 'Anna Katun',
              subrut: 123456,
              montoOperacion: 1000000
            },
            {
              codMovimiento: 4,
              rut: '56789012-3',
              nombre: 'Jaime Antonio Guajardo Rojas',
              subrut: 345678,
              montoOperacion: 1000000
            }
          ]
        },
        {
          opName: 'Rescate',
          opData: [
            {
              codMovimiento: 5,
              rut: '12345678',
              nombre: 'Berta Valenzuela Gonzáles',
              subrut: 123456,
              montoOperacion: 500000
            },
            {
              codMovimiento: 6,
              rut: '56789012-3',
              nombre: 'Dolores O\'Riordan',
              subrut: 345678,
              montoOperacion: 500000
            }
          ]
        },
        {
          opName: 'Abono X',
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
              nombre: 'Sarah ELena Vega Barrios',
              subrut: 345678,
              montoOperacion: 200000
            }
          ]
        },
      ]
    },
  ];
  currency: string | undefined = undefined;
  public totalTotal = 0

  constructor(public dialog: MatDialog, private exportService: ExportService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
  public formatNumberWithCommas(num: number | undefined, maximumFractionDigits = 2): string {
    if (typeof num !== 'number') {
      return '-';
    }

    const formattedNum = (num * this.factor).toLocaleString(undefined, {
      useGrouping: true,
      maximumFractionDigits: maximumFractionDigits,
    });
    return formattedNum;
  }

  public getTotalOperaciones(operaciones: Operacion[], tipo: string): number {
    let totalIngresos = 0;
    let totalEgresos = 0;
    let totaltotal = 0

    operaciones.forEach(op => {
      op.opData.forEach(detalle => {
        if (op.opName === 'Rescate') {
          totalEgresos += detalle.montoOperacion;
        } else if (op.opName === 'Abono X') {
          totalIngresos += detalle.montoOperacion;
        }
      });
    });

    totaltotal = totalEgresos - totalIngresos;
    this.totalTotal = totaltotal;
    return tipo === 'ingresos' ? totalIngresos : totalEgresos;
  }

  public onCheckboxChange(event: any, detalle: any) {
    event.stopPropagation();
    console.log('detalle', detalle)
  }

  public toggleSelect(row: any): void {
    console.log('Operaciones', row.operaciones)
    const selectedIndex = this.selected.indexOf(row);

    if (selectedIndex === -1) {
      this.selected.push(row);
    } else {
      this.selected.splice(selectedIndex, 1);
    }
  }

  public toggleSelectDetail(op: any): void {
    console.log('op of operaciones', op)
    const selectedIndexDetail = this.selectedDetail.indexOf(op);

    if (selectedIndexDetail === -1) {
      this.selectedDetail.push(op);
    } else {
      this.selectedDetail.splice(selectedIndexDetail, 1);
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
    console.log('detalleOperacion', detalleOperacion)

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
  factor: number = 1;
  getCurrency(currency: string) {
    console.log('currency', currency)
    this.currency = currency;
    const tipoCambio = 0.0013;
    const factor = 1;
    if (currency === 'CLP') {
      this.factor = 1;
      return;
    }
    if (currency === 'USD') {
      this.factor = tipoCambio;
      return;
    }

  }

  //datos anidados y no anidados de transactions en un solo nivel para exportar a excel
  public flattenTransactions(transactions: Transaction[]): any[] {
    const flattenedTransactions: any[] = [];
    transactions.forEach(transaction => {
      transaction.operaciones.forEach(operacion => {
        operacion.opData.forEach(detalle => {
          flattenedTransactions.push({
            fondoName: transaction.fondoName,
            opName: operacion.opName,
            codMovimiento: detalle.codMovimiento,
            rut: detalle.rut,
            nombre: detalle.nombre,
            subrut: detalle.subrut,
            montoOperacion: detalle.montoOperacion,
          });
        });
      });
    });
    return flattenedTransactions;
  }

  exportAsXlsx(): void {
    this.exportService.exportToExcel(this.flattenTransactions(this.transactions), 'transacciones');
  }
}
