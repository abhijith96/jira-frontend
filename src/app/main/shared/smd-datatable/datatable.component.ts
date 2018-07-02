import {
	AfterContentChecked,
	AfterContentInit,
	ChangeDetectorRef,
	Component,
	ContentChild,
	ContentChildren,
	Directive,
	ElementRef,
	EmbeddedViewRef,
	EventEmitter,
	forwardRef,
	Inject,
	Input,
	IterableDiffers,
	OnDestroy,
	OnInit,
	Output,
	QueryList,
	TemplateRef,
	ViewChild,
	ViewContainerRef,
	ViewEncapsulation,
	NgModule,
} from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { MatDialog } from '@angular/material';
import { MatIconModule, MatRippleModule } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { SmdPaginatorComponent } from '../smd-paginator/paginator.component';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatatableService } from './datatable.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



let columnIds = 0;


export class SmdDataRowModel {
	originalOrder?: number;

	constructor(public model: any,
		public checked?: boolean, public selected?: boolean) {
	}
}

@Directive({
	selector: '[smd-data-cell]'
})
export class SmdDataTableCellComponent implements OnInit, OnDestroy {
	@Input() column: SmdDataTableColumnComponent;
	@Input() data: any;
	@Input() templ: TemplateRef<SmdDataTableCellComponent>;

	childView: EmbeddedViewRef<SmdDataTableCellComponent>;

	constructor(private _viewContainer: ViewContainerRef, private _elementRef: ElementRef) { }

	ngOnInit(): void {
		if (this._viewContainer && this.templ) {
			this.childView = this._viewContainer.createEmbeddedView(this.templ, this);
		}
	}

	ngOnDestroy(): void {
		this.childView.destroy();
	}
}

@Component({
	selector: "[smd-datatable-row]",
	template: `
  <td *ngIf="renderCheckbox" class="smd-datatable-body-checkbox">
  <div class="smd-checkbox">
  <mat-checkbox [(ngModel)]="row.checked" (change)="_parent._onRowCheckChange(row)">
  </mat-checkbox>
  </div>
  </td>
  <td *ngFor="let column of columns"
  [class.smd-numeric-column]="column.numeric"
  [class.smd-editable]="column.editable"
  [class.smd-stretch]="column.stretch"
  [ngStyle]="column.colStyle"
  >
  <span class="smd-column-title">
  {{column.title}}
  </span>
  <span class="smd-cell-data">
  <ng-template smd-data-cell [column]="column" [data]="row.model" [templ]="column.template"></ng-template>
  <span class="smd-editable-field-placeholder" *ngIf="column.editable && !row.model[column.field]">{{column.editablePlaceholder}}</span>
  </span>
  </td>
  `
})
export class SmdDataTableRowComponent {
	@Input() row: SmdDataRowModel;
	@Input() renderCheckbox: boolean;
	@Input() isTitleNeeded = true;
	@Input() columns: SmdDataTableColumnComponent[];

	constructor(@Inject(forwardRef(() => SmdDataTable)) private _parent: SmdDataTable,
		private dialog: MatDialog, private viewContainerRef: ViewContainerRef) {
	}


}

@Component({
	selector: "smd-datatable-column",
	template: `
  <ng-content select="template"></ng-content>
  <ng-template #internalTemplate *ngIf="!_customTemplate" let-model="data">
  {{getFieldValue(model)}}
  </ng-template>
  `
})
export class SmdDataTableColumnComponent implements OnInit {
	sortDir?: 'ASC' | 'DESC' = null;
	id: string = '' + ++columnIds;
	headerWidth: number = 0;

	@Input() title: string;

	@Input() titleTooltip: string;
	@Input() field: string;
	@Input() numeric: boolean = false;
	@Input() sortable: boolean = false;

	@Input() filterable: boolean = false;
	@Input() sortFn: (a: any, b: any, sortDir: string) => number;
	@Input() filterFn: (a: any, text: string) => boolean;
	@Input() editable: boolean = false;
	@Input() editablePlaceholder: string;
	@Input() stretch: boolean = false;
	@Input() colStyle = {};

	@ContentChild(TemplateRef) _customTemplate: TemplateRef<Object>;
	@ViewChild('internalTemplate') _internalTemplate: TemplateRef<Object>;

	@Output() onFieldChange: EventEmitter<any> = new EventEmitter<any>();

	get template() {
		return this._customTemplate ? this._customTemplate : this._internalTemplate;
	}

	get hasCustomTemplate(): boolean {
		return !!this._customTemplate;
	}

	constructor(private _viewContainer: ViewContainerRef, private elementRef: ElementRef) {
	}

	ngOnInit(): void {
		if (!this.title) {
			throw new Error('Title is mandatory on smd-datatable-column');
		}
		if (!this.field) {
			throw new Error('Field is mandatory on smd-datatable-column');
		}
	}

	getFieldValue(model: any) {
		return model[this.field];
	}
}

@Component({
	selector: "smd-datatable-action-button",
	template: `
  <button mat-button
  color="primary"
  *ngIf="_checkButtonIsVisible()"
  (click)="_onButtonClick($event)">
  <span>{{label}}</span>
  </button>
  `
})
export class SmdDatatableActionButton {
	@Input() label: string;
	@Output() onClick: EventEmitter<void> = new EventEmitter<void>();

	constructor(@Inject(forwardRef(() => SmdDataTable)) private _parent: SmdDataTable) {
	}

	_onButtonClick(event: Event) {
		this.onClick.emit();
	}

	_checkButtonIsVisible() {
		return this._parent.selectedRows().length == 0;
	}
}

@Component({
	selector: "smd-datatable-contextual-button",
	template: `
  <button mat-icon-button
  *ngIf="_checkButtonIsVisible()"
  (click)="_onButtonClick($event)">
  <mat-icon>{{icon}}</mat-icon>
  </button>
  `
})
export class SmdContextualDatatableButton {
	@Input() icon: string;
	@Input() minimunSelected: number = -1;
	@Input() maxSelected: number = -1;
	@Output() onClick: EventEmitter<any[]> = new EventEmitter<any[]>();

	constructor(@Inject(forwardRef(() => SmdDataTable)) private _parent: SmdDataTable) {
	}

	_onButtonClick(event: Event) {
		this.onClick.emit(this._parent.selectedModels());
	}

	_checkButtonIsVisible() {
		let shouldShow = true;
		if (this.minimunSelected != null && this.minimunSelected > 0 && this._parent.selectedRows().length < this.minimunSelected) {
			shouldShow = false;
		}
		if (shouldShow && this.maxSelected > 0 && this._parent.selectedRows().length > this.maxSelected) {
			shouldShow = false;
		}
		return shouldShow;
	}
}
@Component({
	selector: "smd-datatable",
	templateUrl: "./datatable.component.html",
	styleUrls: ["./datatable.component.scss"],
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.smd-responsive]': 'responsive',
		'[class.primary-listing]': 'primaryListing'
	}
})
export class SmdDataTable implements AfterContentInit, AfterContentChecked, OnDestroy {

	rows: SmdDataRowModel[] = [];
	private visibleRows: SmdDataRowModel[] = [];
	private differ: any;
	private _columnsSubscription: Subscription;
	private sortDirection: string;
	private sortField: string;
	private lastQueryExecutedPage: number = 1;
	private selectedRow: any;
	private pages: number;
	private params: URLSearchParams = new URLSearchParams();
	loading = false;
	tableHeight: number;
	private token;

	filterInput: FormControl;
	columnFilterInputs: FormControl[] = [];

	@ViewChild(SmdPaginatorComponent) paginatorComponent: SmdPaginatorComponent;
	// @ContentChild(SmdDatatableHeader) header: SmdDatatableHeader;
	@ContentChildren(SmdDataTableColumnComponent) columns: QueryList<SmdDataTableColumnComponent>;

	@Input() rowCount: number = 0;
	@Input() showCheckBox: boolean;
	@Input() noDataDisplayMessage: string = 'No data to display';
	@Input() noDataDisplayIcon: string = 'sentiment_very_dissatisfied';
	@Input() isTitleNeeded: boolean = true;
	@Input() models: any[] = null;
	@Input() dataUrl: string;
	@Input() checked: boolean = false;
	@Input() paginated: boolean = true;
	@Input() paginatorRanges: number[] = [5, 10, 25, 50, 100];
	@Input() defaultRange = 10;
	@Input() ndShowDesc = false;
	@Input() ndLink = 'click here to add new item';
	@Input() showSelectedRow = false;
	@Input() responsive: boolean = false;
	@Input() dataHeader: string;
	@Input() primaryListing: boolean = false;
	@Input() selectedPage = 1;
	@Input() filterEnabled: boolean = false;
	@Input() showTableFilter: boolean = true;
	@Input() showColumnFilter: boolean = true;
	@Input() isModel = false;
	@Input() preFetchPages = 20;
	@Output() onRowChecked: EventEmitter<{ model: any, checked: boolean }> = new EventEmitter<{ model: any, checked: boolean }>();
	@Output() onRowSelected: EventEmitter<{ model: any, checked: boolean, selected: boolean }> = new EventEmitter<{ model: any, checked: boolean, selected: boolean }>();
	@Output() onAllRowsChecked: EventEmitter<{ model: any, checked: boolean }> = new EventEmitter<{ model: any, checked: boolean }>();
	@Output() onAllRowsSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
	@Output() pageChange: EventEmitter<any> = new EventEmitter<{ page: number }>();
	@Output() newItemClicked: EventEmitter<any> = new EventEmitter<any>();
	@Input() selectPage: boolean = false;

	@Input() searchDB = true;
	@Input() preFilters: any = {};
	@Input() primaryKey: any;

	customFilter: any;
	customFilters: any;
	checkedRows: any = [];
	checkedPKs: any = [];
	selectedRowCount: number = 0;
	constructor(differs: IterableDiffers,
		private _viewContainer: ViewContainerRef,
		public changeDetector: ChangeDetectorRef,

		//TODO change ChangeDetectorRef to API Service
		//Create service apiclass instead of injetcing HttpClient
		private apiClass: DatatableService,
		private apiServer: ChangeDetectorRef) {
		this.differ = differs.find([]).create(null);
		this.filterInput = new FormControl('');
	}

	ngAfterContentInit() {
		if (!this.paginatorComponent.selectedRange) {
			this.paginatorComponent.selectedRange = this.defaultRange;
		}

		if (!this.models) {
			this._queryTableData().then(() => { }, () => { });
		}
		else {
			this._updateRows();
		}
		this._columnsSubscription = this.columns.changes.subscribe(() => {
			this._updateRows();
			this.changeDetector.markForCheck();
		});


		this.filterInput.valueChanges
			.subscribe(searchText => {
				if (this.paginatorComponent) {
					// this.paginatorComponent.currentPage.page = 1;
					// this.preFetchPages = 20;
					this.selectedPage = 1;
				}
				this._queryTableData().then(() => { }, () => { });
			});

		this.columns.forEach((column) => {
			if (column.filterable) {
				this.columnFilterInputs[column.id] = new FormControl('');
				this.columnFilterInputs[column.id].valueChanges
					.subscribe(val => {
						this._queryTableData().then(() => { }, () => { });
					});
			}
		});
	}

	ngOnDestroy(): void {
		// this._columnsSubscription.unsubscribe();
	}

	newRecord($event) {
		this.newItemClicked.emit({ clicked: true });
	}

	_updateRows() {
		if (this.models) {
			this.rows.length = 0;
			try {
				this.models.forEach((model: any, index: number) => this.rows[index] = new SmdDataRowModel(model, false));
				this.rows.forEach((row, index) => row.originalOrder = index);
				this._setSelectedRows();
				this._updateVisibleRows();
			} catch (error) {
			}
		}
	}

	_matches(row: SmdDataRowModel, columns: SmdDataTableColumnComponent[], text: string): boolean {
		if (isNullOrUndefined(text) || text.trim() == '') {
			return true;
		}

		let subtexts: string[] = text.trim().split(" ");
		for (let subtext of subtexts) {
			for (let column of columns) {
				let value = column.getFieldValue(row.model);
				if (column.hasCustomTemplate) {
					value = row.model;
				}
			}
		}
		return false;
	}

	selectedRows(): SmdDataRowModel[] {
		return this.rows.filter(row => row.checked);
	}

	selectedModels(): any[] {
		return this.selectedRows().map(row => row.model);
	}

	_onMasterCheckChange() {
		if (this.selectPage == true)
			this.visibleRows
				.forEach(
					(row: SmdDataRowModel) => {
						if (row.checked != this.checked) {
							row.checked = this.checked;
							this.selectedRowCountFn(row);
						}
					}
				);
		else
			this.rows
				.forEach(
					(row: SmdDataRowModel) => {
						if (row.checked != this.checked) {
							row.checked = this.checked;
							this.selectedRowCountFn(row);
						}
					}
				);
		this.onAllRowsSelected.emit(this.checked);
		this.onAllRowsChecked.emit({
			model: this.visibleRows,
			checked: this.checked
		});
	}

	selectedRowCountFn(row) {
		if (this.primaryKey) {
			let length = this.primaryKey.length;
			let pK = "";
			this.primaryKey.forEach((primKey, i) => {
				pK = pK + ',' + row.model[primKey].toString();
			});
			var idx = this.checkedPKs.indexOf(pK);
			if (idx != -1) {
				this.selectedRowCount--;
				this.checkedPKs.splice(idx, 1);
				this.checkedRows.splice(idx, 1);
			}
			if (row.checked) {
				this.selectedRowCount++;
				this.checkedRows.push(row.model);
				this.checkedPKs.push(pK);
			}
		}
	}

	_onRowCheckChange(row: SmdDataRowModel) {
		let isMasterChecked = this.checked;
		this.selectedRowCountFn(row);
		if (row.checked) {
			if (this.rows.filter((row) => row.checked).length == this.rows.length) {
				this.checked = true;
			}
		} else {
			if (this.checked) {
				this.checked = false;
			}
		}
		this.onRowSelected.emit({
			model: row.model,
			checked: row.checked,
			selected: false
		});
		this.onRowChecked.emit({
			model: row.model,
			checked: row.checked
		});

		if (this.checked != isMasterChecked) {
			this.onAllRowsSelected.emit(this.checked);
		}

		if (this.checked != isMasterChecked) {
			this.onAllRowsChecked.emit({
				model: this.visibleRows,
				checked: this.checked
			});
		}

	}
	_onRowSelection(row: SmdDataRowModel, selected: false) {
		if (this.showSelectedRow) {
			if (this.selectedRow) {
				this.selectedRow.selected = false;
			}
			row.selected = true;
			this.selectedRow = row;
		}
		this.onRowSelected.emit({
			model: row.model,
			checked: row.checked,
			selected: selected
		});

	}

	_onFilter(event: any): void {
		this.paginatorComponent.reset();
		this._updateRows();
	}

	_sortColumn(column: SmdDataTableColumnComponent) {
		if (column.sortable) {
			this.columns.filter((col) => col.id != column.id).forEach((col) => col.sortDir = null);
			if (!column.sortDir) {
				column.sortDir = 'ASC';
			} else {
				column.sortDir = column.sortDir == 'ASC' ? 'DESC' : null;
			}
			this.sortDirection = column.sortDir;
			this.sortField = column.field;
			this._queryTableData().then(() => { }, () => { });
		}

	}

	_sortRows(a: any, b: any, sortDir: string = 'ASC') {
		let dir = (sortDir == 'ASC' ? 1 : -1);
		if (a > b) {
			return 1 * dir;
		}
		if (a < b) {
			return -1 * dir;
		}
		return 0;
	}

	_onPageChange() {
		if (this.paginatorComponent.currentPage.page < this.lastQueryExecutedPage || this.paginatorComponent.currentPage.page >= (this.lastQueryExecutedPage + this.preFetchPages)) {
			this._queryTableData().then(() => {
				this._updateVisibleRows();
				this.pageChange.emit({ page: this.paginatorComponent.currentPage.page });
			}, () => { });
		}
		else {
			this._updateVisibleRows();
			this.pageChange.emit({ page: this.paginatorComponent.currentPage.page });
		}
	}

	_columnTemplates() {
		return this.columns.toArray().map((c) => c.template);
	}

	_onCustomSearch(params: URLSearchParams): void {
		this.customFilter = params.get("filter") ? { "type": "group", "con": "and", "items": JSON.parse(params.get("filter")) } : null;
		this.customFilters = params.get("filters") ? JSON.parse(params.get("filters")) : null;
		this.params = params;
		this.paginatorComponent.reset();
		if (!(this.paginatorComponent.currentPage.page < this.lastQueryExecutedPage || this.paginatorComponent.currentPage.page >= (this.lastQueryExecutedPage + this.preFetchPages))) {
			this._queryTableData().then(() => {
				this._updateVisibleRows();
			}, () => { });
		}
	}

	public refresh(model: any[] = null) {
		if (model) {
			this.models = model;
			this._updateRows();
		}
		else {
			this._queryTableData().then(() => { }, () => { });
		}
	}

	public filterTable() {
		if (this.paginatorComponent) {
			this.paginatorComponent.currentPage.page = 1;
			this.selectedPage = 1;
		}
		this._queryTableData().then(() => { }, () => { });
	}


	// sortData(){
	// 	this.models =this.models.sort( (a,b)=>{
	// 				if(a.key < b.key)
	// 						return -1;
	// 				if(a.key>b.key)
	// 						return 1;
	// 				return 0;
	// 		} )	
	// }		
	sortInfo;

	private _queryTableData(): Promise<any> {
		return new Promise((resolve, reject) => {
			if (this.dataHeader && this.dataUrl) {
				this.loading = true;
				const size = this.paginatorComponent.currentPage.size ? this.paginatorComponent.currentPage.size : this.defaultRange;
				let page: number = (this.paginatorComponent.currentPage.page - (this.preFetchPages / 2)) <= 0 ? 1 : Math.round(this.paginatorComponent.currentPage.page - (this.preFetchPages / 2));
				let offset = (page - 1) * size + 1;
				// let offset = 1;
				let limit: number = this.preFetchPages * size;
				this.sortInfo = {
					field: this.sortField,
					direction: this.sortDirection
				}
				// console.log(" Direction is " + JSON.stringify(sortInfo) )

				/*
						this.params.paramsMap.set("offset", ['' + offset]);
						// this.params.paramsMap.set("limit", ['' + limit]);
						if (this.sortDirection != null) {
							// this.params.paramsMap.set("sort", ['' + this.sortField]);
							// this.params.paramsMap.set("direction", ['' + this.sortDirection]);
						} else {
							this.params.paramsMap.delete("sort");
							this.params.paramsMap.delete("direction");
						}
				*/

				/*
				 * Filter conditions START
				 */
				/*
					let filter = this.customFilter ? [this.customFilter] : [];
					let andFilters = {};
					let filters = this.customFilters ? this.customFilters : {};
					if (this.filterEnabled) {
						let andGrp = {
							"type": "group",
							"con": "and",
							"items": []
						};
						let orGrp = {
							"type": "group",
							"con": "and",
							"items": []
						};
				*/

				this.columns.forEach((column) => {
					if (column.filterable) {
						//Set Params Only when Search Box is not empty
						if (this.columnFilterInputs[column.id] && this.columnFilterInputs[column.id].value) {
							// console.log(column.field + "  and   " + this.columnFilterInputs[column.id].value)
							this.params.set(column.field, this.columnFilterInputs[column.id].value)

							// andGrp.items.push({
							// 	"type": "item",
							// 	"con": "and",
							// 	"operator": "startsWith",
							// 	"attr": column.field,
							// 	"value": this.columnFilterInputs[column.id].value.toLowerCase()
							// });
							// andFilters[column.field] = this.columnFilterInputs[column.id].value.toLowerCase();
						}
						else {
							this.params.delete(column.field)
						}
						/*
								if (column.filterable && this.filterInput.value) {
									// orGrp.items.push({
									// 	"type": "item",
									// 	"con": "or",
									// 	"operator": "startsWith",
									// 	"attr": column.field,
									// 	"value": this.filterInput.value.toLowerCase()
									// });
									// filters[column.field] = this.filterInput.value.toLowerCase();
								}
						*/
					}
				});
				/*
							if (andGrp.items.length > 0) {
								filter.push(andGrp);
							}
							if (orGrp.items.length > 0) {
								filter.push(orGrp);
							}
						}
						for (let key of Object.keys(this.preFilters)) {
							andFilters[key] = this.preFilters[key] + "<?EQ>";
						}
						this.params.set("filter", JSON.stringify(filter));
						this.params.set("filters", JSON.stringify(filters));
						this.params.set("andFilters", JSON.stringify(andFilters));

							this.params.set("issueType","bigbug")
							this.params.set("key","hi")
				*/

				/*
				  Filter conditions END
				*/

				this.token = Math.random();


				/*
						TODO call API
						this.apiClass.get('/' + this.dataUrl, this.params, this.token).subscribe(data => {
							if (data.status && typeof data.status === 'number') {
								if (data.status == 200) {
									data = data.data;
								}
								else {
									reject();
								}
							}
							if (this.token == data.token) {
								this.lastQueryExecutedPage = page;
								this.models = data[this.dataHeader];
								this.rowCount = data.count;
								this._updateRows();
								this.dataChange.emit({ offset: offset, limit: limit, data: data });
								resolve();
							} else {
								reject();
							}
							this.loading = false;
						}, (err) => {
							this.loading = false;
							reject();
						});
				*/
				this.apiClass.get(this.dataUrl, this.params).subscribe(
					(data: any[]) => {
						//  console.log("DAta is  "+ JSON.stringify(data))

						this.lastQueryExecutedPage = page;
						//this.models = data[this.dataHeader];

						//DONE : Sort Received Data Based on Parameter
						let sortParam = this.sortInfo;
						let newKey = sortParam.field;
						let direction = sortParam.direction;
						// let temp = data
						if(this.dataUrl !== "logs"){
								data = data.sort((a, b) => {
									
																
									
									if (direction == "ASC") {
										// a[newKey] =a[newKey].toUpperCase()
										// b[newKey] =b[newKey].toUpperCase()
										if (a[newKey].toUpperCase() < b[newKey].toUpperCase())
											return -1;
										if (a[newKey].toUpperCase() > b[newKey].toUpperCase())
											return 1;
										return 0;
									}
									else if(direction ==="DESC"){
										// a[newKey] =a[newKey].toUpperCase()
										// b[newKey] =b[newKey].toUpperCase()
										if (a[newKey].toUpperCase() > b[newKey].toUpperCase())
											return -1;
										if (a[newKey].toUpperCase() < b[newKey].toUpperCase())
											return 1;
										return 0;

									}
								})
							}
						// console.log("Sorted data is   " + JSON.stringify(data))
						this.models = data
						this.rowCount = data.length;
						this._updateRows();
						this.dataChange.emit({ offset: offset, limit: limit, data: data });
						resolve();
					}
				)
			}
			else {
				reject();
			}
		});
	}

	private _updateVisibleRows() {
		if (this.paginated) {
			this.visibleRows = this.rows.filter((value: SmdDataRowModel, index: number) => this.paginatorComponent.currentPage.isInsidePage(index + ((this.lastQueryExecutedPage - 1) * this.paginatorComponent.currentPage.size)));
		} else {
			this.visibleRows = this.rows;
		}
		this._setHeaderCheckBox();
		if (this.primaryKey)
			this.visibleRows.forEach(row => {
				let pK = "";
				this.primaryKey.forEach((primKey, i) => {
					pK = pK + "," + row.model[this.primaryKey[i]].toString();
				});
				if (this.checkedPKs.indexOf(pK) != -1)
					row.checked = true;
			});
	}

	private _setSelectedRows() {
		if (this.checked) {
			this.visibleRows.forEach((row: SmdDataRowModel) => {
				row.checked = true;
			}
			);
		}
	}
	private _setHeaderCheckBox() {
		let flag = false;
		if (this.visibleRows && this.visibleRows.length > 0)
			flag = true;
		this.visibleRows.forEach((row: SmdDataRowModel) => {
			if (!row.checked) {
				flag = false;
			}
		}
		);
		this.checked = flag;
	}

	_shouldRenderCheckbox() {
		return this.showCheckBox;
	}

	ngAfterContentChecked() {
		if (this.primaryListing) {
			let domTable = this._viewContainer.element.nativeElement;
			let tr = domTable.querySelectorAll(".smd-table-body > table > tbody > tr")[0];
			if (tr) {
				let rowsHeight = (this.visibleRows.length * tr.offsetHeight) + 49;
				let viewHeight = domTable.offsetHeight - (this.paginated ? this.paginatorComponent.nativeElement.nativeElement.offsetHeight + 20 : 16);
				this.tableHeight = viewHeight < rowsHeight ? viewHeight : rowsHeight;
				let tds = tr.querySelectorAll("td");
				this.columns.forEach((column: SmdDataTableColumnComponent, index) => {
					if (this.paginated)
						index++;
					column.headerWidth = tds[index].offsetWidth - (column.title == ' ' ? 24 : 20);
				});
			}
		}
	}

}