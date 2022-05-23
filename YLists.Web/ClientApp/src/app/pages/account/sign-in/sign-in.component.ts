import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiModule } from 'src/app/api/api.generated';
import { RoutingService } from 'src/app/services/routing.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

	public signInForm: FormGroup = new FormGroup({
		login: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
		rememberMe: new FormControl(true, Validators.required),
	});
	public isSubmitted: boolean = false;

	constructor(private routingService: RoutingService,
				private userService: UserService) { }

	ngOnInit(): void {
	}

	public submit(): void {
		this.isSubmitted = true;
		if (!this.signInForm.valid) {
			return;
		}

		const data = <ApiModule.SignInRequest> {
			login: this.signInForm.get('login').value,
			password: this.signInForm.get('password').value,
			rememberMe: this.signInForm.get('rememberMe').value
		}

		this.userService.userSignIn(data).subscribe(
			_ => this.routingService.navigateHome()
		);
	}
}
