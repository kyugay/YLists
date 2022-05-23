import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiModule } from 'src/app/api/api.generated';
import { RoutingService } from 'src/app/services/routing.service';
import { UserService } from 'src/app/services/user.service';
import { passwordValidator } from 'src/app/shared/validators/password.validator';
import { passwordConfirmValidator } from 'src/app/shared/validators/password-confirm.validator';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

	public signUpForm: FormGroup = new FormGroup({
		login: new FormControl('', [Validators.required, Validators.minLength(3)]),
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.minLength(8), passwordValidator()]),
		passwordConfirm: new FormControl('', [Validators.required]),
	});
	public isSubmitted: boolean = false;

	constructor(private routingService: RoutingService,
				private userService: UserService) { }

	ngOnInit(): void {
		this.signUpForm.get('passwordConfirm').setValidators([
			Validators.required,
			passwordConfirmValidator(this.signUpForm.get('password'))
		]);
	}

	public submit(): void {
		this.isSubmitted = true;
		if (!this.signUpForm.valid) {
			return;
		}

		const data = <ApiModule.SignUpRequest> {
			login: this.signUpForm.get('login').value,
			email: this.signUpForm.get('email').value,
			password: this.signUpForm.get('password').value,
			passwordConfirm: this.signUpForm.get('passwordConfirm').value
		}

		this.userService.userSignUp(data).subscribe(
			_ => this.routingService.navigateSignIn()
		);
	}
}
