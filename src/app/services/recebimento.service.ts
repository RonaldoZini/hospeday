import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';


@Injectable({
	providedIn: 'root'
})
export class RecebimentoService {

	private urlAPI: string = environment.url + 'recebimento';

	constructor(private http: Http) { }

	findAll() {
		return this.http.get(this.urlAPI).pipe(map(result => result.json()));
	}

	findOne(recebimento) {
		let auxURL = this.urlAPI + '/' + recebimento.id;

		return this.http.get(auxURL).pipe(map(result => result.json()));
	}

	save(recebimento) {
		let auxURL = this.urlAPI;

		if (recebimento.id) {
			auxURL += '/' + recebimento.id;
			return this.http.put(auxURL, recebimento).pipe(map(result => result.json()));
		} else {
			return this.http.post(auxURL, recebimento).pipe(map(result => result.json()));
		}
	}

	delete(recebimento) {
		let auxURL = this.urlAPI + '/' + recebimento.id;

		return this.http.delete(auxURL).pipe(map(result => result.json()));
	}
}