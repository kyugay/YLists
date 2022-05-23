// import { AfterViewInit, Component, EventEmitter, Input } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { MultiSelectTreeCheckableSettings } from '@progress/kendo-angular-dropdowns';
// import { Observable, of } from 'rxjs';
// import { first, startWith, switchMap, tap } from 'rxjs/operators';

// import { ItemSourceMasterService } from 'src/app/services/item-source-master.service';
// import { ModalService } from 'src/app/services/modal.service';
// import { FilterTreeNodeDto } from 'src/app/dtos/filter/filterTreeNodeDto';

// @Component({
// 	selector: 'app-actionable-multiselect-tree',
// 	templateUrl: './actionable-multiselect-tree.component.html',
// 	styleUrls: ['./actionable-multiselect-tree.component.scss'],
// 	providers: [
// 		{
// 			provide: NG_VALUE_ACCESSOR,
// 			multi:true,
// 			useExisting: ActionableMultiselectTreeComponent
// 		}
// 	]
// })
// export class ActionableMultiselectTreeComponent implements ControlValueAccessor, AfterViewInit {

// 	@Input() public entity: string;

// 	public items$: Observable<Array<FilterTreeNodeDto>> = of([]);
// 	private _value: Array<string>;
// 	public get value(): Array<string> {
// 		return this._value;
// 	}
// 	public set value(value: Array<string>) {
// 		this._value = value;
// 		this.onChange(value);
// 	}
// 	public dataItems: Array<FilterTreeNodeDto>;

// 	public checkableSettings: MultiSelectTreeCheckableSettings = {
// 		checkChildren: false,
// 		checkOnClick: false
// 	};
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
// 		this.items$.pipe(first()).subscribe(nodes => {
// 			let findAllNodes = (children: Array<FilterTreeNodeDto>) => {
// 				const res = [];
// 				for (let child of children) {
// 					if (this.value.includes(child.value))
// 						res.push(child);
// 					if (child.children?.length)
// 						findAllNodes(child.children).forEach(n => res.push(n));
// 				}
// 				return res;
// 			};
// 			this.dataItems = findAllNodes(nodes);
// 		});
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

// 	public getItems(): Observable<Array<FilterTreeNodeDto>> {
// 		return this.updateItemsEvent.pipe(
// 			startWith(''),
// 			tap(_ => this.isLoading = true),
// 			switchMap(_ => this.itemSourceMasterService.getTreeList(this.entity)
// 				.pipe(
// 					tap(_ => this.isLoading = false)
// 				)
// 			)
// 		);
// 	}

// 	public showAddItemModal(parentItem: FilterTreeNodeDto = null): void {
// 		this.modalService.showAddItemModal(this.entity, parentItem).subscribe(res => {
// 			if (!res.isError) {
// 				this.updateItemsEvent.emit();
// 			}
// 		});
// 	}

// 	public showDeleteTreeItemModal(item: FilterTreeNodeDto): void {
// 		this.modalService.showDeleteTreeItemModal(this.entity, item).subscribe(res => {
// 			if (!res.isError) {
// 				this.updateItemsEvent.emit();
// 			}
// 		});
// 	}
// }
