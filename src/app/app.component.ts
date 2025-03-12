import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { AgGridModule } from 'ag-grid-angular';
import { AllCommunityModule, 
  ModuleRegistry,
  ColDef, 
  GridApi,
  //RowApiModule,
  //RowClassParams,
  //RowSelectionModule,
  RowSelectionOptions,
  GridReadyEvent, } from 'ag-grid-community'; 
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [ReactiveFormsModule,
    AgGridModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
      ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  

})
export class AppComponent {
  ruleForm: FormGroup;
  rowData: any[] = [];
  private gridApi!: GridApi;

  rowSelection: RowSelectionOptions | "single" | "multiple" = {
    mode: "multiRow",
    groupSelects: "descendants",
    headerCheckbox: false,
    checkboxLocation: "autoGroupColumn",
  };

  
  columnDefs: ColDef[] = [
    { field: 'ruleName', headerName: 'Rule Name', sortable: true, filter: true , editable: true},
    { field: 'active', headerName: 'Is Active', sortable: true, filter: true ,editable: true },
    { field: 'favourite', headerName: 'Is Favourite', sortable: true, filter: true , editable: true},
    { field: 'scheduled', headerName: 'Is Scheduled', sortable: true, filter: true, editable: true },
    { field: 'createdDate', headerName: 'Created Date', sortable: true, filter: true , editable: true},
    { field: 'alert', headerName: 'Alert', sortable: true, filter: true , editable: true}
  ];
  gridOptions: any;

  constructor(private fb: FormBuilder) {
    this.ruleForm = this.fb.group({
      ruleName: ['', [Validators.required, Validators.minLength(4)]],
      active: ['', Validators.required],
      type: ['', Validators.required],
      favourite: ['', Validators.required],
      scheduled: ['', Validators.required],
      createdDate: [''],
      alert: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.ruleForm.valid) {
      this.rowData = [...this.rowData, this.ruleForm.value];
      this.ruleForm.reset();
    }
  }
  
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

   
  
  onRemoveSelected() {
    const selectedRowData = this.gridApi.getSelectedRows();
    this.gridApi.applyTransaction({ remove: selectedRowData });
  }


}
