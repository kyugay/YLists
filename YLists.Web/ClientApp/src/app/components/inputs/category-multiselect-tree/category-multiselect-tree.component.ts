import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiSelectTreeCheckableSettings } from '@progress/kendo-angular-dropdowns';
import { Observable, of } from 'rxjs';
import { first, startWith, switchMap, tap } from 'rxjs/operators';

import { ModalService } from 'src/app/services/modal.service';
import { ApiModule } from 'src/app/api/api.generated';

@Component({
	selector: 'category-multiselect-tree',
	templateUrl: './category-multiselect-tree.component.html',
	styleUrls: ['./category-multiselect-tree.component.scss']
})
export class CategoryMultiselectTreeComponent
{
	public items: ApiModule.CategoryViewModel[] = [];

	@Input() public value: ApiModule.CategoryViewModel[];
    @Output() public valueChange: EventEmitter<ApiModule.CategoryViewModel[]> = new EventEmitter<ApiModule.CategoryViewModel[]>();

	public checkableSettings: MultiSelectTreeCheckableSettings = {
		checkChildren: false,
		checkOnClick: false
	};
	public isLoading: boolean = false;

	constructor(private categoryClient: ApiModule.CategoryClient,
        private modalService: ModalService,
        private cdr: ChangeDetectorRef)
    {
        this.updateItems();
    }

    public updateItems(): void
    {
        this.isLoading = true;

        this.categoryClient.getTreeList()
            .pipe(
                first(),
                tap(_ => this.isLoading = false)
            )
            .subscribe(categories => this.items = categories);
    }

    public onValueChange(event: ApiModule.CategoryViewModel[])
    {
        this.valueChange.emit(event);
    }

	public showAddCategoryModal(parentId: string = null): void
    {
		this.modalService.showAddCategoryModal(parentId).pipe(tap(_=>console.log('add cat', _)))
            .subscribe(_ => this.updateItems());
	}

	public showDeleteCategoryModal(categoryId: string): void
    {
		this.modalService.showDeleteCategoryModal(categoryId)
            .subscribe(_ => this.updateItems());
	}
}
