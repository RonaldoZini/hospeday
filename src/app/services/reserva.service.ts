import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';


@Injectable({
	providedIn: 'root'
})
export class ReservaService {

	private urlAPI: string = environment.url + 'reserva';

	constructor(private http: Http) { }

	findAll() {
		return this.http.get(this.urlAPI).pipe(map(result => result.json()));
	}

	findOne(reserva) {
		let auxURL = this.urlAPI + '/' + reserva.id;

		return this.http.get(auxURL).pipe(map(result => result.json()));
	}

	save(reserva) {
		let auxURL = this.urlAPI;

		if (reserva.id) {
			auxURL += '/' + reserva.id;
			return this.http.put(auxURL, reserva).pipe(map(result => result.json()));
		} else {
			return this.http.post(auxURL, reserva).pipe(map(result => result.json()));
		}
	}

	delete(reserva) {
		let auxURL = this.urlAPI + '/' + reserva.id;

		return this.http.delete(auxURL).pipe(map(result => result.json()));
	}
}