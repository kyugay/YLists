// import { Component, Input } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// import { ModalService } from 'src/app/services/modal.service';
// import { ImageSelectFormControlData } from 'src/app/models/inputs/ImageSelectFormControlData';

// @Component({
// 	selector: 'app-image-select',
// 	templateUrl: './image-select.component.html',
// 	styleUrls: ['./image-select.component.scss'],
// 	providers: [{ 
// 		provide: NG_VALUE_ACCESSOR,
// 		multi: true,
// 		useExisting: ImageSelectComponent
// 	}]
// })
// export class ImageSelectComponent implements ControlValueAccessor {

// 	private _value: ImageSelectFormControlData;
// 	public get value(): ImageSelectFormControlData {
// 		return this._value;
// 	}
// 	public set value(value: ImageSelectFormControlData) {
// 		this._value = value;
// 		this.onChange(value);
// 	}

// 	@Input() public isViewed: boolean = false;

// 	public onChange: any = (_: ImageSelectFormControlData) => {};
// 	public onTouched: any = () => {};

// 	public touched = false;
// 	public disabled = false;

// 	constructor(private modalService: ModalService) { }

// 	public writeValue(obj: any): void {
// 		this.value = obj;
// 	}

// 	public registerOnChange(fn: any): void {
// 		this.onChange = fn;
// 	}

// 	public registerOnTouched(fn: any): void {
// 		this.onTouched = fn;
// 	}

// 	public setDisabledState?(isDisabled: boolean): void {
// 		this.disabled = isDisabled;
// 	}

// 	public markAsTouched() {
// 		if (!this.touched) {
// 			this.onTouched();
// 			this.touched = true;
// 		}
// 	}

// 	public showUpdateImageModal(): void {
// 		if (this.disabled)
// 			return;

// 		this.modalService.showUploadImageModal().subscribe(res => this.value = res);
// 	}
// }
