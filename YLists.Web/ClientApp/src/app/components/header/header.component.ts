import { Component, ElementRef, EventEmitter, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Align } from '@progress/kendo-angular-popup';

import { RoutingService } from 'src/app/services/routing.service';
import { UserService } from 'src/app/services/user.service';
import { NotifyService } from 'src/app/services/notify.service';
import { IUserActionsItem } from 'src/app/models/header/IUserActionsItem';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
				private router: Router) { }

	public ngOnInit(): void {
		this.router.events
			.pipe(filter(e => e instanceof NavigationEnd))
			.subscribe(_ => this.resetHeader());
	}

	private resetHeader(): void {
		this.showUserActionsPopup = false;
	}

	public toggleUserActionsPopup(): void {
		this.showUserActionsPopup = !this.showUserActionsPopup;
	}

	@HostListener('document:click', ['$event'])
	public clickoutHandler(event: any): void {

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
