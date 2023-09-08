import { Component, OnDestroy, OnInit } from '@angular/core';
import { UploadFileService } from './upload-file.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit, OnDestroy {

	// Variable to store shortLink from api response
	shortLink: string = "";
	loading: boolean = false; // Flag variable
	selectedFile: File | null = null; // Variable to store file

	// Inject service
	constructor(private _uploadFileService: UploadFileService, private _http: HttpClient) { }

	ngOnInit(): void {
    const imageElement = document.getElementById('blah')  as HTMLImageElement;
    if(imageElement) {
    imageElement.style.display = "none";
    }
	}

	// On file Select
	onChange(event: any) {
		this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const imageElement = document.getElementById('blah')  as HTMLImageElement;
      if(imageElement) {
        imageElement.src = URL.createObjectURL(this.selectedFile);
        imageElement.style.display = "block";
      }
    }
	}

	// OnClick of button Upload
	onUpload() {
		this.loading = !this.loading;
		this._uploadFileService.upload(this.selectedFile).subscribe(
			(event: any) => {
        console.log(event);
				if (typeof (event) === 'object') {

					// Short link via api response
					this.shortLink = event.link;

					this.loading = false; // Flag variable
				}
			}
		);
	}

  ngOnDestroy(): void {
}
}
