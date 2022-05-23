// import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
// import { IconSize } from '@progress/kendo-angular-icons/common/models/size';

// @Component({
// 	selector: 'app-film-cover',
// 	templateUrl: './film-cover.component.html',
// 	styleUrls: ['./film-cover.component.scss']
// })
// export class FilmCoverComponent implements OnChanges {

// 	@Input() public imageSrc: string;
// 	@Input() public isViewed: boolean = false;
// 	@Input() public isUnabled: boolean = false;
// 	@Input() public iconSize: IconSize = 'xlarge';
	
// 	constructor() { }

// 	ngOnChanges(changes: SimpleChanges): void {
// 	}

// 	public get coverBackgroundStyle(): string {
// 		if (this.isUnabled)
// 			return this.imageSrc ? `url("${this.imageSrc}")` : 'none';
		
// 		if (!this.imageSrc && !this.isViewed)
// 			return 'none';
// 		else if (this.imageSrc && !this.isViewed)
// 			return `url("${this.imageSrc}")`;
// 		else if (!this.imageSrc && this.isViewed)
// 			return 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))';
// 		else
// 			return `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${this.imageSrc}")`;
// 	}
// }
