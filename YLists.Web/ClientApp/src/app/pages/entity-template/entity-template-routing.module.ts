import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntityTemplateListComponent } from './entity-template-list/entity-template-list.component';
import { EntityTemplateCardComponent } from './entity-template-card/entity-template-card.component';

const routes: Routes = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{ path: 'all', component: EntityTemplateListComponent },
	{ path: ':id', component: EntityTemplateCardComponent },
	{ path: '**', redirectTo: 'all', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EntityTemplateRoutingModule { }
