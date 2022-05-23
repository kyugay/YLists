// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// import { CategoryItemSourceService } from './item-sources/category-item-source.service';
// import { CountryItemSourceService } from './item-sources/country-item-source.service';
// import { GenreItemSourceService } from './item-sources/genre-item-source.service';
// import { ProducerItemSourceService } from './item-sources/producer-item-source.service';
// import { NotifyService } from './notify.service';
// import { SearchEntityRequest } from '../dtos/search/searchEntityRequest';
// import { FilterDto } from '../dtos/filter/filterDto';
// import { FilterTreeNodeDto } from '../dtos/filter/filterTreeNodeDto';
// import { RequestResult } from '../dtos/response/requestResult';


// @Injectable()
// export class ItemSourceMasterService {

// 	constructor(private categoryService: CategoryItemSourceService,
// 				private countryService: CountryItemSourceService,
// 				private genreService: GenreItemSourceService,
// 				private producerService: ProducerItemSourceService,
// 				private notifyService: NotifyService) { }

// 	public getList(entity: string, filterValue: string): Observable<Array<FilterDto>> {
// 		const request = <SearchEntityRequest>{ text: filterValue };
// 		switch (entity) {
// 			case 'country':
// 				return this.countryService.getCountryList(request);
// 			case 'genre':
// 				return this.genreService.getGenreList(request);
// 			case 'producer':
// 				return this.producerService.getProducerList(request);
// 			default:
// 				this.notifyService.showError(`Ошибка при получении списка, передана неизвестная сущность: \"${entity}\"`);
// 				return null;
// 		}
// 	}

// 	public getTreeList(entity: string): Observable<Array<FilterTreeNodeDto>> {
// 		switch (entity) {
// 			case 'category':
// 				return this.categoryService.getCategoryTreeList();
// 			default:
// 				this.notifyService.showError(`Ошибка при получении списка, передана неизвестная сущность: \"${entity}\"`);
// 				return null;
// 		}
// 	}

// 	public addItem(entity: string, name: string, parentId: string = null): Observable<RequestResult> {
// 		switch (entity) {
// 			case 'country':
// 				return this.countryService.addCountry(name);
// 			case 'genre':
// 				return this.genreService.addGenre(name);
// 			case 'producer':
// 				return this.producerService.addProducer(name);
// 			case 'category':
// 				return this.categoryService.addCategory(name, parentId);
// 			default:
// 				this.notifyService.showError(`Ошибка при получении списка, передана неизвестная сущность: \"${entity}\"`);
// 				return null;
// 		}
// 	}

// 	public deleteItem(entity: string, entityId: string): Observable<RequestResult> {
// 		switch (entity) {
// 			case 'country':
// 				return this.countryService.deleteCountry(entityId);
// 			case 'genre':
// 				return this.genreService.deleteGenre(entityId);
// 			case 'producer':
// 				return this.producerService.deleteProducer(entityId);
// 			case 'category':
// 				return this.categoryService.deleteCategory(entityId);
// 			default:
// 				this.notifyService.showError(`Ошибка при получении списка, передана неизвестная сущность: \"${entity}\"`);
// 				return null;
// 		}
// 	}
// }
