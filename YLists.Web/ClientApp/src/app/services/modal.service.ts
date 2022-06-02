import { Injectable } from '@angular/core';
import { DialogAction, DialogService, DialogRef, DialogCloseResult } from "@progress/kendo-angular-dialog";
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ApiModule } from '../api/api.generated';

import { AddItemModalComponent } from '../components/modals/add-item-modal/add-item-modal.component';
import { CategorizeModalComponent } from '../components/modals/categorize-modal/categorize-modal.component';
import { EditFieldOptionsModalComponent } from '../components/modals/edit-field-options-modal/edit-field-options-modal.component';
import { TrainModalComponent } from '../components/modals/train-modal/train-modal.component';
import { TrainItem } from '../models/inputs/TrainItem';

@Injectable()
export class ModalService {
	constructor(private dialogService: DialogService,
		private fieldOptionCollectionClient: ApiModule.FieldOptionCollectionClient,
		private categoryClient: ApiModule.CategoryClient,
		private modelClient: ApiModule.ModelClient)
	{ }

	public showEditFieldOptionsModal(): Observable<void>
	{
		const dialog: DialogRef = this.dialogService.open({
			title: 'Edit field options',
			content: EditFieldOptionsModalComponent,
			actions: [{ text: 'Cancel' }, { text: 'Save', themeColor: 'primary' }]
		});

		return dialog.result.pipe(
			filter(result => !(result instanceof DialogCloseResult) && (result as DialogAction).text === 'Save'),
			switchMap(_ => this.fieldOptionCollectionClient.updateRange(dialog.content.instance.fieldOptionCollections))
		);
	}

	public showAddItemModal(title: string = 'Add new item'): Observable<string> {
		const dialog: DialogRef = this.dialogService.open({
			title,
			content: AddItemModalComponent,
			actions: [{ text: 'Cancel' }, { text: 'Add', themeColor: 'primary' }]
		});

		return dialog.result.pipe(
			filter(result => !(result instanceof DialogCloseResult) && (result as DialogAction).text === 'Add'),
			switchMap(_ => of(dialog.content.instance.value))
		);
	}

	public showAddFieldOptionCollectionModal(): Observable<ApiModule.FieldOptionCollectionViewModel>
	{
		return this.showAddItemModal('Add new colelction').pipe(
			map(name => ApiModule.FieldOptionCollectionViewModel.fromJS({ name }))
		);
	}

	public showAddFieldOptionModal(): Observable<ApiModule.FieldOptionViewModel>
	{
		return this.showAddItemModal('Add new option').pipe(
			map(value => ApiModule.FieldOptionViewModel.fromJS({ value }))
		);
	}

	public showAddCategoryModal(templateId: string, parentId: string = null): Observable<string>
	{
		return this.showAddItemModal('Add new category').pipe(
			map(name => <ApiModule.CategoryViewModel>{ name, parentId, entityTemplateId: templateId }),
			switchMap(category => this.categoryClient.create(category))
		);
	}

	public showDeleteTreeItemModal(entity: string = 'item'): Observable<void>
	{
		const dialog: DialogRef = this.dialogService.open({
			title: `Delete ${entity}`,
			content: `Are you sure you want to delete the ${entity}? All nested elements will also be removed!`,
			actions: [{ text: 'Cancel' }, { text: 'Delete', themeColor: 'primary' }]
		});

		return dialog.result.pipe(
			filter(result => !(result instanceof DialogCloseResult) && (result as DialogAction).text === 'Delete'),
			switchMap(_ => of(void 0))
		);
	}

	public showDeleteCategoryModal(categoryId: string): Observable<void>
	{
		return this.showDeleteTreeItemModal('category').pipe(
			switchMap(_ => this.categoryClient.delete(categoryId))
		);
	}

	public showTrainModal(): Observable<void>
	{
		const dialog: DialogRef = this.dialogService.open({
			title: `Train model`,
			content: TrainModalComponent,
			actions: [{ text: 'Cancel' }, { text: 'Train', themeColor: 'primary' }]
		});

		return dialog.result.pipe(
			filter(result => !(result instanceof DialogCloseResult) && (result as DialogAction).text === 'Train'),
			map(_ => <TrainItem>dialog.content.instance.value),
			switchMap(item => !item.files?.length ?
				this.modelClient.trainFromTemplate(item.name, item.language, item.templateId) :
				this.modelClient.trainFromFile(item.name, item.language, item.templateId, <ApiModule.FileParameter> { data: item.files[0], fileName: item.files[0].name }))
		);
	}

	public showGetModelModal(templateId: string): Observable<string>
	{
		const dialog: DialogRef = this.dialogService.open({
			title: `Select model`,
			content: CategorizeModalComponent,
			actions: [{ text: 'Cancel' }, { text: 'Select', themeColor: 'primary' }]
		});
		
		const instanse = dialog.content.instance as CategorizeModalComponent;
		instanse.templateId = templateId;

		return dialog.result.pipe(
			filter(result => !(result instanceof DialogCloseResult) && (result as DialogAction).text === 'Select'),
			switchMap(_ => of(instanse.modelId))
		);
	}
}