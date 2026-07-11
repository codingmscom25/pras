import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-password',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './new-password.html',
  styleUrl: './new-password.css',
})
export class NewPassword {
   password = '';
  confirmPassword = '';

  hidePassword = true;
  hideConfirmPassword = true;

  updatePassword() {

    console.log({
      password: this.password,
      confirmPassword: this.confirmPassword
    });

    // API later

  }

}
