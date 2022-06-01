import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModelListComponent } from './model-list/model-list.component';

const routes: Routes = [
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
	{ path: 'all', component: ModelListComponent },
	{ path: '**', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ModelRoutingModule { }
