import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TileLayoutReorderEvent, TileLayoutResizeEvent } from '@progress/kendo-angular-layout';
import { first } from 'rxjs/operators';

import { ApiModule } from 'src/app/api/api.generated';
import { FieldTypeSelect } from 'src/app/models/entity-template/FieldTypeSelect';
import { ObjectFormService } from 'src/app/services/object-form.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
	selector: 'entity-template-card',
	templateUrl: './entity-template-card.component.html',
	styleUrls: ['./entity-template-card.component.scss']
})
export class EntityTemplateCardComponent implements OnInit
{
	private template: ApiModule.EntityTemplateViewModel;
	public templateForm: FormGroup;

	private _isNew: boolean = false;
	public get isNew(): boolean { return this._isNew; }
	public set isNew(value: boolean) { this._isNew = value; }

	private _isEdit: boolean = false;
	public get isEdit(): boolean { return this._isEdit; }
	public set isEdit(value: boolean)
	{
		this._isEdit = value;
		value ? this.templateForm.enable() : this.templateForm.disable();
	}

	public isSubmitted: boolean = false;

	public fieldTypeSelect: FieldTypeSelect[] =
	[
		{ value: ApiModule.FieldType.TextBox, text: 'Text' },
		{ value: ApiModule.FieldType.TextArea, text: 'Text Area' },
		{ value: ApiModule.FieldType.NumericTextBox, text: 'Number' },
		{ value: ApiModule.FieldType.DatePicker, text: 'Date' },
		{ value: ApiModule.FieldType.TimePicker, text: 'Time' },
		{ value: ApiModule.FieldType.Switch, text: 'Switch' },
		{ value: ApiModule.FieldType.RadioButtons, text: 'Radio Buttons' },
		{ value: ApiModule.FieldType.CheckBoxes, text: 'Checkboxes' },
		{ value: ApiModule.FieldType.ComboBox, text: 'Select' },
		{ value: ApiModule.FieldType.MultiSelect, text: 'Multiselect' },
		//{ value: ApiModule.FieldType.ItemCover, text: 'Item Cover' },
		//{ value: ApiModule.FieldType.CompleteSwitch, text: 'Complete' },
		{ value: ApiModule.FieldType.Files, text: 'Files' },
	];
	public fieldTypeWithOptions =
	{
		[ApiModule.FieldType.TextBox]: false,
		[ApiModule.FieldType.TextArea]: false,
		[ApiModule.FieldType.NumericTextBox]: false,
		[ApiModule.FieldType.DatePicker]: false,
		[ApiModule.FieldType.TimePicker]: false,
		[ApiModule.FieldType.Switch]: false,
		[ApiModule.FieldType.RadioButtons]: true,
		[ApiModule.FieldType.CheckBoxes]: true,
		[ApiModule.FieldType.ComboBox]: true,
		[ApiModule.FieldType.MultiSelect]: true,
		[ApiModule.FieldType.ItemCover]: false,
		[ApiModule.FieldType.CompleteSwitch]: false,
	};
	
	constructor (private entityTemplateClient: ApiModule.EntityTemplateClient,
		private activatedRoute: ActivatedRoute,
		private objectFormService: ObjectFormService,
		private routingService: RoutingService)
	{
		this.initForm();
		this.checkRouteParams();
	}

	ngOnInit(): void { }

	private checkRouteParams(): void
	{
		this.activatedRoute.paramMap
			.subscribe(params => {
				const id = params.get('id');
				this.isNew = !id || id === 'new';
				this.isEdit = this.isNew;

				if (!id || this.isNew)
					this.templateForm.markAllAsTouched();
				else
					this.getTemplate(id);
			}
		);
	}

	private initForm(): void
	{
		const emptyModel = ApiModule.EntityTemplateViewModel.fromJS({});
		this.updateForm(emptyModel, Object.keys(emptyModel.toJSON()) as Array<keyof ApiModule.EntityTemplateViewModel>);
	}

	private updateForm(model: ApiModule.EntityTemplateViewModel,
		keys: Array<keyof ApiModule.EntityTemplateViewModel> = Object.keys(model) as Array<keyof ApiModule.EntityTemplateViewModel>): void
	{
		this.template = model;
		this.templateForm = this.objectFormService.objectToForm(model, keys);

		this.templateForm.controls.name.setValidators(Validators.required);

		if (!this.templateForm.value.columns)
			this.templateForm.controls.columns.setValue(3);

		console.log(this.templateForm);
	}

	private isValidForm(): boolean
	{
		this.isSubmitted = true;

		if (!this.templateForm.valid)
			return false;

		this.isSubmitted = false;

		return true;
	}

	private updateModel(): void
	{
		console.log(this.templateForm);
		this.template = this.objectFormService.formToObject<ApiModule.EntityTemplateViewModel>(this.templateForm);
	}

	private getTemplate(id: string): void
	{
		this.entityTemplateClient.get(id)
			.pipe(first())
			.subscribe(
				model => this.updateForm(model),
				_ => this.closeCard()
			);
	}

	public saveTemplate(): void
	{
		if (!this.isValidForm())
			return;

		this.updateModel();

		console.log(this.template.id, !this.template.id ? 'create' : 'update');
		if (!this.template.id) {
			this.entityTemplateClient.create(this.template)
				.pipe(first())
				.subscribe(templateId => {
					this.isNew = this.isEdit = false;
					console.log(templateId);
					if (templateId)
						this.routingService.navigateEntityTemplateCard(templateId.toString());
				});
		} else {
			this.entityTemplateClient.update(this.template)
				.pipe(first())
				.subscribe(_ => this.isNew = this.isEdit = false);
		}
	}

	public deleteTemplate(): void
	{
		const templateId = this.templateForm.controls.id.value;

		if (!templateId)
			this.closeCard()
		else {
			this.entityTemplateClient.delete(templateId)
				.pipe(first())
				.subscribe(_ => this.closeCard())
		}
	}

	public addFormBlockMetadata(): void
	{
		const blocks = <FormArray>this.templateForm.controls.blocksMetadata;
		const blocksValue = blocks.value;

		const [rowSpan, columnSpan] = blocksValue.length !== 0 ?
			[blocksValue[blocksValue.length - 1].rowSpan, blocksValue[blocksValue.length - 1].columnSpan] :
			[1, 1];
		const order = blocksValue.length !== 0 ? Math.max(...blocksValue.map(b => b.order)) + 1 : 0;

		const newBlock = ApiModule.BlockMetadataViewModel.fromJS({ order, rowSpan, columnSpan });
		const newBlockFormGroup = this.objectFormService.objectToForm(newBlock,
			Object.keys(newBlock) as Array<keyof ApiModule.BlockMetadataViewModel>
		);

		blocks.push(newBlockFormGroup);
	}

	public deleteFormBlockMetadata(blockFormGroup: FormGroup): void
	{
		const blocks = <FormArray>this.templateForm.controls.blocksMetadata;

		const blockToDelete = blockFormGroup.value;
		const blockToDeleteIndex = blocks.controls.map(c => c.value).findIndex(block => !blockToDelete.id ?
			block.order == blockToDelete.order :
			block.id == blockToDelete.id);

		if (blockToDeleteIndex !== -1)
		{
			blocks.removeAt(blockToDeleteIndex);

			blocks.controls.map(c => <FormGroup>c).forEach(block => {
				if (block.value.order > blockToDelete.order)
					block.controls.order.setValue(block.value.order - 1);
			});
		}
	}

	public addFormFieldMetadata(blockFormGroup: FormGroup): void
	{
		const fields = <FormArray>blockFormGroup?.controls.fieldsMetadata;
		const fieldsValue = fields.value;

		// const [rowSpan, columnSpan] = fieldsValue.length !== 0 ?
		// 	[fieldsValue[fieldsValue.length - 1].rowSpan, fieldsValue[fieldsValue.length - 1].columnSpan] :
		// 	[blockFormGroup?.controls.columnSpan.value, 1];
		const order = fieldsValue.length !== 0 ? Math.max(...fieldsValue.map(f => f.order)) + 1 : 0;

		const newField = ApiModule.FieldMetadataViewModel.fromJS({ order, type: ApiModule.FieldType.TextBox });
		const newFieldFormGroup = this.objectFormService.objectToForm(newField,
			Object.keys(newField) as Array<keyof ApiModule.FieldMetadataViewModel>
		);

		fields.push(newFieldFormGroup);
	}

	public deleteFormFieldMetadata(blockFormGroup: FormGroup, fieldFormGroup: FormGroup): void
	{
		const fields = <FormArray>blockFormGroup.controls.fieldsMetadata;

		const fieldToDelete = fieldFormGroup.value;
		const fieldToDeleteIndex = fields.controls.map(c => c.value).findIndex(field => !fieldToDelete.id ?
			field.order == fieldToDelete.order :
			field.id == fieldToDelete.id);

		if (fieldToDeleteIndex !== -1)
		{
			fields.removeAt(fieldToDeleteIndex);

			fields.controls.map(c => <FormGroup>c).forEach(field => {
				if (field.value.order > fieldToDelete.order)
					field.controls.order.setValue(field.value.order - 1);
			});
		}
	}

	public onBlockReorder(e: TileLayoutReorderEvent): void
	{
		const [min, max, sign] = [
			Math.min(e.oldIndex, e.newIndex),
			Math.max(e.oldIndex, e.newIndex),
			Math.sign(e.oldIndex - e.newIndex)
		]

		const blocks = <FormArray>this.templateForm?.controls.blocksMetadata;

		blocks.controls.map(c => <FormGroup>c).forEach(block => {
			if (block.value.order == e.oldIndex)
				block.controls.order.setValue(e.newIndex);
			else if (block.value.order >= min && block.value.order <= max)
				block.controls.order.setValue(block.controls.order.value + sign);
		});
	}

	public onBlockResize(e: TileLayoutResizeEvent): void
	{
		const blocks = <FormArray>this.templateForm?.controls.blocksMetadata;

		const blockIndex = blocks.controls.map(c => <FormGroup>c)
			.findIndex(block => block.controls.order.value == e.item.order);
		const block = <FormGroup>blocks.controls[blockIndex];

		block.controls.rowSpan.setValue(e.newRowSpan);
		block.controls.columnSpan.setValue(e.newColSpan);
	}

	public closeCard(): void
	{
		this.routingService.navigateEntityTemplateList();
	}
}
