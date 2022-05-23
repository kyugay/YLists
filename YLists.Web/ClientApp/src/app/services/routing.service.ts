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

	public navigateWithParameter(url: string, parameters: Array<string>): void {
		this.router.navigate([url, ...parameters]);
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

	public navigateEntityList(): void {
		this.navigate('entities/all');
	}
	
	public navigateEntityCard(entityId: string = 'new'): void {
		this.navigateWithParameter('entities', [entityId]);
	}

	public navigateEntityTemplateList(): void {
		this.navigate('templates/all');
	}
	
	public navigateEntityTemplateCard(templateId: string = 'new'): void {
		this.navigateWithParameter('templates', [templateId]);
	}






	// public navigateFilmList(): void {
	// 	this.navigate('films/all');
	// }
	
	// public navigateFilmCard(filmId: string = 'new'): void {
	// 	this.navigateWithParameter('films', [filmId]);
	// }

	// public navigateCategoryList(categoryId: string = 'all'): void {
	// 	this.navigateWithParameter('categories', [categoryId]);
	// }
}