import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cities: { name: string; image: string; alt: string }[] = [];
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.cities = (await this.http.get('cities').toPromise()) as {
      name: string;
      image: string;
      alt: string;
    }[];
  }
}
