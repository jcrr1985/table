
export interface Transaction {
  fondoName: string
  operaciones: Operacion[]
}

export interface Operacion {
  opName: string;
  opData: DetalleOperacion[]
}


export interface DetalleOperacion {
  codMovimiento: number,
  rut: string
  nombre: string;
  subrut: number;
  montoOperacion: number
}
