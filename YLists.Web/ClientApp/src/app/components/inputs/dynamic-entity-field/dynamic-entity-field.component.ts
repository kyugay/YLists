import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ApiModule } from 'src/app/api/api.generated';

@Component({
	selector: 'dynamic-entity-field',
	templateUrl: './dynamic-entity-field.component.html',
	styleUrls: ['./dynamic-entity-field.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		multi: true,
		useExisting: DynamicEntityFieldComponent
	}]
})
export class DynamicEntityFieldComponent implements ControlValueAccessor
{
	@Input() public fieldType: ApiModule.FieldType = ApiModule.FieldType.TextBox;
	@Input() public fieldOptions: ApiModule.FieldOptionViewModel[] = [];

	private _value: string;
	private get value(): string { return this._value; }
	private set value(value: string)
	{
		this._value = value;
		this.onChange(value);
		this.cdr.detectChanges();
	}

	public get stringValue(): string { return this.value; }
	public set stringValue(value: string) { this.value = value; }

	public get booleanValue(): boolean { return this.value == 'true'; }
	public set booleanValue(value: boolean) { this.value = value ? 'true' : 'false'; }

	public get numberValue(): number { const number = Number(this.value); return !number ? 0 : number; }
	public set numberValue(value: number) { this.value = value.toString(); }

	public get dateValue(): Date { return !Date.parse(this.value) ? undefined : new Date(this.value); }
	public set dateValue(value: Date) { this.value = value.toString(); }

	public onChange: any = (_: string) => {};
	public onTouched: any = () => {};

	public touched = false;
	public disabled = false;

	constructor(private cdr: ChangeDetectorRef) { }

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

	public markAsTouched()
    {
		if (!this.touched)
        {
			this.onTouched();
			this.touched = true;
		}
	}
}
