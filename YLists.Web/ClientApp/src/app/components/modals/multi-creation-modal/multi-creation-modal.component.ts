import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ApiModule } from 'src/app/api/api.generated';
import { FileUtils } from 'src/app/shared/utils/FileUtils';

@Component({
	selector: 'multi-creation-modal',
	templateUrl: './multi-creation-modal.component.html',
	styleUrls: ['./multi-creation-modal.component.scss']
})
export class MultiCreationModalComponent implements OnInit {
    public templateId: string;
    public categoryId: string | null = null;

    public files: File[] = [];

	constructor(private entityTemplateClient: ApiModule.EntityTemplateClient) { }

    ngOnInit(): void { }

    public generateMultiCreationTemplate(): void
    {
        this.entityTemplateClient
            .generateMultiCreationTemplate(this.templateId)
            .pipe(first())
            .subscribe(file => FileUtils.downloadFile(file));
    }
}
