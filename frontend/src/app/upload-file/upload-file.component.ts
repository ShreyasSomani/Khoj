import { Component, OnDestroy, OnInit } from '@angular/core';
import { UploadFileService } from './upload-file.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent implements OnInit, OnDestroy {
  public items: any = [
    { name: 'Milk', listItemHovered: false },
    { name: 'Coffee Powder', listItemHovered: false },
    { name: 'Sugar', listItemHovered: false },
    { name: 'Coffee Mug', listItemHovered: false },
  ];
  public dishes: Array<string> = ['Coffee', 'Tea', 'Hot Chocolate'];
  public productArrayToDiplay: any =[];
  public products: any = [
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '1Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '2Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '3Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '4Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '5Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '6Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '7Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '8Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '9Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '10Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
    {
      brand: 'Nandini',
      product: 'Milk',
      MRP: '50Rs',
      discountedPrice: '25Rs',
    },
  ];
  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  paginationCount = Math.floor(this.products.length / 6);
  selectedFile: File | null = null; // Variable to store file

  // Inject service
  constructor(
    private _uploadFileService: UploadFileService,
    private _http: HttpClient
  ) {}

  ngOnInit(): void {
    const imageElement = document.getElementById('blah') as HTMLImageElement;
    if (imageElement) {
      imageElement.style.display = 'none';
    }
   this. paginationFn();
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
  paginationFn(event: any = undefined, nthPage: any =0): void {
    if (event){
      event.preventDefault();
    }
    this.productArrayToDiplay =[];
    let productRange;
    switch (nthPage) {
      case 1:
        productRange = [0, 1, 2, 3, 4, 5];
        break;
      case 2:
        productRange = [6, 7, 8, 9, 10, 11];
        break;
      case 3:
        productRange = [12, 13, 14, 15, 16, 17];
        break;
      case 4:
        productRange = [18, 19, 20, 21, 22, 23];
        break;
      case 5:
        productRange = [24, 25, 26, 27, 28, 29];
        break;
      default:
        productRange = [0, 1, 2, 3, 4, 5];
    }
    if (productRange?.length && this.products?.length) {
    productRange.forEach((productIndex: number) => {
      if (this.products[productIndex]) {
      this.productArrayToDiplay.push(this.products[productIndex])}
      });
    }
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    this._uploadFileService
      .upload(this.selectedFile)
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          // Short link via api response
          this.shortLink = event.link;

          this.loading = false; // Flag variable
        }
      });
  }

  ngOnDestroy(): void {}

  hoverListItem(item: any) {
    item.listItemHovered = !item.listItemHovered;
  }
}
