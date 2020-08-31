import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';


@Injectable({
	providedIn: 'root'
})
export class HotelService {

	private urlAPI: string = environment.url + 'hotel';

	constructor(private http: Http) { }

	findAll() {
		return this.http.get(this.urlAPI).pipe(map(result => result.json()));
	}

	findById(hotel) {
		let auxURL = this.urlAPI + '/' + hotel.id;

		return this.http.get(auxURL).pipe(map(result => result.json()));
	}

	save(hotel) {
		let auxURL = this.urlAPI;

		if (hotel.id) {
			auxURL += '/' + hotel.id;
			return this.http.put(auxURL, hotel).pipe(map(result => result.json()));
		} else {
			return this.http.post(auxURL, hotel).pipe(map(result => result.json()));
		}
	}

	delete(hotel) {
		let auxURL = this.urlAPI + '/' + hotel.id;

		return this.http.delete(auxURL).pipe(map(result => result.json()));
	}
}