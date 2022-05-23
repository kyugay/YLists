import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { RoutingService } from 'src/app/services/routing.service';
import { ApiModule } from 'src/app/api/api.generated';

@Component({
	selector: 'category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

	public categories$: Observable<ApiModule.EntityViewModel[]> = of([]);

	constructor(private entityClient: ApiModule.EntityClient,
				private routingService: RoutingService) {
	}

	ngOnInit(): void {
		//this.entities$ = this.entityClient.getAll();
	}

	public addEntity(): void {
		this.routingService.navigateEntityCard();
	}

	public routeToEntity(entityId: string): void {
		this.routingService.navigateEntityCard(entityId);
	}
}
