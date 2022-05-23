import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntityListComponent } from './entity-list/entity-list.component';
import { EntityCardComponent } from './entity-card/entity-card.component';

const routes: Routes = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{ path: 'all', component: EntityListComponent },
	{ path: ':id', component: EntityCardComponent },
	{ path: '**', redirectTo: 'all', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EntityRoutingModule { }
