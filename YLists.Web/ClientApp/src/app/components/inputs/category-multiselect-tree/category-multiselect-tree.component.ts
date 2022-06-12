import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class CategoryMultiselectTreeComponent implements OnInit
{
    @Input() public templateId: string;
    @Input() public isSingle: boolean = false;
    @Input() public isEditable: boolean = true;

	public items: ApiModule.CategoryViewModel[] = [];

	@Input() public value: ApiModule.CategoryViewModel[];
    @Output() public valueChange: EventEmitter<ApiModule.CategoryViewModel[]> = new EventEmitter<ApiModule.CategoryViewModel[]>();

	public checkableSettings: MultiSelectTreeCheckableSettings = {
		checkChildren: false,
		checkOnClick: false
	};
	public isLoading: boolean = false;

	constructor(private categoryClient: ApiModule.CategoryClient,
        private modalService: ModalService)
    { }

    ngOnInit(): void
    {
        this.updateItems();
    }

    public updateItems(): void
    {
        this.isLoading = true;
        console.log(this.templateId);
        this.categoryClient.getTreeList(this.templateId)
            .pipe(
                first(),
                tap(_ => this.isLoading = false)
            )
            .subscribe(categories => this.items = categories.map(c => ApiModule.CategoryViewModel.fromJS(c)));
    }

    public onValueChange(event: ApiModule.CategoryViewModel[])
    {
        if (this.isSingle)
        {
            this.value = event.slice(-1);
            this.valueChange.emit(this.value);
        }
        else
            this.valueChange.emit(event);
    }

	public showAddCategoryModal(parentId: string = null): void
    {
		this.modalService.showAddCategoryModal(this.templateId, parentId)
            .subscribe(_ => this.updateItems());
	}

	public showDeleteCategoryModal(categoryId: string): void
    {
		this.modalService.showDeleteCategoryModal(categoryId)
            .subscribe(_ => this.updateItems());
	}
}
