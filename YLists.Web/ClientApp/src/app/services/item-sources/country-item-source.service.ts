// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// import { EntityNameRequest } from 'src/app/dtos/entity/entityNameRequest';
// import { SearchEntityRequest } from 'src/app/dtos/search/searchEntityRequest';
// import { RequestResult } from 'src/app/dtos/response/requestResult';
// import { CountryDto } from 'src/app/dtos/country/countryDto';
// import { FilterDto } from 'src/app/dtos/filter/filterDto';

// @Injectable()
// export class CountryItemSourceService {

// 	private readonly baseUrl = "/api/countries";
// 	private readonly headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

// 	constructor(private http: HttpClient) {
// 	}

// 	public getCountryList(data: SearchEntityRequest): Observable<Array<FilterDto>> {
// 		const options = { headers: this.headers, params: <any> data };
// 		return this.http.get<RequestResult>(this.baseUrl, options).pipe(
// 			map((res: RequestResult) => {
// 				const countries = <Array<CountryDto>> res.data;
// 				return countries.map((c: CountryDto) => <FilterDto> { value: c.id, text: c.name });
// 			})
// 		);
// 	}

// 	public addCountry(name: string): Observable<RequestResult> {
// 		const options = { headers: this.headers };
// 		const data = <EntityNameRequest> { name };
// 		return this.http.post<RequestResult>(this.baseUrl, data, options);
// 	}

// 	public deleteCountry(entityId: string): Observable<RequestResult> {
// 		const url = this.baseUrl + `/${entityId}`
// 		const options = { headers: this.headers };
// 		return this.http.delete<RequestResult>(url, options);
// 	}
// }
