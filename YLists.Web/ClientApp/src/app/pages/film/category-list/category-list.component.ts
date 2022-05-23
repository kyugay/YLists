// import { Component, EventEmitter, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { filter, map, mapTo, mergeAll, startWith, switchMap, tap } from 'rxjs/operators';

// import { FilmService } from '../film.service';
// import { RoutingService } from 'src/app/services/routing.service';
// import { ModalService } from 'src/app/services/modal.service';
// import { GetFilteredListRequest } from 'src/app/dtos/filter/getFilteredListRequest';
// import { ShortFilmDto } from 'src/app/dtos/film/shortFilmDto';
// import { CategoryDto } from 'src/app/dtos/category/categoryDto';
// import { ChildCategoryDto } from 'src/app/dtos/category/childCategoryDto';

// @Component({
// 	selector: 'app-category-list',
// 	templateUrl: './category-list.component.html',
// 	styleUrls: ['./category-list.component.scss']
// })
// export class CategoryListComponent implements OnInit {

// 	public filters: GetFilteredListRequest = new GetFilteredListRequest();
// 	public filtersChanged$: EventEmitter<GetFilteredListRequest> = new EventEmitter<GetFilteredListRequest>();

// 	public updateCategoriesEvent$: EventEmitter<void> = new EventEmitter<void>();

// 	public category$: Observable<CategoryDto>;
// 	public categories$: Observable<Array<ChildCategoryDto>>;
// 	public films$: Observable<Array<ShortFilmDto>>;

// 	private parentId: string;

// 	constructor(private filmService: FilmService,
// 				private routingService: RoutingService,
// 				private modalService: ModalService,
// 				private activatedRoute: ActivatedRoute) {
// 		this.activatedRoute.paramMap.subscribe(params => {
// 			this.filters = new GetFilteredListRequest();

// 			const id = params.get('id');
// 			if (id !== 'all')
// 				this.filters.categoryId = id;

// 			this.category$ = this.getCategory();
// 		});
// 	}

// 	ngOnInit(): void { }

// 	private getCategory(): Observable<CategoryDto> {
// 		return of(this.filtersChanged$, this.updateCategoriesEvent$.pipe(mapTo(this.filters))).pipe(
// 			mergeAll(),
// 			startWith(this.filters),
// 			switchMap(filters => this.filmService.getCategoryList(filters)
// 				.pipe(
// 					tap(result => {
// 						const data = <CategoryDto> result.data;
// 						this.categories$ = of(data.children);
// 						this.films$ = !this.filters?.categoryId ? of([]) : this.getFilmList();
// 					}),
// 					map(result => <CategoryDto> result.data)
// 				)
// 			)
// 		);
// 	}

// 	private getFilmList(): Observable<Array<ShortFilmDto>> {
// 		return this.filmService.getFilmList(this.filters).pipe(
// 			map(result => <Array<ShortFilmDto>> result.data)
// 		);
// 	}

// 	public back(): void {
// 		this.routingService.navigateCategoryList(this.parentId || 'all');
// 	}

// 	public addCategory(): void {
// 		this.modalService.showAddCategoryModal(this.filters.categoryId)
// 			.pipe(filter(res => !res.isError))
// 			.subscribe(_ => this.updateCategoriesEvent$.emit());
// 	}

// 	public deleteCategory(): void {
// 		this.modalService.showDeleteCategoryModal(this.filters.categoryId)
// 			.pipe(filter(res => !res.isError))
// 			.subscribe(_ => this.back());
// 	}
// }
