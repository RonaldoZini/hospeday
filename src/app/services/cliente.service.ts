import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ClienteService {

	private urlAPI: string = environment.url + 'cliente';

	constructor(private http: Http) { }

	findAll() {
		return this.http.get(this.urlAPI).pipe(map(result => result.json()));
	}

	findOne(cliente) {
		let auxURL = this.urlAPI + '/' + cliente.id;

		return this.http.get(auxURL).pipe(map(result => result.json()));
	}

	save(cliente) {
		let auxURL = this.urlAPI;

		if (cliente.id) {
			auxURL += '/' + cliente.id;
			return this.http.put(auxURL, cliente).pipe(map(result => result.json()));
		} else {
			return this.http.post(auxURL, cliente).pipe(map(result => result.json()));
		}
	}

	delete(cliente) {
		let auxURL = this.urlAPI + '/' + cliente.id;

		return this.http.delete(auxURL).pipe(map(result => result.json()));
	}
}