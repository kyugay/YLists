import { Component, OnInit } from '@angular/core';
import { ListBoxSelectionEvent } from '@progress/kendo-angular-listbox/selection.service'
import { first } from 'rxjs/operators'
import { ApiModule } from 'src/app/api/api.generated';
import { ModalService } from 'src/app/services/modal.service';

@Component({
	selector: 'edit-field-options-modal',
	templateUrl: './edit-field-options-modal.component.html',
	styleUrls: ['./edit-field-options-modal.component.scss']
})
export class EditFieldOptionsModalComponent implements OnInit
{
	public fieldOptionCollections: ApiModule.FieldOptionCollectionViewModel[] = [];

	public selectedItemIndex: number = -1;
	public selectedFieldOptionCollection: ApiModule.FieldOptionCollectionViewModel = null;

	constructor(private fieldOptionCollectionClient: ApiModule.FieldOptionCollectionClient,
		private modalService: ModalService)
	{ }

	ngOnInit(): void
	{
		this.fieldOptionCollectionClient.getAll()
			.pipe(first())
			.subscribe(collections => this.fieldOptionCollections = collections)
	}

	public fieldOptionCollectionSelectionChange(event: ListBoxSelectionEvent): void
	{
		this.selectedItemIndex = event.index;
		this.selectedFieldOptionCollection = event.index === -1 ? null : this.fieldOptionCollections[event.index];
	}

	public showAddFieldOptionCollectionModal(): void
	{
		this.modalService.showAddFieldOptionCollectionModal()
			.subscribe(collection => this.fieldOptionCollections.push(collection));
	}

	public showAddFieldOptionModal(): void
	{
		this.modalService.showAddFieldOptionModal()
			.subscribe(option => {
				if (this.selectedItemIndex !== -1)
					this.fieldOptionCollections[this.selectedItemIndex].fieldOptions.push(option);
			});
	}

	public deleteFieldOptionCollection(item: ApiModule.FieldOptionCollectionViewModel): void
	{
		const index = this.fieldOptionCollections.indexOf(item);
		this.fieldOptionCollections.splice(index, 1);
	}

	public deleteFieldOption(item: ApiModule.FieldOptionViewModel): void
	{
		if (this.selectedItemIndex === -1)
			return;

		const index = this.fieldOptionCollections[this.selectedItemIndex].fieldOptions.indexOf(item);
		this.fieldOptionCollections[this.selectedItemIndex].fieldOptions.splice(index, 1);
	}
}
