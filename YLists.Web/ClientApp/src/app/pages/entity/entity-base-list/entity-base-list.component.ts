import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { RoutingService } from 'src/app/services/routing.service';
import { ApiModule } from 'src/app/api/api.generated';

@Component({
	selector: 'entity-base-list',
	templateUrl: './entity-base-list.component.html',
	styleUrls: ['./entity-base-list.component.scss']
})
export class EntityBaseListComponent implements OnInit {

	public templates$: Observable<ApiModule.EntityTemplateViewModel[]> = of([]);

	constructor(private entityTemplateClient: ApiModule.EntityTemplateClient,
				private routingService: RoutingService) {
	}

	ngOnInit(): void {
		this.templates$ = this.entityTemplateClient.getAll();
	}

	public routeToEntityList(templateId: string): void {
		this.routingService.navigateEntityList(templateId);
	}
}
