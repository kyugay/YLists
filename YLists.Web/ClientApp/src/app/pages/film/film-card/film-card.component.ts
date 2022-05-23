// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';

// import { FilmService } from '../film.service';
// import { RoutingService } from 'src/app/services/routing.service';

// import { FilmDto } from 'src/app/dtos/film/filmDto';
// import { UpdateFilmRequest } from 'src/app/dtos/film/updateFilmRequest';
// import { EntityRequest } from 'src/app/dtos/entity/entityRequest';
// import { FilterDto } from 'src/app/dtos/filter/filterDto';
// import { ImageSelectFormControlData, ImageSelectType } from 'src/app/models/inputs/ImageSelectFormControlData';

// @Component({
// 	selector: 'app-film-card',
// 	templateUrl: './film-card.component.html',
// 	styleUrls: ['./film-card.component.scss']
// })
// export class FilmCardComponent implements OnInit {

// 	private _isNew: boolean = false;
// 	public get isNew(): boolean {
// 		return this._isNew;
// 	}
// 	public set isNew(value: boolean) {
// 		this._isNew = value;
// 	}

// 	private _isEdit: boolean = false;
// 	public get isEdit(): boolean {
// 		return this._isEdit;
// 	}
// 	public set isEdit(value: boolean) {
// 		this._isEdit = value;

// 		if (value)
// 			this.filmForm.enable();
// 		else
// 			this.filmForm.disable();
// 	}

// 	public filmForm: FormGroup = new FormGroup({
// 		id: new FormControl(),
// 		name: new FormControl(undefined, Validators.required),
// 		cover: new FormControl(new ImageSelectFormControlData()),
// 		year: new FormControl(),
// 		country: new FormControl(),
// 		genres: new FormControl([]),
// 		producer: new FormControl(),
// 		rating: new FormControl(),
// 		isViewed: new FormControl(false),
// 		description: new FormControl(),
// 		categories: new FormControl([])
// 	});
// 	public isSubmitted: boolean = false;
	
// 	constructor(private filmService: FilmService,
// 				private activatedRoute: ActivatedRoute,
// 				private routingService: RoutingService) {
// 		this.activatedRoute.paramMap.subscribe(params => {
// 			const id = params.get('id');
// 			this.isNew = id === 'new';
// 			this.isEdit = this.isNew;
// 			if (!this.isNew) {
// 				this.getFilmData(id);
// 			} else {
// 				this.filmForm.get('name').markAsTouched();
// 			}
// 		});
// 	}

// 	ngOnInit(): void { }

// 	private getFilmData(id: string): void {
// 		const data = <EntityRequest>{ id };
// 		this.filmService.getFilm(data).subscribe(result => {
// 			if (result.isError) {
// 				this.closeCard();
// 			} else {
// 				this.updateForm(<FilmDto>result.data);
// 			}
// 		});
// 	}

// 	private updateForm(film: FilmDto): void {
// 		this.filmForm.get('id').setValue(film.id);
// 		this.filmForm.get('name').setValue(film.name);
// 		this.filmForm.get('cover').setValue(<ImageSelectFormControlData> { imageSrc: film.cover, imageType: ImageSelectType.FromFile });
// 		this.filmForm.get('year').setValue(film.year ? new Date(film.year, 1) : null);
// 		this.filmForm.get('country').setValue(film.country?.id);
// 		this.filmForm.get('genres').setValue(film.genres ? film.genres.map(g => g.id) : []);
// 		this.filmForm.get('producer').setValue(film.producer?.id);
// 		this.filmForm.get('rating').setValue(film.rating);
// 		this.filmForm.get('isViewed').setValue(film.isViewed);
// 		this.filmForm.get('description').setValue(film.description);
// 		this.filmForm.get('categories').setValue(film.categories ? film.categories.map(c => c.id) : []);
// 		this.filmForm.markAsPristine();
// 	}

// 	public saveCard(): void {
// 		this.isSubmitted = true;
// 		if (!this.filmForm.valid) {
// 			return;
// 		}
// 		this.isSubmitted = false;

// 		const modifiedFields = [];
// 		for (let controlName in this.filmForm.controls) {
// 			if (!this.filmForm.get(controlName).dirty)
// 				continue;
// 			switch (controlName) {
// 				case 'id':
// 					break;
// 				default:
// 					modifiedFields.push(controlName);
// 					break;
// 			}
// 		}
		
// 		const cover = <ImageSelectFormControlData>this.filmForm.get('cover').value;
// 		const data = <UpdateFilmRequest> {
// 			id: this.filmForm.get('id').value,
// 			name: this.filmForm.get('name').value,
// 			coverData: cover.imageType == ImageSelectType.FromFile ? cover.imageSrc : null,
// 			coverUrl: cover.imageType == ImageSelectType.FromURL ? cover.imageSrc : null,
// 			year: this.filmForm.get('year').value?.getFullYear(),
// 			rating: this.filmForm.get('rating').value,
// 			description: this.filmForm.get('description').value,
// 			isViewed: this.filmForm.get('isViewed').value,
// 			countryId: this.filmForm.get('country').value,
// 			producerId: this.filmForm.get('producer').value,
// 			genreIdList: this.filmForm.get('genres').value,
// 			categoryIdList: this.filmForm.get('categories').value,

// 			isNew: this.isNew,
// 			modifiedFieldsNames: modifiedFields
// 		};

// 		this.filmService.updateFilm(data).subscribe(res => {
// 			if (!res.isError) {
// 				const id = res.data;
// 				if (this.isNew) {
// 					this.routingService.navigateFilmCard(id);
// 				} else {
// 					this.getFilmData(id);
// 				}
// 				this.isNew = this.isEdit = false;
// 			}
// 		});
// 	}

// 	public deleteCard(): void {
// 		if (this.isNew) {
// 			this.closeCard()
// 			return;
// 		}

// 		const data = <EntityRequest>{ id: this.filmForm.get('id').value };
// 		this.filmService.deleteFilm(data).subscribe(_ => this.closeCard());
// 	}

// 	public closeCard(): void {
// 		this.routingService.navigateFilmList();
// 	}
// }
