//#region 'AngularBaseModules'
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//#endregion

//#region 'ApiModule'
import { ApiModule } from './api/api.generated';
//#endregion

//#region 'Components'
	//#region 'AppComponent'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppService } from './app.service';
	//#endregion

import { HeaderComponent } from './components/header/header.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
//#endregion

//#region 'Shared'
import { SharedModule } from './shared/shared.module';
//#endregion

//#region 'Services'
import { ModalService } from './services/modal.service';
import { NotifyService } from './services/notify.service';
import { ObjectFormService } from './services/object-form.service';
import { RoutingService } from './services/routing.service';
import { UserService } from './services/user.service';
//#endregion

//#region 'Interceptors'
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
//#endregion

const apiServices = [
	ApiModule.AccountClient,
	ApiModule.CategoryClient,
	ApiModule.EntityClient,
	ApiModule.EntityTemplateClient,
	ApiModule.FieldOptionCollectionClient,
	ApiModule.ModelClient,
];

const customServices = [
	ModalService,
	NotifyService,
	ObjectFormService,
	RoutingService,
	UserService,
];

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		NavMenuComponent,
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
		BrowserAnimationsModule,
		SharedModule,
		AppRoutingModule,
		HttpClientModule,
	],
	bootstrap: [AppComponent],
	providers: [
		AppService,
		...apiServices,
		...customServices,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true
		},
		{
			provide: APP_INITIALIZER,
			useFactory: appInitFactory,
			deps: [AppService],
			multi: true
		},
	]
})
export class AppModule { }

export function appInitFactory(service: AppService): () => Promise<void> {
	return () => { console.log('appInitFactory'); return service.appInit();};
}
