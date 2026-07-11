import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fogort-password',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fogort-password.html',
  styleUrl: './fogort-password.css',
})
export class FogortPassword {
   email = '';

  sendResetLink() {

    console.log(this.email);

    // API itawekwa baadaye

  }

}
