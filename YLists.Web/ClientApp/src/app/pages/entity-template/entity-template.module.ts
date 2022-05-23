import { NgModule } from '@angular/core';

import { ApiModule } from 'src/app/api/api.generated';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntityTemplateRoutingModule } from './entity-template-routing.module';
import { EntityTemplateListComponent } from './entity-template-list/entity-template-list.component';
import { EntityTemplateCardComponent } from './entity-template-card/entity-template-card.component';

@NgModule({
	declarations: [
		EntityTemplateListComponent,
		EntityTemplateCardComponent,
	],
	imports: [
		SharedModule,
		EntityTemplateRoutingModule
	],
	providers: [
		ApiModule.EntityTemplateClient
	]
})
export class EntityTemplateModule { }
