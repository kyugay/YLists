import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators'

import { ApiModule } from "../api/api.generated";

@Injectable()
export class UserService {

	public currentUser: ApiModule.IdentityUserViewModel = null;
 
    constructor(private accountClient: ApiModule.AccountClient) {
    }

	public getCurrentUser(): Observable<ApiModule.IdentityUserViewModel> {
		return this.accountClient.getCurrentUser().pipe(
			tap(user => this.currentUser = user)
		);
	}

	public userSignIn(data: ApiModule.SignInRequest): Observable<ApiModule.IdentityUserViewModel> {
		return this.accountClient.userSignIn(data).pipe(
			tap(user => {
				this.currentUser = user;
				localStorage.setItem('token', user.token);
			}
		));
	}

	public userSignOut(): Observable<void> {
		return this.accountClient.userSignOut().pipe(
			tap(_ => {
				this.currentUser = null;
				localStorage.removeItem('token');
			}
		));
	}

	public userSignUp(data: ApiModule.SignUpRequest): Observable<void> {
		return this.accountClient.userSignUp(data);
	}
}

