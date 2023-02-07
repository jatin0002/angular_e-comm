import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Login, SignUp } from './../../datatype';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: undefined | string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.authUserReload();
  }

  toggle() {
    this.showLogin = !this.showLogin;
  }

  signUp(data: SignUp) {
    this.userService.userSignUp(data);
  }

  login(data: Login) {
    this.userService.userLogin(data);
    this.userService.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = 'Plese enter valid user details.';
      } else {
        this.authError = undefined;
      }
    });
  }
}
