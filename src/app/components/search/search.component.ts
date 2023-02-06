import { Product } from 'src/app/datatype';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { AfterContentChecked, Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResult: undefined | Product[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let query = this.route.snapshot.paramMap.get('query');
    query &&
      this.productService.searchProducts(query).subscribe((result) => {
        this.searchResult = result;
        console.log(result);
      });
  }
}
