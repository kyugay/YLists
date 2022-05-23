import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { NotifyService } from '../services/notify.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(private notifyService: NotifyService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			tap(_ => { },
				async error => {
					if (error instanceof HttpErrorResponse)
					{
						let message = error.message;

						if (error.error instanceof Blob && error.error.type === 'application/json')
						{
							const json = await error.error.text();
							const object = JSON.parse(json);

							if (this.isException(object))
								message = object.exception.message
						}
						
						this.notifyService.showError(message);
					}
				}
			)
		);
	}

	private isException(obj: any): boolean {
		return obj.hasOwnProperty('exception') && typeof obj.exception === "object" &&
			obj.exception.hasOwnProperty('message') && typeof obj.exception.message === "string";
	}
}