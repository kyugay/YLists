import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { RoutingService } from 'src/app/services/routing.service';
import { ApiModule } from 'src/app/api/api.generated';

@Component({
	selector: 'entity-template-list',
	templateUrl: './entity-template-list.component.html',
	styleUrls: ['./entity-template-list.component.scss']
})
export class EntityTemplateListComponent implements OnInit {

	public templates$: Observable<ApiModule.EntityTemplateViewModel[]> = of([]);

	constructor(private entityTemplateClient: ApiModule.EntityTemplateClient,
				private routingService: RoutingService) {
	}

	ngOnInit(): void {
		this.templates$ = this.entityTemplateClient.getAll();
	}

	public addTemplate(): void {
		this.routingService.navigateEntityTemplateCard();
	}

	public routeToTemplate(templateId: string): void {
		this.routingService.navigateEntityTemplateCard(templateId);
	}
}
