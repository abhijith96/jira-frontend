import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatMenuModule, MatFormFieldModule, MatCheckboxModule, MatTooltipModule, MatDialogModule, MatSelectModule, MatInputModule } from '@angular/material';

import { SmdDatatableActionButton, SmdDataTableCellComponent, SmdDataTableRowComponent, SmdDataTable, SmdContextualDatatableButton, SmdDataTableColumnComponent } from './smd-datatable';
import { SmdPaginatorComponent } from 'app/main/shared/smd-paginator';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule
  ],
  declarations: [
    SmdDataTable,
    SmdDatatableActionButton,
    SmdContextualDatatableButton,
    SmdDataTableColumnComponent,
    SmdDataTableRowComponent,
    SmdDataTableCellComponent,
    SmdPaginatorComponent,
  ],
  exports: [

    SmdDataTable,
    SmdDatatableActionButton,
    SmdContextualDatatableButton,
    SmdDataTableColumnComponent,
    SmdDataTableRowComponent,
    SmdDataTableCellComponent,
    SmdPaginatorComponent

  ]
})
export class DatatableModule { }
