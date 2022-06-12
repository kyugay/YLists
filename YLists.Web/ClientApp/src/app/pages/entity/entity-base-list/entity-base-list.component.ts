import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClipboardService } from 'ngx-clipboard';

import { ApiModule } from 'src/app/api/api.generated';
import { RoutingService } from 'src/app/services/routing.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
	selector: 'entity-base-list',
	templateUrl: './entity-base-list.component.html',
	styleUrls: ['./entity-base-list.component.scss']
})
export class EntityBaseListComponent implements OnInit
{
	public sharedAccessId: string;

	public templates$: Observable<ApiModule.EntityTemplateViewModel[]> = of([]);

	constructor(private activatedRoute: ActivatedRoute,
				private entityTemplateClient: ApiModule.EntityTemplateClient,
				private sharedAccessClient: ApiModule.SharedAccessClient,
				private routingService: RoutingService,
				private notifyService: NotifyService,
				private clipboardService: ClipboardService)
	{
		this.checkRouteParams();
	}

	private checkRouteParams(): void
	{
		this.activatedRoute.paramMap.subscribe(params => {
			this.sharedAccessId = params.get('sharedAccessId');
			
			this.templates$ = !this.sharedAccessId ?
				this.entityTemplateClient.getAll() :
				this.sharedAccessClient.getAllTemplates(this.sharedAccessId);
		});
	}

	ngOnInit(): void { }

	public routeToEntityList(templateId: string): void
	{
		!this.sharedAccessId ?
			this.routingService.navigateEntityList(templateId) :
			this.routingService.navigateSharedEntityList(this.sharedAccessId, templateId);
	}

	public share(): void
	{
		if (this.sharedAccessId)
			return;

		const sharedAccessModel = ApiModule.SharedAccessViewModel.fromJS({ type: ApiModule.SharedAccessType.ForAllTemplates });

		this.sharedAccessClient
			.create(sharedAccessModel)
			.subscribe(sharedLink => {
				this.clipboardService.copy(sharedLink);
				this.notifyService.showInfo('Link copied to clipboard');
			});
	}
}
