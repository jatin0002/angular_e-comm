import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/datatype';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  addProduct(data: Product) {
    this.productService.addProduct(data).subscribe((result) => {
      if (result) {
        this.addProductMessage = 'Product Successfully Added.';
      }
    });
    setTimeout(() => {
      this.addProductMessage = undefined;
    }, 4000);
  }
}
