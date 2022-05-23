import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function passwordValidator(): ValidatorFn {
	return (control: AbstractControl) : ValidationErrors | null => {
		const value = control.value;
		if (!value) {
			return null;
		}
		
		const hasChars = /[A-Za-z]+/.test(value);
		const hasNumeric = /[0-9]+/.test(value);
		const passwordValid = hasChars && hasNumeric;

		return !passwordValid ? { password: true } : null;
	}
}