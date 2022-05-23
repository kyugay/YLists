import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { RoutingService } from 'src/app/services/routing.service';
import { ApiModule } from 'src/app/api/api.generated';

@Component({
	selector: 'entity-list',
	templateUrl: './entity-list.component.html',
	styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnInit {

	public entities$: Observable<ApiModule.EntityViewModel[]> = of([]);

	constructor(private entityClient: ApiModule.EntityClient,
				private routingService: RoutingService) {
	}

	ngOnInit(): void {
		this.entities$ = this.entityClient.getAll();
	}

	public addEntity(): void {
		this.routingService.navigateEntityCard();
	}

	public routeToEntity(entityId: string): void {
		this.routingService.navigateEntityCard(entityId);
	}
}
