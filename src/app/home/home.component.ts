import { Component, OnInit } from '@angular/core';
import data from '../data/data.json';
import { Course, kCurrencySymbol } from '../app.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    const formattedData: Course[] = data.map((v) => {
      const actualPrice = +v.actualPrice.replace(kCurrencySymbol, '');
      const discountPercentage = +v.discountPercentage.replace('%', '');
      const discountedPrice = (discountPercentage / 100) * actualPrice;

      return {
        ...v,
        actualPrice,
        discountPercentage,
        discountedPrice,
      };
    });

    console.log('HomeComponent : formattedData', formattedData);
  }
}
