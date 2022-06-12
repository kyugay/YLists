//#region 'Modules'
	//#region 'AngularBaseModules'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
	//#endregion

	//#region 'KendoModules'
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { IconsModule } from '@progress/kendo-angular-icons';
import { PopupModule } from '@progress/kendo-angular-popup';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FileSelectModule, UploadModule } from '@progress/kendo-angular-upload';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ListBoxModule } from '@progress/kendo-angular-listbox';
import { GridModule } from '@progress/kendo-angular-grid';
	//#endregion

import { ClipboardModule } from 'ngx-clipboard'

//#endregion

//#region 'Components'
	//#region 'InputComponents'
import { CategoryMultiselectTreeComponent } from '../components/inputs/category-multiselect-tree/category-multiselect-tree.component';
import { CustomCheckboxesComponent } from '../components/inputs/custom-checkboxes/custom-checkboxes.component';
import { CustomMultiselectComponent } from '../components/inputs/custom-multiselect/custom-multiselect.component';
import { DynamicEntityFieldComponent } from '../components/inputs/dynamic-entity-field/dynamic-entity-field.component';
import { FieldOptionsComboboxComponent } from '../components/inputs/field-options-combobox/field-options-combobox.component';
	//#endregion

	//#region 'Modals'
import { AddItemModalComponent } from '../components/modals/add-item-modal/add-item-modal.component';
import { CategorizeAllModalComponent } from '../components/modals/categorize-all-modal/categorize-all-modal.component';
import { CategorizeModalComponent } from '../components/modals/categorize-modal/categorize-modal.component';
import { EditFieldOptionsModalComponent } from '../components/modals/edit-field-options-modal/edit-field-options-modal.component';
import { MultiCreationModalComponent } from '../components/modals/multi-creation-modal/multi-creation-modal.component';
import { TrainModalComponent } from '../components/modals/train-modal/train-modal.component';
	//#endregion
//#endregion

//#region 'Pipes'
import { AsPipe } from '../pipes/as.pipe';
//#endregion

//#region 'Directives'
import { VarDirective } from '../directives/ng-var.directive';
//#endregion

const angularBaseModules = [
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,
];

const kendoModules = [
	InputsModule,
	ButtonsModule,
	LabelModule,
	LayoutModule,
	IconsModule,
	PopupModule,
	TooltipModule,
	NotificationModule,
	DropDownsModule,
	FileSelectModule,
	UploadModule,
	DateInputsModule,
	DialogsModule,
	ListBoxModule,
	GridModule,
];

const modules = [
	...angularBaseModules,
	...kendoModules,
	ClipboardModule,
]

const inputComponents = [
	CategoryMultiselectTreeComponent,
	CustomCheckboxesComponent,
	CustomMultiselectComponent,
	DynamicEntityFieldComponent,
	FieldOptionsComboboxComponent,
];

const modals = [
	AddItemModalComponent,
	CategorizeAllModalComponent,
	CategorizeModalComponent,
	EditFieldOptionsModalComponent,
	MultiCreationModalComponent,
	TrainModalComponent,
];

const components = [
	...inputComponents,
	...modals,
];

const pipes = [
	AsPipe,
];

const directives = [
	VarDirective,
];

@NgModule({
	declarations: [
		...components,
		...pipes,
		...directives,
	],
	imports: [
		...modules,
	],
	exports: [
		...modules,
		...components,
		...pipes,
		...directives,
	],
})
export class SharedModule { }
