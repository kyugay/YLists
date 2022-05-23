import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { INavMenuItem } from 'src/app/models/nav-menu/INavMenuItem';

@Component({
	selector: 'app-nav-menu',
	templateUrl: './nav-menu.component.html',
	styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

	public expanded = false;
	public items: Array<INavMenuItem> = [
		//{ icon: 'film', path: '/films/all' },
		//{ icon: 'folder', path: '/categories/all' },
		{ icon: 'data', path: 'entities/all' },
		{ icon: 'subreport', path: '/templates/all'}
	];
	private drawerItems: HTMLCollectionOf<Element>;

	constructor(private router: Router) {
	}

	ngOnInit(): void {
		this.drawerItems = document.querySelector('kendo-drawer').getElementsByClassName('k-drawer-item');
		this.router.events.subscribe(
			event => {
				if (event instanceof NavigationEnd) {
					for (let i = 0; i < this.drawerItems.length; ++i) {
						const itemIndex = parseInt(this.drawerItems[i].getAttribute('data-kendo-drawer-index'));
						const isItemSelected = this.drawerItems[i].classList.contains('k-state-selected');

						// isItemSelected XOR isCurrentItemPath
						if (isItemSelected !== (this.items[itemIndex].path === event.urlAfterRedirects)) {
							this.drawerItems[i].classList.toggle('k-state-selected');
						}
					}
				}
			}
		);
	}

}
