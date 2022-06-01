import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { ApiModule } from 'src/app/api/api.generated';
import { ObjectFormService } from 'src/app/services/object-form.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
	selector: 'entity-card',
	templateUrl: './entity-card.component.html',
	styleUrls: ['./entity-card.component.scss']
})
export class EntityCardComponent implements OnInit
{
	public entityId: string;
	public templateId: string;
	public categoryId: string;

	public entity: ApiModule.EntityViewModel;
	public entityForm: FormGroup;

	public categories: ApiModule.CategoryViewModel[] = [];

	public entityTemplates$: Observable<ApiModule.EntityTemplateViewModel[]> = of([]);

	private _isNew: boolean = false;
	public get isNew(): boolean { return this._isNew; }
	public set isNew(value: boolean) { this._isNew = value; }

	private _isEdit: boolean = false;
	public get isEdit(): boolean { return this._isEdit; }
	public set isEdit(value: boolean)
	{
		this._isEdit = value;
		value ? this.entityForm.enable() : this.entityForm.disable();
	}

	public isSubmitted: boolean = false;
	
	constructor(private categoryClient: ApiModule.CategoryClient,
		private entityClient: ApiModule.EntityClient,
		private entityTemplateClient: ApiModule.EntityTemplateClient,
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
		combineLatest([this.activatedRoute.paramMap, this.activatedRoute.queryParamMap])
			.pipe(map(([paramMap, queryParamMap]) => ({ paramMap, queryParamMap })))
			.subscribe(params => {
				this.entityId = params.paramMap.get('entityId');
				this.templateId = params.queryParamMap.get('templateId');
				this.categoryId = params.queryParamMap.get('categoryId');

				this.isNew = !this.entityId || this.entityId === 'new';
				this.isEdit = this.isNew;

				this.setEntityTemplates();
				if (!this.entityId || this.isNew) {
					this.entityForm.markAllAsTouched();

					if (this.templateId)
					{
						this.entityTemplateClient.get(this.templateId)
							.subscribe(template => this.entityTemplateChange(template));
					}

					if (this.categoryId)
					{
						this.categoryClient.get(this.categoryId)
							.subscribe(category => this.categories.push(category));
					}
				}
				else
					this.getEntity(this.entityId);
			});
	}

	private initForm(): void
	{
		const emptyModel = ApiModule.EntityViewModel.fromJS({});

		emptyModel.createdDate = new Date();

		this.updateForm(emptyModel, Object.keys(emptyModel.toJSON()) as Array<keyof ApiModule.EntityViewModel>);
	}

	private updateForm(model: ApiModule.EntityViewModel,
		keys: Array<keyof ApiModule.EntityViewModel> = Object.keys(model) as Array<keyof ApiModule.EntityViewModel>): void
	{
		this.entity = model;
		this.categories = model.categories.map(c => <ApiModule.CategoryViewModel>c);

		const form = this.objectFormService.objectToForm(model, keys);

		form.controls.name.setValidators(Validators.required);

		this.entityForm = form;
	}

	private isValidForm(): boolean
	{
		this.isSubmitted = true;
		if (!this.entityForm.valid)
			return false;

		this.isSubmitted = false;

		return true;
	}

	private updateModel(): void
	{
		this.entity = this.objectFormService.formToObject<ApiModule.EntityViewModel>(this.entityForm);
		this.entity.categories = this.categories.map(c => <ApiModule.EntityCategoryViewModel>c);
	}

	private setEntityTemplates(): void
	{
		this.entityTemplates$ = this.entityTemplateClient.getAll();
	}

	public entityTemplateChange(value: ApiModule.EntityTemplateViewModel): void
	{
		this.templateId = value.id;

		const templateForm = this.objectFormService.objectToForm(value);

		this.entityForm.setControl('entityTemplate', templateForm);
	}

	private getEntity(id: string): void
	{
		this.entityClient.get(id)
			.pipe(first())
			.subscribe(
				model => this.updateForm(model),
				_ => this.closeCard()
			);
	}

	public saveEntity(): void
	{
		if (!this.isValidForm())
			return;

		this.updateModel();

		if (!this.entityForm.value.id)
		{
			this.entityClient.create(this.entity)
				.pipe(first())
				.subscribe(entityId => {
					this.isNew = this.isEdit = false;
					if (entityId)
						this.routingService.navigateEntityCard(this.templateId, this.categoryId, entityId);
				});
		}
		else
		{
			this.entityClient.update(this.entity)
				.pipe(first())
				.subscribe(_ => this.isNew = this.isEdit = false);
		}
	}

	public deleteEntity(): void
	{
		const entityId = this.entityForm.value.id;

		if (!entityId)
			this.closeCard()
		else {
			this.entityClient.delete(entityId)
				.pipe(first())
				.subscribe(_ => this.closeCard())
		}
	}

	public closeCard(): void
	{
		this.routingService.navigateEntityList(this.templateId, this.categoryId);
	}
}
