import { Injectable } from '@angular/core';
import { DialogAction, DialogService, DialogRef, DialogCloseResult } from "@progress/kendo-angular-dialog";
import { Observable, of } from 'rxjs';
import { filter, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { ApiModule } from '../api/api.generated';

import { AddItemModalComponent } from '../components/modals/add-item-modal/add-item-modal.component';
import { EditFieldOptionsModalComponent } from '../components/modals/edit-field-options-modal/edit-field-options-modal.component';
// import { ItemSourceMasterService } from './item-source-master.service';
// import { FilterDto } from '../dtos/filter/filterDto';
// import { FilterTreeNodeDto } from '../dtos/filter/filterTreeNodeDto';
// import { RequestResult } from '../dtos/response/requestResult';
// import { AddItemModalComponent } from '../components/modals/add-item-modal/add-item-modal.component';
// import { UploadImageModalComponent } from '../components/modals/upload-image-modal/upload-image-modal.component';
// import { ImageSelectFormControlData } from '../models/inputs/ImageSelectFormControlData';

@Injectable()
export class ModalService {
	constructor(private dialogService: DialogService,
		private fieldOptionCollectionClient: ApiModule.FieldOptionCollectionClient,
		private categoryClient: ApiModule.CategoryClient)
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

	public showAddCategoryModal(parentId: string = null): Observable<string>
	{
		return this.showAddItemModal('Add new category').pipe(
			map(name => <ApiModule.CategoryViewModel>{ name, parentId }),
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

	// public showUploadImageModal(): Observable<ImageSelectFormControlData> {
	// 	const dialog: DialogRef = this.dialogService.open({
	// 		title: "Загрузить изображение",
	// 		content: UploadImageModalComponent,
	// 		actions: [{ text: "Отменить" }, { text: "Загрузить", themeColor: "primary" }]
	// 	});

	// 	return dialog.result.pipe(
	// 		filter(result => !(result instanceof DialogCloseResult) && (result as DialogAction).text === "Загрузить"),
	// 		switchMap(_ => of(dialog.content.instance.value))
	// 	);
	// }

	// public showAddItemModal(entity: string, parent: FilterTreeNodeDto = null): Observable<RequestResult> {
	// 	const dialog: DialogRef = this.dialogService.open({
	// 		title: "Добавить элемент",
	// 		content: AddItemModalComponent,
	// 		actions: [{ text: "Отменить" }, { text: "Добавить", themeColor: "primary" }]
	// 	});

	// 	return dialog.result.pipe(
	// 		filter(result => !(result instanceof DialogCloseResult) && (result as DialogAction).text === "Добавить"),
	// 		switchMap(_ => this.itemSourceMasterService.addItem(entity, dialog.content.instance.value, parent?.value))
	// 	);
	// }

	// public showDeleteItemModal(entity: string, item: FilterDto): Observable<RequestResult> {
	// 	const dialog: DialogRef = this.dialogService.open({
	// 		title: "Удалить элемент",
	// 		content: `Вы уверены, что хотите удалить элемент ${ item.text }?`,
	// 		actions: [{ text: "Отменить" }, { text: "Удалить", themeColor: "primary" }]
	// 	});
	
	// 	return dialog.result.pipe(
	// 		filter(result => !(result instanceof DialogCloseResult) && (result as DialogAction).text === "Удалить"),
	// 		switchMap(_ => this.itemSourceMasterService.deleteItem(entity, item.value))
	// 	);
	// }

	// public showDeleteTreeItemModal(entity: string, item: FilterTreeNodeDto): Observable<RequestResult> {
	// 	const dialog: DialogRef = this.dialogService.open({
	// 		title: "Удалить элемент",
	// 		content: `Вы уверены, что хотите удалить элемент ${ item.text }? Все вложенные элементы также будут удалены!`,
	// 		actions: [{ text: "Отменить" }, { text: "Удалить", themeColor: "primary" }]
	// 	});
	
	// 	return dialog.result.pipe(
	// 		filter(result => !(result instanceof DialogCloseResult) && (result as DialogAction).text === "Удалить"),
	// 		switchMap(_ => this.itemSourceMasterService.deleteItem(entity, item.value))
	// 	);
	// }

	// public showAddCategoryModal(parentId: string = null): Observable<RequestResult> {
	// 	const dialog: DialogRef = this.dialogService.open({
	// 		title: "Добавить категорию",
	// 		content: AddItemModalComponent,
	// 		actions: [{ text: "Отменить" }, { text: "Добавить", themeColor: "primary" }]
	// 	});

	// 	return dialog.result.pipe(
	// 		filter(result => !(result instanceof DialogCloseResult) && (result as DialogAction).text === "Добавить"),
	// 		switchMap(_ => this.itemSourceMasterService.addItem('category', dialog.content.instance.value, parentId))
	// 	);
	// }

	// public showDeleteCategoryModal(categoryId: string): Observable<RequestResult> {
	// 	const dialog: DialogRef = this.dialogService.open({
	// 		title: "Удалить категорию",
	// 		content: `Вы уверены, что хотите удалить эту категорию? Все вложенные элементы также будут удалены!`,
	// 		actions: [{ text: "Отменить" }, { text: "Удалить", themeColor: "primary" }]
	// 	});
	
	// 	return dialog.result.pipe(
	// 		filter(result => !(result instanceof DialogCloseResult) && (result as DialogAction).text === "Удалить"),
	// 		switchMap(_ => this.itemSourceMasterService.deleteItem('category', categoryId))
	// 	);
	// }
}