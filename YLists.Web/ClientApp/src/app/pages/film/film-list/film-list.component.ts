// import { Component, EventEmitter, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { map, startWith, switchMap, tap } from 'rxjs/operators';

// import { FilmService } from '../film.service';
// import { RoutingService } from 'src/app/services/routing.service';
// import { ShortFilmDto } from 'src/app/dtos/film/shortFilmDto';
// import { GetFilteredListRequest } from 'src/app/dtos/filter/getFilteredListRequest';

// @Component({
// 	selector: 'app-film-list',
// 	templateUrl: './film-list.component.html',
// 	styleUrls: ['./film-list.component.scss']
// })
// export class FilmListComponent implements OnInit {

// 	public filters: GetFilteredListRequest = new GetFilteredListRequest();
// 	public filtersChanged$: EventEmitter<GetFilteredListRequest> = new EventEmitter<GetFilteredListRequest>();
// 	public films$: Observable<Array<ShortFilmDto>>;

// 	constructor(private filmService: FilmService,
// 				private routingService: RoutingService) {
// 	}

// 	ngOnInit(): void {
// 		this.films$ = this.filtersChanged$.pipe(
// 			startWith(this.filters),
// 			switchMap(filters => this.filmService.getFilmList(filters)
// 				.pipe(
// 					map(result => <Array<ShortFilmDto>> result.data)
// 				)
// 			)
// 		);
// 	}

// 	public addFilm(): void {
// 		this.routingService.navigateFilmCard();
// 	}
// }
