import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class UploadFileService {
	
// API url
baseApiUrl = "http://192.168.113.126:8080/khoj"
	
constructor(private http:HttpClient) { }

// Returns an observable
upload(file: any):Observable<any> {

	// Create form data
	const formData = new FormData();
		
	// Store form name as "file" with file data
	formData.append("image", file, "image");
		
	// Make http post request over api
	// with formData as req
	return this.http.post(this.baseApiUrl, formData)
}
// Returns an observable
searchText(name: any):Observable<any> {
	return this.http.get('http://192.168.113.126:8080'+'/search?query='+name);
}
}

