import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule) },
	{ path: 'templates', loadChildren: () => import('./pages/entity-template/entity-template.module').then(m => m.EntityTemplateModule) },
	{ path: 'entities', loadChildren: () => import('./pages/entity/entity.module').then(m => m.EntityModule) },
	{ path: 'categories', loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule) },
	//{ path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
	{ path: '**', redirectTo: 'entities', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
