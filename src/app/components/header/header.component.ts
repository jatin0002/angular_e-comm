import { Product } from 'src/app/datatype';
import { ProductService } from './../../services/product.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | Product[];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';

          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore);
            this.sellerName = sellerData[0].name;
          }
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  searchProduct(query: KeyboardEvent) {

    if (query) {
      const element = query.target as HTMLInputElement;
      this.productService.searchProducts(element.value).subscribe((result) => {
        if(result.length >5){
          result.length = 5;
        }
        this.searchResult = result;
      });
    }
  }

  hideSearch(){
    this.searchResult = undefined
  }

  submitSearch(val:string){
    this.router.navigate([`search/${val}`])
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['']);
  }
}
