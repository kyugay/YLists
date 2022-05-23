import { Component, ElementRef, EventEmitter, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { Align } from '@progress/kendo-angular-popup';

import { RoutingService } from 'src/app/services/routing.service';
import { UserService } from 'src/app/services/user.service';
import { NotifyService } from 'src/app/services/notify.service';
// import { SearchService } from 'src/app/services/search.service';
// import { SearchEntityRequest } from 'src/app/dtos/search/searchEntityRequest';
// import { SearchResultDto } from 'src/app/dtos/search/searchResultDto';
import { IUserActionsItem } from 'src/app/models/header/IUserActionsItem';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	// public searchValue: string = '';
	// public searchResult$: Observable<SearchResultDto>;
	// private searchChange$: EventEmitter<string> = new EventEmitter();
	// public isSearchLoading: boolean = false;

	// public showSearchPopup: boolean = false;
	// @ViewChild('searchInput', { read: ElementRef }) public searchInputRef: ElementRef;
	// @ViewChild('searchPopup', { read: ElementRef }) public searchPopupRef: ElementRef;

	public showUserActionsPopup: boolean = false;
	@ViewChild('userButton', { read: ElementRef }) public userButtonRef: ElementRef;
	@ViewChild('userActionsPopup', { read: ElementRef }) public userActionsPopupRef: ElementRef;

	public anchorAlign: Align = { horizontal: 'right', vertical: 'bottom' };
	public popupAlign: Align = { horizontal: 'right', vertical: 'top' };

	public userActionsList: Array<IUserActionsItem> = [
		{
			text: 'Вход',
			isDisabled: () => false,
			isVisible: () => !this.userService.currentUser,
			onClick: () => this.routingService.navigateSignIn()
		},
		{
			text: 'Регистрация',
			isDisabled: () => false,
			isVisible: () => !this.userService.currentUser,
			onClick: () => this.routingService.navigateSignUp()
		},
		{
			text: 'Выход',
			isDisabled: () => false,
			isVisible: () => !!this.userService.currentUser,
			onClick: () => this.signOut()
		}
	];

	constructor(public userService: UserService,
				public routingService: RoutingService,
				private notifyService: NotifyService,
				//private searchService: SearchService,
				private router: Router) { }

	public ngOnInit(): void {
		this.router.events
			.pipe(filter(e => e instanceof NavigationEnd))
			.subscribe(_ => this.resetHeader());
		
		// this.searchResult$ = this.searchChange$.pipe(
		// 	debounceTime(500),
		// 	distinctUntilChanged(),
		// 	map(v => <SearchEntityRequest>{ text: v }),
		// 	tap(_ => this.isSearchLoading = true),
		// 	switchMap(req => this.searchService.search(req)
		// 		.pipe(
		// 			map(res => res.isError ? null : <SearchResultDto>res.data),
		// 			tap(_ => this.isSearchLoading = false)
		// 		)
		// 	)
		// );
	}

	private resetHeader(): void {
		// this.showSearchPopup = false;
		this.showUserActionsPopup = false;
		// this.searchValue = '';
	}

	// public onSearchChange(value: string): void {
	// 	this.showSearchPopup = !!value;
	// 	this.searchChange$.emit(value);
	// }

	public toggleUserActionsPopup(): void {
		this.showUserActionsPopup = !this.showUserActionsPopup;
	}

	@HostListener('document:click', ['$event'])
	public clickoutHandler(event: any): void {
		// if (this.searchInputRef.nativeElement.contains(event.target) && this.searchValue)
		// {
		// 	this.showSearchPopup = true;
		// }
		// else if (!this.searchInputRef.nativeElement.contains(event.target) &&
		// 	(!this.searchPopupRef || !this.searchPopupRef.nativeElement.contains(event.target)))
		// {
		// 	this.showSearchPopup = false;
		// }

		if (!this.userButtonRef.nativeElement.contains(event.target) &&
			(!this.userActionsPopupRef || !this.userActionsPopupRef.nativeElement.contains(event.target)))
		{
			this.showUserActionsPopup = false;
		}
	}

	public signOut(): void {
		this.resetHeader();
		this.userService.userSignOut().subscribe(
			_ => this.routingService.navigateHome(),
			error => {
				this.notifyService.showError(error);
				this.routingService.navigateHome();
			}
		);
	}
}
