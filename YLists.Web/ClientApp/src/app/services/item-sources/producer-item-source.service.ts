// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// import { EntityNameRequest } from 'src/app/dtos/entity/entityNameRequest';
// import { SearchEntityRequest } from 'src/app/dtos/search/searchEntityRequest';
// import { RequestResult } from 'src/app/dtos/response/requestResult';
// import { ProducerDto } from 'src/app/dtos/producer/producerDto';
// import { FilterDto } from 'src/app/dtos/filter/filterDto';

// @Injectable()
// export class ProducerItemSourceService {

// 	private readonly baseUrl = "/api/producers";
// 	private readonly headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

// 	constructor(private http: HttpClient) {
// 	}

// 	public getProducerList(data: SearchEntityRequest): Observable<Array<FilterDto>> {
// 		const options = { headers: this.headers, params: <any> data };
// 		return this.http.get<RequestResult>(this.baseUrl, options).pipe(
// 			map((res: RequestResult) => {
// 				const producers = <Array<ProducerDto>> res.data;
// 				return producers.map((p: ProducerDto) => <FilterDto> { value: p.id, text: p.name });
// 			})
// 		);
// 	}
	
// 	public addProducer(name: string): Observable<RequestResult> {
// 		const options = { headers: this.headers };
// 		const data = <EntityNameRequest> { name };
// 		return this.http.post<RequestResult>(this.baseUrl, data, options);
// 	}

// 	public deleteProducer(entityId: string): Observable<RequestResult> {
// 		const url = this.baseUrl + `/${entityId}`
// 		const options = { headers: this.headers };
// 		return this.http.delete<RequestResult>(url, options);
// 	}
// }
