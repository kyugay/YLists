import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ApiModule } from 'src/app/api/api.generated';

@Component({
	selector: 'custom-multiselect',
	templateUrl: './custom-multiselect.component.html',
	styleUrls: ['./custom-multiselect.component.scss'],
    providers: [{
		provide: NG_VALUE_ACCESSOR,
		multi: true,
		useExisting: CustomMultiselectComponent
	}]
})
export class CustomMultiselectComponent implements ControlValueAccessor
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

    public get multiselectValue(): Array<string> { return !this.value ? [] : this.value.split(';'); }
    public set multiselectValue(value: Array<string>)
    {
        this.value = value.join(';');
    }

	constructor() { }

    public writeValue(obj: any): void
    {
		this.value = obj;
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
}
