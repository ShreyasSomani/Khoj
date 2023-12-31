import { BrowserModule } from
	'@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UploadFileComponent } from
	'./upload-file/upload-file.component';

import { AppComponent } from './app.component';
import {HttpClientModule} from
	'@angular/common/http';
@NgModule({
declarations: [
	AppComponent,
	UploadFileComponent,
],
imports: [
	BrowserModule,
	HttpClientModule
],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }
