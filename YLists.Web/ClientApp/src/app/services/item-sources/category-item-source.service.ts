// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// import { RequestResult } from 'src/app/dtos/response/requestResult';
// import { CategoryTreeNodeDto } from 'src/app/dtos/category/categoryTreeNodeDto';
// import { FilterTreeNodeDto } from 'src/app/dtos/filter/filterTreeNodeDto';
// import { AddCategoryRequest } from 'src/app/dtos/category/addCategoryRequest';
// import { EntityRequest } from 'src/app/dtos/entity/entityRequest';

// @Injectable()
// export class CategoryItemSourceService {

// 	private readonly baseUrl = "/api/categories";
// 	private readonly headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

// 	constructor(private http: HttpClient) {
// 	}

// 	public getCategoryTreeList(): Observable<Array<FilterTreeNodeDto>> {
// 		const url = this.baseUrl + '/treelist';
// 		const options = { headers: this.headers };
// 		return this.http.get<RequestResult>(url, options).pipe(
// 			map((res: RequestResult) => {
// 				const categories = <Array<CategoryTreeNodeDto>> res.data;
// 				return categories.map((c: CategoryTreeNodeDto) => this.getFilterTreeNodeDto(c));
// 			})
// 		);
// 	}

// 	private getFilterTreeNodeDto(category: CategoryTreeNodeDto): FilterTreeNodeDto {
// 		if (!category) {
// 			return null;
// 		}

// 		const dto = <FilterTreeNodeDto> {
// 			value: category.id,
// 			text: category.name,
// 			children: category.children.map((child: CategoryTreeNodeDto) => this.getFilterTreeNodeDto(child))
// 		};
// 		return dto;
// 	}

// 	public addCategory(name: string, parentId: string): Observable<RequestResult> {
// 		const options = { headers: this.headers };
// 		const data = <AddCategoryRequest> { name, parentId };
// 		return this.http.post<RequestResult>(this.baseUrl, data, options);
// 	}

// 	public deleteCategory(entityId: string): Observable<RequestResult> {
// 		const url = this.baseUrl + `/${entityId}`
// 		const options = { headers: this.headers };
// 		return this.http.delete<RequestResult>(url, options);
// 	}
// }
