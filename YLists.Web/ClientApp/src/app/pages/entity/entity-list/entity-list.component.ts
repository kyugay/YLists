import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { RoutingService } from 'src/app/services/routing.service';
import { ApiModule } from 'src/app/api/api.generated';

@Component({
	selector: 'entity-list',
	templateUrl: './entity-list.component.html',
	styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnInit
{
	private templateId: string;
	private categoryId: string;

	public categories$: Observable<ApiModule.CategoryViewModel[]> = of([]);
	public entities$: Observable<ApiModule.EntityViewModel[]> = of([]);

	constructor(private activatedRoute: ActivatedRoute,
				private categoryClient: ApiModule.CategoryClient,
				private entityClient: ApiModule.EntityClient,
				private routingService: RoutingService)
	{
		this.checkRouteParams();
	}

	private checkRouteParams(): void
	{
		combineLatest([this.activatedRoute.paramMap, this.activatedRoute.queryParamMap])
			.pipe(map(([paramMap, queryParamMap]) => ({ paramMap, queryParamMap })))
			.subscribe(params => {
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

				this.categories$ = this.categoryClient.getAllQueried(categoryQuery);
				this.entities$ = this.entityClient.getAllQueried(entityQuery)
					.pipe(map(entities => !this.categoryId ?
						entities.filter(e => !e.categories || e.categories.length == 0) :
						entities.filter(e => e.categories.findIndex(c => c.id === this.categoryId) !== -1)
					));
			});
	}

	ngOnInit(): void
	{
		//this.entities$ = this.entityClient.getAll();
	}

	public addEntity(): void
	{
		this.routingService.navigateEntityCard(this.templateId, this.categoryId);
	}

	public routeToEntity(entityId: string): void
	{
		this.routingService.navigateEntityCard(this.templateId, this.categoryId, entityId);
	}

	public routeToCategory(categoryId: string): void
	{
		this.routingService.navigateEntityList(this.templateId, categoryId);
	}
}
