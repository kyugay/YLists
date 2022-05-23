// import { AfterViewInit, Component, EventEmitter, Input, ViewChild } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { MultiSelectComponent, VirtualizationSettings } from '@progress/kendo-angular-dropdowns';
// import { Observable, of } from 'rxjs';
// import { debounceTime, distinctUntilChanged, mapTo, mergeAll, startWith, switchMap, tap } from 'rxjs/operators';

// import { ItemSourceMasterService } from 'src/app/services/item-source-master.service';
// import { ModalService } from 'src/app/services/modal.service';
// import { FilterDto } from 'src/app/dtos/filter/filterDto';

// @Component({
// 	selector: 'app-actionable-multiselect',
// 	templateUrl: './actionable-multiselect.component.html',
// 	styleUrls: ['./actionable-multiselect.component.scss'],
// 	providers: [
// 		{
// 			provide: NG_VALUE_ACCESSOR,
// 			multi:true,
// 			useExisting: ActionableMultiselectComponent
// 		}
// 	]
// })
// export class ActionableMultiselectComponent implements ControlValueAccessor, AfterViewInit {

// 	@Input() public entity: string;

// 	public items$: Observable<Array<FilterDto>>;
// 	private _value: Array<string>;
// 	public get value(): Array<string> {
// 		return this._value;
// 	}
// 	public set value(value: Array<string>) {
// 		this._value = value;
// 		this.onChange(value);
// 	}

// 	@ViewChild('multiselect') private multiselect: MultiSelectComponent | undefined;
// 	public virtual: VirtualizationSettings = { itemHeight: 36 };
// 	public isLoading: boolean = false;

// 	private updateItemsEvent: EventEmitter<void> = new EventEmitter();

// 	public onChange: any = (_: string) => {};
// 	public onTouched: any = () => {};

// 	public touched = false;
// 	public disabled = false;

// 	constructor(private itemSourceMasterService: ItemSourceMasterService,
// 				private modalService: ModalService) { }

// 	public writeValue(obj: any): void {
// 		this.value = obj;
// 	}

// 	public registerOnChange(fn: any): void {
// 		this.onChange = fn;
// 	}

// 	public registerOnTouched(fn: any): void {
// 		this.onTouched = fn;
// 	}

// 	public setDisabledState?(isDisabled: boolean): void {
// 		this.disabled = isDisabled;
// 	}

// 	public markAsTouched() {
// 		if (!this.touched) {
// 			this.onTouched();
// 			this.touched = true;
// 		}
// 	}

// 	public ngAfterViewInit(): void {
// 		this.isLoading = true;
// 		this.items$ = this.getItems();
// 	}

// 	public getItems(): Observable<Array<FilterDto>> {
// 		const filterChange$ = this.multiselect.filterChange.pipe(
// 			debounceTime(500),
// 			distinctUntilChanged(),
// 			startWith('')
// 		);
// 		const updateItemsChange$ = this.updateItemsEvent.pipe(mapTo(''));

// 		return of(filterChange$, updateItemsChange$).pipe(
// 			mergeAll(),
// 			tap(_ => this.isLoading = true),
// 			switchMap(v => this.itemSourceMasterService.getList(this.entity, v)
// 				.pipe(
// 					tap(_ => this.isLoading = false)
// 				)
// 			)
// 		);
// 	}

// 	public showAddItemModal(): void {
// 		this.modalService.showAddItemModal(this.entity).subscribe(res => {
// 			if (!res.isError) {
// 				this.updateItemsEvent.emit();
// 			}
// 		});
// 	}

// 	public showDeleteItemModal(item: FilterDto): void {
// 		this.modalService.showDeleteItemModal(this.entity, item).subscribe(res => {
// 			if (!res.isError) {
// 				this.updateItemsEvent.emit();
// 			}
// 		});
// 	}
// }
