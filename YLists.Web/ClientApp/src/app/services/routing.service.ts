import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RoutingService {

	constructor(private router: Router) {
	}

	public getCurrentRoute(): string {
		return this.router.url;
	}

	public navigateEmpty(): void {
		this.router.navigate([]);
	}

	public navigate(url: string): void {
		this.router.navigate([url]);
	}

	public navigateWithParameters(url: string, parameters: Array<string>): void {
		this.router.navigate([url, ...parameters]);
	}

	public navigateWithQuery(url: string, query: any): void {
		this.router.navigate([url], { queryParams: query });
	}

	public navigateWithParametersAndQuery(url: string, parameters: Array<string>, query: any): void {
		this.router.navigate([url, ...parameters], { queryParams: query });
	}

	public navigateHome(): void {
		this.navigate('home');
	}

	public navigateSignIn(): void {
		this.navigate('account/sign-in');
	}

	public navigateSignUp(): void {
		this.navigate('account/sign-up');
	}

	public navigateEntityBaseList(): void {
		this.navigate('entities/list');
	}

	public navigateEntityList(templateId: string, categoryId: string = null): void {
		if (!categoryId)
			this.navigateWithParameters('entities/list', [templateId]);
		else
			this.navigateWithParametersAndQuery('entities/list', [templateId], { categoryId });
	}
	
	public navigateEntityCard(templateId: string, categoryId: string, entityId: string = 'new'): void {
		if (!templateId && !categoryId)
			this.navigateWithParameters('entities/card', [entityId]);
		else if (templateId && !categoryId)
			this.navigateWithParametersAndQuery('entities/card', [entityId], { templateId });
		else if (!templateId && categoryId)
			this.navigateWithParametersAndQuery('entities/card', [entityId], { categoryId });
		else
			this.navigateWithParametersAndQuery('entities/card', [entityId], { templateId, categoryId });
	}

	public navigateSharedEntityBaseList(sharedAccessId: string): void {
		this.navigateWithParameters('entities/shared', [sharedAccessId, 'list']);
	}

	public navigateSharedEntityList(sharedAccessId: string, templateId: string, categoryId: string = null): void {
		if (!categoryId)
			this.navigateWithParameters('entities/shared', [sharedAccessId, 'list', templateId]);
		else
			this.navigateWithParametersAndQuery('entities/shared', [sharedAccessId, 'list', templateId], { categoryId });
	}
	
	public navigateSharedEntityCard(sharedAccessId: string, templateId: string, categoryId: string, entityId: string = 'new'): void {
		if (!templateId && !categoryId)
			this.navigateWithParameters('entities/shared', [sharedAccessId, 'card', entityId]);
		else if (templateId && !categoryId)
			this.navigateWithParametersAndQuery('entities/shared', [sharedAccessId, 'card', entityId], { templateId });
		else if (!templateId && categoryId)
			this.navigateWithParametersAndQuery('entities/shared', [sharedAccessId, 'card', entityId], { categoryId });
		else
			this.navigateWithParametersAndQuery('entities/shared', [sharedAccessId, 'card', entityId], { templateId, categoryId });
	}

	public navigateEntityTemplateList(): void {
		this.navigate('templates/all');
	}
	
	public navigateEntityTemplateCard(templateId: string = 'new'): void {
		this.navigateWithParameters('templates', [templateId]);
	}

	public navigateModelList(): void {
		this.navigate('models/all');
	}
}