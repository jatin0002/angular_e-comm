import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/datatype';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  updateProductMessage: string | undefined;
  existedProduct: undefined | Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this.productService.productById(productId).subscribe((result) => {
        this.existedProduct = result;
      });
  }

  updateProduct(data: Product) {
    if (this.existedProduct) {
      data.id = this.existedProduct.id;
    }

    this.productService.updateProduct(data).subscribe((result) => {
      if (result) {
        this.updateProductMessage = 'Product Successfully Updated.';
      }
    });

    setTimeout(() => {
      this.updateProductMessage = undefined;
      this.router.navigate(['/seller-home']);
    }, 2000);
  }
}
