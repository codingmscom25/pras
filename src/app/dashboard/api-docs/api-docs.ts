import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type TabType = 'curl' | 'spring' | 'angular' | 'javascript';

interface Endpoint {
  method: string;
  url: string;
  title: string;
  description: string;
  activeTab: TabType;
  code: {
    curl: string;
    spring: string;
    angular: string;
    javascript: string;
  };
}

@Component({
  selector: 'app-api-docs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-docs.html',
  styleUrls: ['./api-docs.css']
})
export class ApiDocs {

  openedIndex = 0;

  endpoints: Endpoint[] = [

    {
      method: 'POST',
      url: '/api/password-recovery/request',
      title: 'Request Password Recovery',
      description: 'Generate OTP and send a password recovery email.',
      activeTab: 'curl',

      code: {

        curl: `curl --request POST https://api.pras.co.tz/api/password-recovery/request \
--header "Authorization: Bearer YOUR_API_KEY" \
--header "Content-Type: application/json" \
--data '{
  "email":"user@example.com"
}'`,

        spring: `HttpHeaders headers = new HttpHeaders();
headers.setBearerAuth("YOUR_API_KEY");

Map<String,String> body = new HashMap<>();
body.put("email","user@example.com");

HttpEntity<Map<String,String>> entity =
new HttpEntity<>(body, headers);

RestTemplate restTemplate = new RestTemplate();

ResponseEntity<String> response =
restTemplate.postForEntity(
"https://api.pras.co.tz/api/password-recovery/request",
entity,
String.class
);`,

        angular: `this.http.post(
environment.api + "/password-recovery/request",
{
  email:"user@example.com"
},
{
  headers:new HttpHeaders({
    Authorization:"Bearer YOUR_API_KEY"
  })
}).subscribe({
  next: res => console.log(res)
});`,

        javascript: `fetch(
"https://api.pras.co.tz/api/password-recovery/request",
{
  method:"POST",
  headers:{
    Authorization:"Bearer YOUR_API_KEY",
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    email:"user@example.com"
  })
})
.then(res=>res.json())
.then(console.log);`

      }

    },

    {
      method: 'POST',
      url: '/api/password-recovery/verify-otp',
      title: 'Verify OTP',
      description: "Verify OTP sent to the user's email.",
      activeTab: 'curl',

      code: {

        curl: `curl --request POST https://api.pras.co.tz/api/password-recovery/verify-otp \
--header "Authorization: Bearer YOUR_API_KEY" \
--header "Content-Type: application/json" \
--data '{
  "email":"user@example.com",
  "otp":"458963"
}'`,

        spring: `Map<String,String> body = new HashMap<>();
body.put("email","user@example.com");
body.put("otp","458963");

HttpEntity<Map<String,String>> entity =
new HttpEntity<>(body, headers);

restTemplate.postForEntity(
VERIFY_URL,
entity,
String.class
);`,

        angular: `this.http.post(
environment.api + "/password-recovery/verify-otp",
{
 email:"user@example.com",
 otp:"458963"
},
options
).subscribe();`,

        javascript: `fetch(
VERIFY_URL,
{
 method:"POST",
 headers:headers,
 body:JSON.stringify({
   email:"user@example.com",
   otp:"458963"
 })
});`

      }

    },

    {
      method: 'PUT',
      url: '/api/password-recovery/reset',
      title: 'Reset Password',
      description: 'Verify OTP sent to the user\'s email.',
      activeTab: 'curl',

      code: {

        curl: `curl --request PUT https://api.pras.co.tz/api/password-recovery/reset \
--header "Authorization: Bearer YOUR_API_KEY" \
--header "Content-Type: application/json" \
--data '{
  "email":"user@example.com",
  "otp":"458963",
  "password":"NewPassword123"
}'`,

        spring: `Map<String,String> body = new HashMap<>();

body.put("email","user@example.com");
body.put("otp","458963");
body.put("password","NewPassword123");

restTemplate.exchange(
RESET_URL,
HttpMethod.PUT,
new HttpEntity<>(body, headers),
String.class
);`,

        angular: `this.http.put(
environment.api + "/password-recovery/reset",
{
 email:"user@example.com",
 otp:"458963",
 password:"NewPassword123"
},
options
).subscribe();`,

        javascript: `fetch(
RESET_URL,
{
 method:"PUT",
 headers:headers,
 body:JSON.stringify({
   email:"user@example.com",
   otp:"458963",
   password:"NewPassword123"
 })
});`

      }

    }

  ];

  requestExample = `{
  "email":"user@example.com"
}`;

  responseExample = `{
  "success": true,
  "message":"OTP sent successfully."
}`;

  errorExample = `{
  "success": false,
  "message":"Invalid API Key."
}`;

  toggle(index: number) {

    this.openedIndex =
      this.openedIndex === index ? -1 : index;

  }

  setTab(endpoint: Endpoint, tab: TabType) {

    endpoint.activeTab = tab;

  }

  getCurrentCode(endpoint: Endpoint): string {

    return endpoint.code[endpoint.activeTab];

  }

  copy(text: string) {

    navigator.clipboard.writeText(text);

    // SweetAlert later

  }

}