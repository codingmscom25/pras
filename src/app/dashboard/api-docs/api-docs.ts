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
      url: '/api/recovery/request',
      title: 'Request Password Recovery',
      description: 'Generate OTP and send a password recovery email.',
      activeTab: 'curl',

      code: {

        curl: `curl --request POST http://localhost:8080/api/recovery/request \
--header "Authorization: ApiKey YOUR_API_KEY" \
--header "Content-Type: application/json" \
--data '{
  "identifier":"user@example.com"
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
"http://localhost:8080/api/recovery/request",
entity,
String.class
);`,

        angular: `this.http.post(
environment.api + "/recovery/request",
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
"http://localhost:8080/api/recovery/request",
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
      url: '/api/recovery/verify-otp',
      title: 'Verify OTP',
      description: "Verify OTP sent to the user's email.",
      activeTab: 'curl',

      code: {

        curl: `curl --request POST http://localhost:8080/api/recovery/verify-otp \
--header "Authorization: Bearer YOUR_API_KEY" \
--header "Content-Type: application/json" \
--data '{
  "identifier":"user@example.com",
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
environment.api + "/recovery/verify-otp",
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
      url: '/api/recovery/reset',
      title: 'Reset Password',
      description: 'Verify OTP sent to the user\'s email.',
      activeTab: 'curl',

      code: {

        curl: `curl --request PUT http://localhost:8080/api/recovery/reset \
--header "Authorization: Bearer YOUR_API_KEY" \
--header "Content-Type: application/json" \
--data '{
  "identifier":"user@example.com",
  "newPassword":"NewPassword123"
}'`,

        spring: `Map<String,String> body = new HashMap<>();

body.put("email","user@example.com");
body.put("password","NewPassword123");

restTemplate.exchange(
RESET_URL,
HttpMethod.PUT,
new HttpEntity<>(body, headers),
String.class
);`,

        angular: `this.http.put(
environment.api + "/recovery/reset",
{
  "identifier":"user@example.com",
  "newPassword":"NewPassword123"
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
  "message": "OTP sent successfully.",
  "timestamp": "2026-07-11T12:30:10"
}`;

  errorExample = `{
  "status": 401,
  "error": "Unauthorized",
  "message": "Invalid API Key.",
  "timestamp": "2026-07-11T12:30:10"
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