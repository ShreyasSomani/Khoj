import { Component, OnDestroy, OnInit } from '@angular/core';
import { UploadFileService } from './upload-file.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent implements OnInit, OnDestroy {
  public dishes: Array<string> = [];
  public items: any = [];
  public products: any = [];
  // Variable to store areDishesAvailable from api response
  areDishesAvailable: string | undefined = '';
  loading: boolean = false; // Flag variable
  paginationCount = Math.floor(this.products.length / 6);
  selectedFile: File | null = null; // Variable to store file

  // Inject service
  constructor(
    public uploadFileService: UploadFileService,
    private _http: HttpClient
  ) {}

  ngOnInit(): void {
    const imageElement = document.getElementById('blah') as HTMLImageElement;
    if (imageElement) {
      imageElement.style.display = 'none';
    }
  }

  // On file Select
  onChange(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const imageElement = document.getElementById('blah') as HTMLImageElement;
      if (imageElement) {
        imageElement.src = URL.createObjectURL(this.selectedFile);
        imageElement.style.display = 'block';
      }
      this.onUpload();
    }
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    this.areDishesAvailable = undefined;
    this.uploadFileService
      .upload(this.selectedFile)
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          // Short link via api response
          this.areDishesAvailable = event.dishes;
          this.dishes = Object.keys(event.dishes);
          this.items = event.dishes[this.dishes[0]].keywords.map((keyword: any)=>(
            {
              name: keyword,
              listItemHovered: false
            } 
      ));
      this.products = event.products;

          this.loading = false; // Flag variable
        }      
      });
  }

  public searchText(name:any) {
    this.uploadFileService.searchText(name).subscribe((data:any) =>{
      this.products = data;
    })

  }

  ngOnDestroy(): void {}

  hoverListItem(item: any) {
    item.listItemHovered = !item.listItemHovered;
  }
}
