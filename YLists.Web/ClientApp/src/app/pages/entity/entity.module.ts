import { NgModule } from '@angular/core';

import { ApiModule } from 'src/app/api/api.generated';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntityRoutingModule } from './entity-routing.module';
import { EntityListComponent } from './entity-list/entity-list.component';
import { EntityCardComponent } from './entity-card/entity-card.component';

@NgModule({
	declarations: [
		EntityListComponent,
		EntityCardComponent,
	],
	imports: [
		SharedModule,
		EntityRoutingModule
	],
	providers: [
		ApiModule.EntityClient,
		ApiModule.EntityTemplateClient
	]
})
export class EntityModule { }
