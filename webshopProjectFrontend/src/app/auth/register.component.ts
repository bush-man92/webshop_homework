import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

import { REGISTER_MUTATION } from '../graphql';
import { UserService } from './user-service';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  constructor (private apollo: Apollo, private router: Router, private userService: UserService) {
  }
  public pageTitle = 'REGISTRATION';
  username: String = "";
  password: String = "";
  email: String = "";
  show_username_error: boolean = false;
  show_password_error: boolean = false;
  show_email_error: boolean = false;
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

  check_email(){
      if (this.email === "") {
          this.error_message = "Enter an email"
          this.show_email_error = true
      }
      else if (this.email.length > 0) {
          this.show_email_error = false;
          return true
      }
  }

  onClick(username, password, email) {
    if (this.check_username() === true && this.check_password() === true && this.check_email() === true) {
      this.apollo.mutate({
        mutation: REGISTER_MUTATION,
        variables: {
          username: username,
          password: password,
          email: email
        }
      }).subscribe(({ data }) => {
          this.userService.logUser(data.registration.user)
          this.router.navigate(['/products'])
      },(error) => {
        this.show_email_error = true;
        this.show_username_error = true;
        this.error_message = "Email or username already exists"
      });
    }
  }
}