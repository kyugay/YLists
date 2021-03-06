import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor() {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if (localStorage.getItem('token') != null) {
			const clonedReq = req.clone({
				headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
			});

			return next.handle(clonedReq).pipe(tap(
				_ => { },
				error => {
					if (error.status == 401) {
						localStorage.removeItem('token');
					}
				}
			));
		} else {
			return next.handle(req.clone());
		}
	}
}
