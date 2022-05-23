import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";

@Injectable()
export class ObjectFormService {

	constructor() {
	}

	public formToObject<T>(form: FormGroup): T
	{
		return <T>form.getRawValue();
	}

	public objectToForm<T>(object: T, keys: Array<keyof T> = Object.keys(object) as Array<keyof T>): FormGroup
	{
		return <FormGroup>this.objectToFormGroup(object, keys);
	}

	private objectToFormControl<T>(object: T): FormControl
	{
		if (object === null)
			return new FormControl(null);
		if (object)
			return new FormControl(object);

		switch(typeof object) {
			case 'boolean':
				return new FormControl(false);
			case 'number':
				return new FormControl(0);
			case 'string':
				return new FormControl('');
			default:
				return new FormControl(undefined);

		}
	}

	private objectToFormGroup<T>(object: T, keys: Array<keyof T>): AbstractControl
	{
		if (object) {
			const group = keys.reduce((acc, key) => {
				const control =
					Array.isArray(object[key]) ? this.objectToFormArray(object[key]) :
					object[key] === null ? this.objectToFormControl(object[key]) :
					object[key] instanceof Date ? this.objectToFormControl(object[key]) :
					typeof object[key] === 'object' ? this.objectToFormGroup(object[key], Object.keys(object[key]) as Array<keyof T[keyof T]>) :
					this.objectToFormControl(object[key]);
	
				return { ...acc, [key]: <AbstractControl>control}
			}, {});
	
			return new FormGroup(group);
		}

		return new FormGroup({});
	}

	private objectToFormArray<T>(objects: T): FormArray
	{
		if (Array.isArray(objects)) {
			const array = objects.map(object => {
				const control =
					Array.isArray(object) ? this.objectToFormArray(object) :
					typeof object === 'object' ? this.objectToFormGroup(object, Object.keys(object)) :
					this.objectToFormControl(object);
				
				return <AbstractControl>control;
			});

			return new FormArray(array);
		}
		return new FormArray([]);
	}
}

