import { Component, AfterViewChecked, AfterViewInit, ViewChild, ElementRef, Input, OnInit, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { EventEmitter } from '@angular/core';
import { FilterColumn } from '../../../../../../../shared/models/reports/Filters';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-text-menu-table',
    templateUrl: './text-menu-table.component.html',
    styleUrls: ['./text-menu-table.component.scss']
})
/** TextMenuTable component*/
export class TextMenuTableComponent implements OnInit {
  @ViewChild('filterInputElement') filterInputElement: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input() filterData: any;
  @Input() filterDataColumns: Array<FilterColumn>;

  @Output() selectedDataChanged = new EventEmitter<any>();

  displayedColumns: string[];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.filterData);
    this.selection = new SelectionModel(true, []);

    this.selection.changed.subscribe(res => { this.selectChange(res); })

    this.displayedColumns = this.columnsWithSelect().map(column => column.name);

    this.dataSource.paginator = this.paginator;
  }

  columnsWithSelect(): Array<any> {
    let columnsTemp: Array<any>;
    columnsTemp = [...this.filterDataColumns];
    columnsTemp.splice(0,0,{ name: 'select', label: '' })
    return columnsTemp;
  }

  setFocusAtFilterInput() {

    this.filterInputElement.nativeElement.value = '';
    this.dataSource.filter = '';

    this.filterInputElement.nativeElement.focus();
  }

    /** TextMenuTable ctor */
  dataSource;
  selection;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectChange(selectedData: any) {
    this.selectedDataChanged.emit(Array.from(selectedData.source._selection))
  }

}
