// import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
// import { MultiSelectComponent, VirtualizationSettings } from '@progress/kendo-angular-dropdowns';
// import { Observable } from 'rxjs';
// import { debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs/operators';

// import { ItemSourceMasterService } from 'src/app/services/item-source-master.service';
// import { FilterDto } from 'src/app/dtos/filter/filterDto';

// @Component({
// 	selector: 'app-filter-multiselect',
// 	templateUrl: './filter-multiselect.component.html',
// 	styleUrls: ['./filter-multiselect.component.scss']
// })
// export class FilterMultiselectComponent implements AfterViewInit {

// 	@Input() public entity: string;
// 	@Input() public label: string = '';

// 	public items$: Observable<Array<FilterDto>>;
// 	@Input() public value: Array<string>;
// 	@Output() public valueChange: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

// 	@ViewChild('multiselect') private multiselect: MultiSelectComponent | undefined;
// 	public virtual: VirtualizationSettings = { itemHeight: 36 };
// 	public isLoading: boolean = false;

// 	constructor(private itemSourceMasterService: ItemSourceMasterService) { }

// 	public ngAfterViewInit(): void {
// 		this.isLoading = true;
// 		this.items$ = this.getItems();
// 	}

// 	public getItems(): Observable<Array<FilterDto>> {
// 		return this.multiselect.filterChange.pipe(
// 			debounceTime(500),
// 			distinctUntilChanged(),
// 			startWith(''),
// 			tap(_ => this.isLoading = true),
// 			switchMap(v => this.itemSourceMasterService.getList(this.entity, v)
// 				.pipe(
// 					tap(_ => this.isLoading = false)
// 				)
// 			)
// 		);
// 	}

// 	public onChange(value: Array<string>): void {
// 		this.valueChange.emit(value);
// 	}
// }
