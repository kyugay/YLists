import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ApiModule } from 'src/app/api/api.generated';
import { Item } from 'src/app/models/inputs/item';

@Component({
	selector: 'custom-checkboxes',
	templateUrl: './custom-checkboxes.component.html',
	styleUrls: ['./custom-checkboxes.component.scss'],
    providers: [{
		provide: NG_VALUE_ACCESSOR,
		multi: true,
		useExisting: CustomCheckboxesComponent
	}]
})
export class CustomCheckboxesComponent implements OnInit, ControlValueAccessor
{
    @Input() public fieldOptions: ApiModule.FieldOptionViewModel[] = [];

    public onChange: any = (_: string) => {};
	public onTouched: any = () => {};

	public touched = false;
	public disabled = false;

    private _value: string;
	public get value(): string { return this._value; }
	public set value(value: string)
	{
		this._value = value;
		this.onChange(value);
	}

    public checkboxItems: Array<Item> = [];

	constructor() { }

	ngOnInit(): void
	{
		this.checkboxItems = this.fieldOptions.map(o => <Item> { text: o.value, value: false });
		this.updateCheckboxItems();
	}

    public writeValue(obj: any): void
    {
		this.value = obj;
		this.updateCheckboxItems();
	}

	public registerOnChange(fn: any): void
    {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void
    {
		this.onTouched = fn;
	}

	public setDisabledState?(isDisabled: boolean): void
    {
		this.disabled = isDisabled;
	}

	private updateCheckboxItems(): void
	{
		if (this.value)
		{
			this.value.split(';').forEach(v => {
				const index = this.checkboxItems.findIndex(i => i.text === v);
				if (index !== -1)
					this.checkboxItems[index].value = true;
			});
		}
	}

	public onCheckboxChange()
	{
		this.value = this.checkboxItems
			.filter(i => i.value)
			.map(i => i.text)
			.join(';');
	}
}
