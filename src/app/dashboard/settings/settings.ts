import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  settings = {

    systemName: 'PRAS',

    companyName: 'PRAS API',

    supportEmail: 'support@pras.co.tz',

    baseUrl: 'https://api.pras.co.tz',

    otpExpiry: 10,

    otpAttempts: 5,

    resetExpiry: 30,

    smtpHost: 'smtp.gmail.com',

    smtpPort: 587,

    smtpUsername: '',

    senderEmail: '',

    apiRateLimit: 100,

    enableLogging: true,

    enableSwagger: true,

    maintenanceMode: false

  };

  saveSettings() {

    console.log(this.settings);

    // Backend later

  }

}
