import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiModule } from 'src/app/api/api.generated';
import { Item } from 'src/app/models/inputs/item';
import { TrainItem } from 'src/app/models/inputs/TrainItem';

@Component({
	selector: 'train-modal',
	templateUrl: './train-modal.component.html',
	styleUrls: ['./train-modal.component.scss']
})
export class TrainModalComponent {
    public value: TrainItem = new TrainItem();

	public languages: Array<Item> = [
        { text: 'Russian', value: 'russian' },
        { text: 'English', value: 'english' },
    ]
    public templates$: Observable<Item[]> = of([]);

	constructor(entityTemplateClient: ApiModule.EntityTemplateClient)
    {
        this.templates$ = entityTemplateClient.getAll().pipe(map(templates => templates.map(t => <Item>{ text: t.name, value: t.id })));
    }
}
