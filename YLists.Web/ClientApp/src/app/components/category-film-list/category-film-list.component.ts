// import { Component, Input } from '@angular/core';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { Observable, of } from 'rxjs';

// import { ShortFilmDto } from 'src/app/dtos/film/shortFilmDto';
// import { ChildCategoryDto } from 'src/app/dtos/category/childCategoryDto';
// import { RoutingService } from 'src/app/services/routing.service';

// @Component({
// 	selector: 'app-category-film-list',
// 	templateUrl: './category-film-list.component.html',
// 	styleUrls: ['./category-film-list.component.scss']
// })
// export class CategoryFilmListComponent {

// 	@Input() public categories$: Observable<Array<ChildCategoryDto>> = of();
// 	@Input() public films$: Observable<Array<ShortFilmDto>> = of([]);

// 	constructor(private domSanitizer: DomSanitizer,
// 				private routingService: RoutingService) {
// 	}

// 	public getSafeImageSrc(imageSrc: string): SafeUrl {
// 		return this.domSanitizer.bypassSecurityTrustUrl(imageSrc);
// 	}

// 	public routeToCategory(categoryId: string): void {
// 		this.routingService.navigateCategoryList(categoryId);
// 	}

// 	public routeToFilm(filmId: string): void {
// 		this.routingService.navigateFilmCard(filmId);
// 	}
// }
