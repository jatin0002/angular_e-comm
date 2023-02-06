import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../datatype';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  BASE_URL: string = 'http://localhost:3000/products';
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

  deleteProduct(id: string) {
    return this.http.delete<Product>(this.BASE_URL + `/${id}`);
  }

  productById(id: string) {
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
}
