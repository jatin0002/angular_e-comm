import { SignUp, Login } from './../../datatype';
import { SellerService } from './../../services/seller.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  showLogin: boolean = true;
  authLoginErr: string = '';

  constructor(private sellerService: SellerService, private router: Router) {}

  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }

  signup(data: SignUp): void {
    this.sellerService.userSignUp(data);
  }

  login(data: Login): void {
    this.authLoginErr = '';

    this.sellerService.userLogin(data);
    this.sellerService.isLoginError.subscribe((isErr) => {
      if (isErr) {
        this.authLoginErr = 'Email or Password is not correct.';
      }
    });
  }

  toggleForms(): void {
    this.showLogin = !this.showLogin;
  }
}
