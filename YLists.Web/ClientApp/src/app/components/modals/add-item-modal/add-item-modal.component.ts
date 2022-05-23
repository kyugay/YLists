import { Component } from '@angular/core';

@Component({
	selector: 'add-item-modal',
	templateUrl: './add-item-modal.component.html',
	styleUrls: ['./add-item-modal.component.scss']
})
export class AddItemModalComponent
{
	public value: string = '';

	constructor() { }
}
