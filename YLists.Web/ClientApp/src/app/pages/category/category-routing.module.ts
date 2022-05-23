import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{ path: ':id', component: CategoryListComponent },
	{ path: '**', redirectTo: 'all', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CategoryRoutingModule { }
