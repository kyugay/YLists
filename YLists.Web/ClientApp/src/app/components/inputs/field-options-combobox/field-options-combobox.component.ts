import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComboBoxComponent, VirtualizationSettings } from '@progress/kendo-angular-dropdowns';
import { Observable, of } from 'rxjs';

import { ApiModule } from 'src/app/api/api.generated';
import { ModalService } from 'src/app/services/modal.service';

@Component({
	selector: 'field-options-combobox',
	templateUrl: './field-options-combobox.component.html',
	styleUrls: ['./field-options-combobox.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		multi: true,
		useExisting: FieldOptionsComboboxComponent
	}]
})
export class FieldOptionsComboboxComponent implements ControlValueAccessor
{
	public items$: Observable<ApiModule.FieldOptionCollectionViewModel[]> = of([]);

	private _value: string;
	public get value(): string { return this._value; }
	public set value(value: string)
	{
		this._value = value;
		this.onChange(value);
		this.cdr.detectChanges();
	}

	@ViewChild('combobox') private combobox: ComboBoxComponent | undefined;
	public virtual: VirtualizationSettings = { itemHeight: 36 };
	public isLoading: boolean = false;

	public onChange: any = (_: string) => {};
	public onTouched: any = () => {};

	public touched = false;
	public disabled = false;

	constructor(private fieldOptionCollectionClient: ApiModule.FieldOptionCollectionClient,
				private modalService: ModalService,
				private cdr: ChangeDetectorRef)
	{
		this.items$ = this.fieldOptionCollectionClient.getAll();
	}

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

	public showEditFieldOptionsModal(): void
    {
		this.modalService.showEditFieldOptionsModal().subscribe(_ => this.items$ = this.fieldOptionCollectionClient.getAll());
	}
}
