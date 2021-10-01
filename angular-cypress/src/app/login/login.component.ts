import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  remember = false;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  async login() {
    const result = await this.http
      .post('login', {
        username: this.username,
        password: this.password,
      })
      .toPromise();
    if (result) {
      this.router.navigateByUrl('/home');
    }
  }
}