import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/* ===========================================
   TYPES
=========================================== */

type Language = 'curl' | 'spring' | 'angular' | 'javascript';

interface EndpointDoc {

  title: string;

  method: string;

  path: string;

  description: string;

  activeTab: Language;

  request: string;

  response: string;

  samples: {

    curl: string;

    spring: string;

    angular: string;

    javascript: string;

  };

}

@Component({
  selector: 'app-developer-guide',
  imports: [CommonModule],
  templateUrl: './developer-guide.html',
  styleUrl: './developer-guide.css',
})
export class DeveloperGuide {
  

  // TODO: Replace with API call using clientId route parameter

  client = {

    id: 1,

    name: 'ZECO Help Desk',

    status: 'Active',

    apiKey: 'pras_live_2FH8KSLM9PQ3XRTY',

    baseUrl: 'https://api.pras.co.tz/api',

    documentationVersion: 'v1',

    createdAt: '10 Jul 2026'

  };

  copyApiKey() {

    navigator.clipboard.writeText(this.client.apiKey);

    // SweetAlert later

  }
  endpointDocs: EndpointDoc[] = [

  {
    title: 'Request Password Recovery',
    method: 'POST',
    path: '/password-recovery/request',
    description: 'Generate an OTP and send a recovery email.',
    activeTab: 'curl',

    request: `{
  "email":"user@example.com"
}`,

    response: `{
  "success":true,
  "message":"OTP sent successfully."
}`,

    samples: {

      curl: `curl -X POST https://api.pras.co.tz/api/password-recovery/request
-H "Authorization: Bearer ${this.client.apiKey}"
-H "Content-Type: application/json"
-d '{
  "email":"user@example.com"
}'`,

      spring: `HttpHeaders headers = new HttpHeaders();
headers.setBearerAuth("${this.client.apiKey}");

Map<String,String> body = new HashMap<>();
body.put("email","user@example.com");

HttpEntity<Map<String,String>> request =
new HttpEntity<>(body, headers);

restTemplate.postForEntity(
BASE_URL + "/password-recovery/request",
request,
String.class
);`,

      angular: `this.http.post(
environment.api + "/password-recovery/request",
{
 email:"user@example.com"
},
{
 headers:new HttpHeaders({
   Authorization:"Bearer ${this.client.apiKey}"
 })
}).subscribe();`,

      javascript: `fetch(BASE_URL + "/password-recovery/request",{
 method:"POST",
 headers:{
   Authorization:"Bearer ${this.client.apiKey}",
   "Content-Type":"application/json"
 },
 body:JSON.stringify({
   email:"user@example.com"
 })
});`

    }

  },

  {
    title: 'Verify OTP',
    method: 'POST',
    path: '/password-recovery/verify-otp',
    description: 'Verify OTP before password reset.',
    activeTab: 'curl',

    request: `{
  "email":"user@example.com",
  "otp":"458963"
}`,

    response: `{
  "success":true,
  "verified":true
}`,

    samples: {

      curl: 'Coming in next step...',
      spring: 'Coming in next step...',
      angular: 'Coming in next step...',
      javascript: 'Coming in next step...'

    }

  },

  {
    title: 'Reset Password',
    method: 'PUT',
    path: '/password-recovery/reset',
    description: 'Reset user password.',
    activeTab: 'curl',

    request: `{
  "email":"user@example.com",
  "otp":"458963",
  "password":"NewPassword123"
}`,

    response: `{
  "success":true,
  "message":"Password updated."
}`,

    samples: {

      curl: 'Coming in next step...',
      spring: 'Coming in next step...',
      angular: 'Coming in next step...',
      javascript: 'Coming in next step...'

    }

  }

];

setLanguage(endpoint: EndpointDoc, language: Language) {

  endpoint.activeTab = language;

}

currentSample(endpoint: EndpointDoc): string {

  return endpoint.samples[endpoint.activeTab];

}

copyCode(code: string) {

  navigator.clipboard.writeText(code);

  // SweetAlert2 later

}

  
}

