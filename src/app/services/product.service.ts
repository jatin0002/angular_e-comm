import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../datatype';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  BASE_URL: string = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  addProduct(data: Product) {
    return this.http.post(this.BASE_URL, data);
  }

  productList() {
    return this.http.get<Product[]>(this.BASE_URL);
  }

  deleteProduct(id: string) {
    return this.http.delete<Product>(this.BASE_URL + `/${id}`);
  }
}
