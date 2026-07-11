import { CommonModule, NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {

  mobileMenu = false;

  scrolled = false;


  toggleMenu() {
    this.mobileMenu = !this.mobileMenu;
  }

  closeMenu() {
    this.mobileMenu = false;
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 40;
  }

  apiExample = `POST /api/password-recovery/request

{
   "email":"user@example.com"
}

Response

{
   "success": true,
   "message":"OTP sent successfully."
}`;

copyCode() {

navigator.clipboard.writeText(this.apiExample);

alert("Code copied!");

}

scrollTop() {

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

}

}