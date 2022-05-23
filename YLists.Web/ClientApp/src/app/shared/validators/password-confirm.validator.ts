import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function passwordConfirmValidator(passwordControl: AbstractControl): ValidatorFn {
	return (passwordConfirmControl: AbstractControl) : ValidationErrors | null => {
		const passwordValue = passwordControl.value;
		const value = passwordConfirmControl.value;

		return value && passwordValue !== value ? { passwordConfirm: true } : null;
	}
}