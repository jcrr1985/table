import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


interface Transaction {
  entidad: string;
  ingresos: number;
  egresos: number;
  description: string;
  operacion: Operacion[]
}

interface Operacion {
  tipo: string;
  ingresos: number;
  egresos: number;
}

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

  displayedColumns: string[] = ['entidad', 'ingresos', 'egresos', 'total'];
  expandedElement: Transaction | null = null;


  transactions: Transaction[] = [
    {
      entidad: 'FM FI MKT EURO BCHI',
      ingresos: 300000000,
      egresos: 100000000,
      description: 'Lorem ipsum dolor sit amet',
      operacion: [
        {
          tipo: 'rescate',
          ingresos: 3000000,
          egresos: 15000000,
        },
        {
          tipo: 'abono X',
          ingresos: 5000000,
          egresos: 1000000,
        },
      ]
    },
    {
      entidad: 'FM FI DEUDA CHILE',
      ingresos: 2000000000,
      egresos: 14000000000,
      description: 'Lorem ipsum dolor sit amet',
      operacion: [
        {
          tipo: 'rescate',
          ingresos: 3000000,
          egresos: 0,
        },
      ]
    },
  ];

  constructor() { }

  ngOnInit(): void {
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
}

