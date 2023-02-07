import { Product, Cart } from './../../datatype';
import { ProductService } from './../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;
  productQuantity: number = 1;
  removeCart: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    let productId = Number(this.route.snapshot.paramMap.get('productId'));
    productId &&
      this.productService.productById(productId).subscribe((result) => {
        this.productData = result;
      });

    let cartData = localStorage.getItem('localCart');
    if (productId && cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: Product) => item.id == productId);
      if (items.length) {
        this.removeCart = true;
      } else {
        this.removeCart = false;
      }
    }
  }

  handleQuantity(value: string) {
    if (this.productQuantity < 20 && value === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && value === 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        // here user is not logged in
        this.productService.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        // here user is logged in
        let loggedInUser = localStorage.getItem('user');
        let userId = loggedInUser && JSON.parse(loggedInUser).id;
        let cartData: Cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id;
        this.removeCart = true;
      }
    }
  }

  removeToCart(productId: number) {
    this.productService.removeItemFromCart(productId);
    this.removeCart = false;
  }
}
