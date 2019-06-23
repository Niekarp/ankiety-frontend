import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class DataService
{
	constructor(private http: HttpClient, private api: ApiService) { }

	private getObjectUrl(type: Function): string
	{
		return this.api.baseUrl + '/' + type.name.toLowerCase() + 's';
	}

	private getObjectUrlWithId(object: Object): string
	{
		return this.getObjectUrl(object.constructor) + `/${object['id']}`;
	}
	
	// SINGLE OBJECT BY CLASS NAME
	public postObject<T>(object: T): Observable<T>
	{
		const url = this.getObjectUrl(object.constructor);
		return this.http.post<T>(url, object).pipe
		(
			catchError(this.handleError)
		);
	}
		
	public getObject<T>(type: new () => T, id: number): Observable<T>
	{
		const url = this.getObjectUrl(type) + `/${id}`;
		return this.http.get<T>(url).pipe
		(
			catchError(this.handleError)
		);
	}

	public putObject<T>(object: T): Observable<T>
	{
		const url = this.getObjectUrlWithId(object);
		return this.http.put<T>(url, object).pipe
		(
			catchError(this.handleError)
		);
	}

	public deleteObject<T>(object: T): Observable<T>
	{
		const url = this.getObjectUrlWithId(object);
		return this.http.delete<T>(url).pipe
		(
			catchError(this.handleError)
		);
	}

	// MANY OBJECTS BY CLASS NAME
	public getObjects<T>(type: new () => T): Observable<T[]>
	{
		const url = this.getObjectUrl(type);
		return this.http.get<T[]>(url).pipe
		(
			catchError(this.handleError)
		);
	}

	// SINGLE OBJECT BY URL (NOT RECOMMENDED TO USE)
	public postObjectByUrl<T>(object: T, relativeUrl: string): Observable<T>
	{
		const url = this.api.baseUrl + relativeUrl;
		return this.http.post<T>(url, object).pipe
		(
			catchError(this.handleError)
		);
	}

	// MANY OBJECTS BY URL (NOT RECOMMENDED TO USE)
	public getObjectsByUrl<T>(type: new () => T, relativeUrl: string): Observable<T[]>
	{
		const url = this.api.baseUrl + relativeUrl;
		return this.http.get<T[]>(url).pipe
		(
			catchError(this.handleError)
		);
	}

	// CUSTOM
	getFakeSurveys()
	{
		return this.http.get('http://www.mocky.io/v2/5c34b1b92e00008200379039')
	}

	private handleError(error: HttpErrorResponse)
	{
		if (error.error instanceof ErrorEvent)
		{
			console.error('An client-side or network error occured: ', error.error.message);
		}
		else
		{
			console.error(`Backend returned code ${error.status}, ` + `body was: ${JSON.stringify(error.error)}`);
		}
		return throwError('Something bad happened');
	}
}

	/* 
	public postObjectByUrlWithOptions<T>(object: T, relativeUrl: string, options: any): Observable<HttpEvent<T>>
	{
		const url = `${this.api.baseUrl}${relativeUrl}`;
		return this.http.post<T>(url, object, options).pipe
		(
		catchError(this.handleError)
		);
	}

	public putObjectByUrl<T>(object: T, relativeUrl: string): Observable<T>
	{
		const url = `${this.api.baseUrl}${relativeUrl}?id=${(<any>object).id}`;
		return this.http.put<T>(url, object).pipe
		(
		catchError(this.handleError)
		);
	}

	public deleteObjectByUrl<T>(object: T, relativeUrl: string): Observable<T>
	{
		const url = `${this.api.baseUrl}${relativeUrl}?id=${(<any>object).id}`;
		return this.http.delete<T>(url).pipe
		(
		catchError(this.handleError)
		);
	}

	public getObjectsByUrl<T>(type: new () => T, relativeUrl: string): Observable<T[]>
	{
		const url = `${this.api.baseUrl}${relativeUrl}`;
		return this.http.get<T[]>(url).pipe
		(
			catchError(this.handleError)
		);
	}
	*/
