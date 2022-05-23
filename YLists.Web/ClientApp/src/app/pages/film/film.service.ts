// import { Injectable } from "@angular/core";
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from "rxjs";

// import { RequestResult } from "src/app/dtos/response/requestResult";
// import { EntityRequest } from "src/app/dtos/entity/entityRequest";
// import { GetFilteredListRequest } from "src/app/dtos/filter/getFilteredListRequest";
// import { UpdateFilmRequest } from "src/app/dtos/film/updateFilmRequest";

// @Injectable()
// export class FilmService {

// 	private readonly filmUrl = "/api/films";
// 	private readonly categoryUrl = "/api/categories";
// 	private readonly headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

// 	constructor(private http: HttpClient) {
// 	}

// 	public getFilmList(data: GetFilteredListRequest): Observable<RequestResult> {
// 		Object.keys(data).forEach(k => (data[k] === null || data[k] === undefined) && delete data[k]);
// 		const options = { headers: this.headers, params: <any> data };
// 		return this.http.get<RequestResult>(this.filmUrl, options);
// 	}

// 	public getCategoryList(data: GetFilteredListRequest): Observable<RequestResult> {
// 		Object.keys(data).forEach(k => (data[k] === null || data[k] === undefined) && delete data[k]);
// 		const options = { headers: this.headers, params: <any> data };
// 		return this.http.get<RequestResult>(this.categoryUrl, options);
// 	}

// 	public getFilm(data: EntityRequest): Observable<RequestResult> {
// 		const url = `${this.filmUrl}/${data.id}`;
// 		const options = { headers: this.headers };
// 		return this.http.get<RequestResult>(url, options);
// 	}

// 	public updateFilm(data: UpdateFilmRequest): Observable<RequestResult> {
// 		const options = { headers: this.headers };
// 		return this.http.post<RequestResult>(this.filmUrl, data, options);
// 	}

// 	public deleteFilm(data: EntityRequest): Observable<RequestResult> {
// 		const url = `${this.filmUrl}/${data.id}`;
// 		const options = { headers: this.headers };
// 		return this.http.delete<RequestResult>(url, options);
// 	}
// }
