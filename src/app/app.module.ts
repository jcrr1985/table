import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpandableTableComponent } from './expandable-table/expandable-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    ExpandableTableComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatDialogModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
