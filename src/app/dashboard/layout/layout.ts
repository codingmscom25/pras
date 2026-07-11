import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
 sidebarOpen = true;

  constructor() {
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
}

