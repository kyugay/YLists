// import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

// import { GetFilteredListRequest, SortDirectionEnum, SortTypeEnum } from 'src/app/dtos/filter/getFilteredListRequest';
// import { FilterType } from 'src/app/models/filters/FilterType';
// import { FilterTypeEnum } from 'src/app/models/filters/FilterTypeEnum';
// import { SortDirectionButton } from 'src/app/models/filters/SortDirectionButton';
// import { SortType } from 'src/app/models/filters/SortType';

// @Component({
// 	selector: 'app-filters',
// 	templateUrl: './filters.component.html',
// 	styleUrls: ['./filters.component.scss']
// })
// export class FiltersComponent {
// 	public FilterTypeEnum: any = FilterTypeEnum;

// 	@Input() public filters: GetFilteredListRequest = new GetFilteredListRequest();
// 	@Output() public filtersChange: EventEmitter<GetFilteredListRequest> = new EventEmitter<GetFilteredListRequest>();
	
// 	@Input() public filtersChanged: EventEmitter<GetFilteredListRequest> = new EventEmitter<GetFilteredListRequest>();

// 	public showFilterList: boolean = false;
// 	@ViewChild('filterButton') public filterButtonRef: ElementRef;
// 	@ViewChild('filterListPopup', { read: ElementRef }) public filterListPopupRef: ElementRef;

// 	public filterTypeList: Array<FilterType> = [
// 		// { text: 'Год производства', value: FilterTypeEnum.Year, selected: false },
// 		{ text: 'Страна', value: FilterTypeEnum.Country, selected: true },
// 		{ text: 'Жанр', value: FilterTypeEnum.Genre, selected: true },
// 		{ text: 'Режиссер', value: FilterTypeEnum.Producer, selected: true },
// 		{ text: 'Просмотрено', value: FilterTypeEnum.IsViewed, selected: false }
// 	];
// 	public sortTypeList: Array<SortType> = [
// 		{ text: 'Добавлению', value: SortTypeEnum.CreationDate },
// 		{ text: 'Названию', value: SortTypeEnum.Name },
// 		{ text: 'Рейтингу', value: SortTypeEnum.Rating }
// 	];
// 	public sortDirectionButtons: Array<SortDirectionButton> = [
// 		{ icon: 'sort-asc', value: SortDirectionEnum.Ascending, selected: true },
// 		{ icon: 'sort-desc', value: SortDirectionEnum.Descending, selected: false }
// 	];

// 	constructor() { }

// 	public onChange(): void {
// 		this.filtersChange.emit(this.filters);
// 		this.filtersChanged.emit(this.filters);
// 	}

// 	public sortDirectionChange(direction: SortDirectionEnum): void {
// 		if (this.filters.sortDirection === direction)
// 			return;

// 		this.filters.sortDirection = direction;
// 		this.onChange();
// 	}

// 	@HostListener('document:click', ['$event'])
// 	public documentClick(event: any): void {
// 		if (!this.filterButtonRef.nativeElement.contains(event.target) &&
// 			(this.filterListPopupRef ? !this.filterListPopupRef.nativeElement.contains(event.target) : true))
// 		{
// 			this.showFilterList = false;
// 		}
// 	}

// 	public toggleFilterPopup(): void {
// 		this.showFilterList = !this.showFilterList;
// 	}

// 	public toggleFilterListItem(item: FilterType): void {
// 		switch (item.value) {
// 			case FilterTypeEnum.Year:
// 				this.filters.startYear = null;
// 				this.filters.endYear = null;
// 				break;
// 			case FilterTypeEnum.Country:
// 				this.filters.countries = null;
// 				break;
// 			case FilterTypeEnum.Genre:
// 				this.filters.genres = null;
// 				break;
// 			case FilterTypeEnum.Producer:
// 				this.filters.producers = null;
// 				break;
// 			case FilterTypeEnum.IsViewed:
// 				this.filters.isViewed = item.selected ? null : false;
// 				break;
// 		}
// 		this.onChange();

// 		item.selected = !item.selected;
// 	}

// 	public get startYear(): Date {
// 		return this.filters.startYear ? new Date(this.filters.startYear, 1) : null;
// 	}
// 	public set startYear(value: Date) {
// 		this.filters.startYear = value?.getFullYear();
// 	}

// 	public get endYear(): Date {
// 		return this.filters.endYear ? new Date(this.filters.endYear, 1) : null;
// 	}
// 	public set endYear(value: Date) {
// 		this.filters.endYear = value?.getFullYear();
// 	}
// }
