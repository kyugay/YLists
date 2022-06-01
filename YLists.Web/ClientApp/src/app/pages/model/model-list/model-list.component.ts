import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { ApiModule } from 'src/app/api/api.generated';
import { ModalService } from 'src/app/services/modal.service';

@Component({
	selector: 'model-list',
	templateUrl: './model-list.component.html',
	styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit
{
	public models$: Observable<ApiModule.ModelViewModel[]> = of([]);
	public isLoading: boolean = false;

	public updateItems$: EventEmitter<void> = new EventEmitter<void>();

	constructor(private modelClient: ApiModule.ModelClient,
				private modalService: ModalService) { }

	ngOnInit(): void
	{
		this.models$ = of(this.updateItems$).pipe(
			tap(_ => this.isLoading = true),
			switchMap(_ => this.modelClient.getAll().pipe(
				tap(_ => this.isLoading = false)
			))
		);
	}

	public showTrainModal(): void
	{
		this.modalService.showTrainModal().subscribe(_ => this.updateItems$.emit());
	}

	public tuneModel(modelId: string): void
	{
		this.modelClient.tune(modelId).subscribe(_ => this.updateItems$.emit());
	}
	
	public deleteModel(modelId: string): void
	{
		this.modelClient.delete(modelId).subscribe(_ => this.updateItems$.emit());
	}
}
