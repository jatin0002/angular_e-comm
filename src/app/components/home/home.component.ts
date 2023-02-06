import { Product } from 'src/app/datatype';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  popularProducts: undefined | Product[];
  trendyProducts: undefined | Product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.popularProducts().subscribe((result) => {
      this.popularProducts = result;
    });

    this.productService.trendyProducts().subscribe((result) => {
      this.trendyProducts = result;
    });
  }
}
