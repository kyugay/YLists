import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiModule } from 'src/app/api/api.generated';
import { Item } from 'src/app/models/inputs/item';

@Component({
	selector: 'categorize-all-modal',
	templateUrl: './categorize-all-modal.component.html',
	styleUrls: ['./categorize-all-modal.component.scss']
})
export class CategorizeAllModalComponent implements OnInit {
    public templateId: string;
    public modelId: string;
    public currentCategoryId: string;
    public useNestedCategories: boolean = false;

    public models$: Observable<Item[]> = of([]);

    public destinationCategory: ApiModule.CategoryViewModel[] = [];

	constructor(private modelClient: ApiModule.ModelClient,
        private categoryClient: ApiModule.CategoryClient) { }

    ngOnInit(): void {
        this.models$ = this.modelClient.getAll()
            .pipe(map(models =>
                models.filter(m => m.entityTemplateId === this.templateId)
                    .map(m => <Item> { text: m.name, value: m.id })
            ));

        if (this.currentCategoryId)
        {
            this.categoryClient.get(this.currentCategoryId)
                .subscribe(model => this.destinationCategory.push(model));
        }
    }
}
