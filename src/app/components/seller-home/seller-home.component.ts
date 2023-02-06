import { Product } from './../../datatype';
import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | Product[];
  productMessage: string = '';
  iconDelete = faTrash;
  iconEdit = faEdit;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products();
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product Successfully Deleted!!';
        this.products();
      }
    });

    setTimeout(() => {
      this.productMessage = '';
    }, 3000);
  }

  products() {
    this.productService.productList().subscribe((result) => {
      this.productList = result;
    });
  }
}
