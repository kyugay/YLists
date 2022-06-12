import { NgModule } from '@angular/core';

import { ApiModule } from 'src/app/api/api.generated';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntityRoutingModule } from './entity-routing.module';
import { EntityBaseListComponent } from './entity-base-list/entity-base-list.component';
import { EntityListComponent } from './entity-list/entity-list.component';
import { EntityCardComponent } from './entity-card/entity-card.component';

@NgModule({
	declarations: [
		EntityBaseListComponent,
		EntityListComponent,
		EntityCardComponent,
	],
	imports: [
		SharedModule,
		EntityRoutingModule
	],
	providers: [
		ApiModule.CategoryClient,
		ApiModule.EntityClient,
		ApiModule.EntityTemplateClient,
		ApiModule.ModelClient,
		ApiModule.SharedAccessClient,
	]
})
export class EntityModule { }
