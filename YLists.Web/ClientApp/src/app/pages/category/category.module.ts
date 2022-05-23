import { NgModule } from '@angular/core';

import { ApiModule } from 'src/app/api/api.generated';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
	declarations: [
		CategoryListComponent,
	],
	imports: [
		SharedModule,
		CategoryRoutingModule
	],
	providers: [
	]
})
export class CategoryModule { }
