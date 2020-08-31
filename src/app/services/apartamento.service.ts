import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ApartamentoService {

	private urlAPI: string = environment.url + 'apartamento';

	constructor(private http: Http) { }

	findAll() {

		return this.http.get(this.urlAPI).pipe(map(result => result.json()));
	}

	findOne(apartamento) {
		let auxURL = this.urlAPI + '/' + apartamento.id;

		return this.http.get(auxURL).pipe(map(result => result.json()));
	}

	save(apartamento) {
		let auxURL = this.urlAPI;

		if (apartamento.id) {
			auxURL += '/' + apartamento.id;
			return this.http.put(auxURL, apartamento).pipe(map(result => result.json()));
		} else {
			return this.http.post(auxURL, apartamento).pipe(map(result => result.json()));
		}
	}

	delete(apartamento) {
		let auxURL = this.urlAPI + '/' + apartamento.id;

		return this.http.delete(auxURL).pipe(map(result => result.json()));
	}
}