import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalleOperacion } from '../interfaces/IdetalleOperacion';
import { Transaction } from '../interfaces/IexpandableTable';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  detalleOperacion: any;
  total: number = 0;

  checkboxState: boolean[] = [false, false, false, false, false];
  selected: Transaction[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetalleOperacion) {
    this.detalleOperacion = data;
    console.log('this.detalleOperacion', this.detalleOperacion)
  }
  ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onCheckboxChange(event: any, detalle: any, index: any) {
    event.stopPropagation();
    this.toggleCheckbox(index);
    this.toggleSelect(detalle);
    console.log('detalle en modal', this.selected)
    this.total = this.selected.reduce((a: any, b: any) => a + b.montoOperacion, 0);

  }

  public toggleSelect(el: Transaction): void {
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

}


