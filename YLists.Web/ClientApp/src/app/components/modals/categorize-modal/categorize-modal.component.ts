import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiModule } from 'src/app/api/api.generated';
import { Item } from 'src/app/models/inputs/item';

@Component({
	selector: 'categorize-modal',
	templateUrl: './categorize-modal.component.html',
	styleUrls: ['./categorize-modal.component.scss']
})
export class CategorizeModalComponent implements OnInit {
    public templateId: string;
    public modelId: string;
    public currentCategory: ApiModule.CategoryViewModel;

    public models$: Observable<Item[]> = of([]);

    public destinationCategory: ApiModule.CategoryViewModel[] = [];

	constructor(private modelClient: ApiModule.ModelClient) { }

    ngOnInit(): void {
        this.models$ = this.modelClient.getAll()
            .pipe(map(models =>
                models.filter(m => m.entityTemplateId === this.templateId)
                    .map(m => <Item> { text: m.name, value: m.id })
            ));

        if (this.currentCategory)
        {
            this.destinationCategory.push(this.currentCategory);
        }
    }
}
