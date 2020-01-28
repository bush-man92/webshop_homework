import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

import { LOGIN_MUTATION } from '../graphql';
import { UserService } from './user-service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor (private apollo: Apollo, private router: Router, private userService: UserService) {
  }

  public pageTitle = 'LOGIN';
  username: String = "";
  password: String = "";
  show_username_error: boolean = false;
  show_password_error: boolean = false;
  error_message: String;

  check_username() {
    if (this.username === "") {
      this.error_message = "Enter a username"
      this.show_username_error = true;
    }
    else if (this.username.length > 0) {
      this.show_username_error = false;
      return true
    }
  }

  check_password() {
    if (this.password === "") {
      this.error_message = "Enter a password"
      this.show_password_error = true
    }
    else if (this.password.length > 0) {
      this.show_password_error = false
      return true
    }
  }

  onClick(username, password) {
    if (this.check_username() === true && this.check_password() === true) {
      this.apollo.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          username: username,
          password: password
        }
      }).subscribe(({ data }) => {
        if (data.login.user.username === "Wrong password") {
          this.show_password_error = true;
          this.error_message = data.login.user.username;
        }
        else {
          this.userService.logUser(data.login.user)
          this.router.navigate(['/products'])
        }
      },(error) => {
        this.show_username_error = true;
        this.error_message = "Username doesn't exists"
        console.log(error)
      });
    }
  }
}
