import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
 sidebarOpen = true;
 showProfileMenu = false;

showNotifications = false;

notifications = [

  {
    icon: 'fa-user-plus',
    title: 'New client registered',
    time: '2 min ago'
  },

  {
    icon: 'fa-key',
    title: 'Password recovery completed',
    time: '18 min ago'
  },

  {
    icon: 'fa-triangle-exclamation',
    title: 'API returned 500 error',
    time: '1 hour ago'
  }

];

  constructor(
  private router: Router
) {
  this.checkScreen();
}

  @HostListener('window:resize')
  onResize() {
    this.checkScreen();
  }

  checkScreen() {

    if (window.innerWidth <= 768) {

      this.sidebarOpen = false;

    } else {

      this.sidebarOpen = true;

    }

  }

  toggleSidebar() {

    this.sidebarOpen = !this.sidebarOpen;

  }

  closeSidebar() {

    if (window.innerWidth <= 768) {

      this.sidebarOpen = false;

    }

  }

  toggleProfileMenu() {

  this.showProfileMenu =
    !this.showProfileMenu;

  this.showNotifications = false;

}

toggleNotifications() {

  this.showNotifications =
    !this.showNotifications;

  this.showProfileMenu = false;

}

logout() {

  Swal.fire({

    title: 'Logout?',

    text: 'You are about to end this session.',

    icon: 'question',

    showCancelButton: true,

    confirmButtonText: 'Logout',

    cancelButtonText: 'Cancel',

    confirmButtonColor: '#C6A15B'

  }).then(result => {

    if (result.isConfirmed) {

      localStorage.clear();

      this.router.navigate(['/']);

    }

  });

}
}

