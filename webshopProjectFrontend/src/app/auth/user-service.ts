import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {

  private user = new BehaviorSubject('unknown user');
  currentUser = this.user.asObservable();

  constructor() { }

  logUser(newUser) {
    this.user.next(newUser);
    localStorage.setItem('user_id', newUser.id)
    localStorage.setItem('username', newUser.username)
  }
}