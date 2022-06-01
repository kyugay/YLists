import { NgModule } from '@angular/core';

import { ApiModule } from 'src/app/api/api.generated';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModelRoutingModule } from './model-routing.module';
import { ModelListComponent } from './model-list/model-list.component';

@NgModule({
	declarations: [
		ModelListComponent,
	],
	imports: [
		SharedModule,
		ModelRoutingModule
	],
	providers: [
		ApiModule.ModelClient
	]
})
export class ModelModule { }
