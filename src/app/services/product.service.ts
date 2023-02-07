import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../datatype';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  BASE_URL: string = 'http://localhost:3000/products';
  cartData = new EventEmitter<Product[] | []>();

  constructor(private http: HttpClient) {}

  addProduct(data: Product) {
    return this.http.post(this.BASE_URL, data);
  }
  updateProduct(data: Product) {
    return this.http.put(this.BASE_URL + `/${data.id}`, data);
  }

  productList() {
    return this.http.get<Product[]>(this.BASE_URL);
  }

  deleteProduct(id: number) {
    return this.http.delete<Product>(this.BASE_URL + `/${id}`);
  }

  productById(id: number) {
    return this.http.get<Product>(this.BASE_URL + `/${id}`);
  }

  popularProducts() {
    return this.http.get<Product[]>(this.BASE_URL + '?_limit=3');
  }

  trendyProducts() {
    return this.http.get<Product[]>(this.BASE_URL + '?_limit=8');
  }

  searchProducts(query: string) {
    return this.http.get<Product[]>(this.BASE_URL + `?q=${query}`);
  }

  localAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);

      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      if (items) {
        items = items.filter((item: Product) => productId != item.id);
        localStorage.setItem('localCart', JSON.stringify(items));
        this.cartData.emit(items);
      }
    }
  }
}
