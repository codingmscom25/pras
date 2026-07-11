import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  remember = false;

  hidePassword = true;

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  login() {

    console.log({
      email: this.email,
      password: this.password
    });

  }

}
