import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
	selector: '[ngVar]',
})
export class VarDirective {
	private context: { $implicit: unknown; ngVar: unknown; } = {
		$implicit: null,
		ngVar: null,
	};

	private hasView: boolean = false;

	@Input()
	set ngVar(context: unknown) {
		this.context.$implicit = this.context.ngVar = context;

		if (!this.hasView) {
			this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
			this.hasView = true;
		}
	}

	constructor(
		private templateRef: TemplateRef<any>,
		private viewContainerRef: ViewContainerRef
	) {}
}