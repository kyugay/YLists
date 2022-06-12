import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntityBaseListComponent } from './entity-base-list/entity-base-list.component';
import { EntityListComponent } from './entity-list/entity-list.component';
import { EntityCardComponent } from './entity-card/entity-card.component';

const routes: Routes = [
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
	{ path: 'list', component: EntityBaseListComponent },
	{ path: 'list/:templateId', component: EntityListComponent },
	{ path: 'card/:entityId', component: EntityCardComponent },
	{
		path: 'shared/:sharedAccessId',
		children: [
			{ path: '', redirectTo: 'list', pathMatch: 'full' },
			{ path: 'list', component: EntityBaseListComponent },
			{ path: 'list/:templateId', component: EntityListComponent },
			{ path: 'card/:entityId', component: EntityCardComponent },
			{ path: '**', redirectTo: '', pathMatch: 'full' },
		]
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EntityRoutingModule { }
