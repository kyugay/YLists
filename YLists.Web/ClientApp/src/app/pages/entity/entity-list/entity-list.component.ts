import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { RoutingService } from 'src/app/services/routing.service';
import { ApiModule } from 'src/app/api/api.generated';
import { NotifyService } from 'src/app/services/notify.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
	selector: 'entity-list',
	templateUrl: './entity-list.component.html',
	styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnInit
{
	public sharedAccessId: string;

	private templateId: string;
	private categoryId: string;

	public categories$: Observable<ApiModule.CategoryViewModel[]> = of([]);
	public entities$: Observable<ApiModule.EntityViewModel[]> = of([]);

	constructor(private activatedRoute: ActivatedRoute,
				private categoryClient: ApiModule.CategoryClient,
				private entityClient: ApiModule.EntityClient,
				private sharedAccessClient: ApiModule.SharedAccessClient,
				private routingService: RoutingService,
				private notifyService: NotifyService,
				private clipboardService: ClipboardService)
	{
		this.checkRouteParams();
	}

	private checkRouteParams(): void
	{
		combineLatest([this.activatedRoute.paramMap, this.activatedRoute.queryParamMap])
			.pipe(map(([paramMap, queryParamMap]) => ({ paramMap, queryParamMap })))
			.subscribe(params => {
				this.sharedAccessId = params.paramMap.get('sharedAccessId');

				this.templateId = params.paramMap.get('templateId');
				this.categoryId = params.queryParamMap.get('categoryId');

				const categoryQuery = <ApiModule.CategoryQuery> { filterExpressions: [] };
				const entityQuery = <ApiModule.EntityQuery> { filterExpressions: [] };

				if (this.templateId)
				{
					categoryQuery.filterExpressions.push(<ApiModule.FilterExpression> {
						constraints: [ <ApiModule.FilterConstraint> { constraintType: ApiModule.ConstraintType.Equals, value: this.templateId } ],
						propertyName: 'entityTemplateId',
						dataType: ApiModule.DataType.Text,
						constraintsBehavior: ApiModule.ConstraintsBehavior.All
					});

					entityQuery.filterExpressions.push(<ApiModule.FilterExpression> {
						constraints: [ <ApiModule.FilterConstraint> { constraintType: ApiModule.ConstraintType.Equals, value: this.templateId } ],
						propertyName: 'entityTemplateId',
						dataType: ApiModule.DataType.Text,
						constraintsBehavior: ApiModule.ConstraintsBehavior.All
					});
				}

				categoryQuery.filterExpressions.push(<ApiModule.FilterExpression> {
					constraints: [ <ApiModule.FilterConstraint> { constraintType: ApiModule.ConstraintType.Equals, value: this.categoryId || null } ],
					propertyName: 'parentId',
					dataType: ApiModule.DataType.Text,
					constraintsBehavior: ApiModule.ConstraintsBehavior.All
				});

				this.categories$ = !this.sharedAccessId ?
					this.categoryClient.getAllQueried(categoryQuery) :
					this.sharedAccessClient.getAllQueriedCategories(this.sharedAccessId, categoryQuery);
				
				const entitiesApiMethod = !this.sharedAccessId ?
					this.entityClient.getAllQueried(entityQuery) :
					this.sharedAccessClient.getAllQueriedEntities(this.sharedAccessId, entityQuery);
				this.entities$ = entitiesApiMethod
					.pipe(map(entities => !this.categoryId ?
						entities.filter(e => !e.categories || e.categories.length == 0) :
						entities.filter(e => e.categories.findIndex(c => c.id === this.categoryId) !== -1)
					));
			});
	}

	ngOnInit(): void { }

	public addEntity(): void
	{
		if (this.sharedAccessId)
			return;

		this.routingService.navigateEntityCard(this.templateId, this.categoryId);
	}

	public routeToEntity(entityId: string): void
	{
		!this.sharedAccessId ?
			this.routingService.navigateEntityCard(this.templateId, this.categoryId, entityId) :
			this.routingService.navigateSharedEntityCard(this.sharedAccessId, this.templateId, this.categoryId, entityId);
	}

	public routeToCategory(categoryId: string): void
	{
		!this.sharedAccessId ?
			this.routingService.navigateEntityList(this.templateId, categoryId) :
			this.routingService.navigateSharedEntityList(this.sharedAccessId, this.templateId, categoryId);
	}

	public share(): void
	{
		if (this.sharedAccessId)
			return;

		const sharedAccessData = !this.categoryId ?
			{ type: ApiModule.SharedAccessType.ForTemplate, templateId: this.templateId } :
			{ type: ApiModule.SharedAccessType.ForCategory, templateId: this.templateId, categoryId: this.categoryId };
		const sharedAccessModel = ApiModule.SharedAccessViewModel.fromJS(sharedAccessData);

		this.sharedAccessClient
			.create(sharedAccessModel)
			.subscribe(sharedLink => {
				this.clipboardService.copy(sharedLink);
				this.notifyService.showInfo('Link copied to clipboard');
			});
	}
}
