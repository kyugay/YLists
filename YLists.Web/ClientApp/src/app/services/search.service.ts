// import { Injectable } from "@angular/core";
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from "rxjs";

// import { RequestResult } from "../dtos/response/requestResult";
// import { SearchEntityRequest } from "../dtos/search/searchEntityRequest";

// @Injectable()
// export class SearchService {

// 	private readonly baseUrl = "/api/search";
// 	private readonly headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

// 	constructor(private http: HttpClient) {
// 	}

// 	public search(data: SearchEntityRequest): Observable<RequestResult> {
// 		const options = { headers: this.headers, params: <any> data };
// 		return this.http.get<RequestResult>(this.baseUrl, options);
// 	}
// }
