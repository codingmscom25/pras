import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import Swal from 'sweetalert2';

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

  constructor(

  private authService: AuthService,

  private tokenService: TokenService,

  private router: Router

) {}

  login(): void {

  Swal.fire({

    title: 'Signing In...',

    text: 'Please wait a moment.',

    allowOutsideClick: false,

    allowEscapeKey: false,

    didOpen: () => {

      Swal.showLoading();

    }

  });

  this.authService.login({

    email: this.email,

    password: this.password

  })

  .subscribe({

    next: (response) => {

      Swal.close();

      this.tokenService.setTokens(

        response.data.accessToken,

        response.data.refreshToken

      );

      Swal.fire({

  icon: 'success',

  title: 'Welcome Back',

  text: response.message,

  timer: 3000,

  timerProgressBar: true,

  showConfirmButton: false,

  allowOutsideClick: false,

  allowEscapeKey: false

}).then(() => {

  this.router.navigate(['/admin']);

});

    },

    error: (error) => {

      Swal.close();

      Swal.fire({

  icon: 'error',

  title: 'Authentication Failed',

  text:
    error.error?.message ??
    'Unable to sign in.',

  timer: 3500,

  timerProgressBar: true,

  showConfirmButton: false,

  allowOutsideClick: true

});

    }

  });

}

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

}
