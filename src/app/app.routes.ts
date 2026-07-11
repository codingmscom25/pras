import { Routes } from '@angular/router';
import { Home } from './public/home/home';
import { Login } from './auth/login/login';
import { Layout } from './dashboard/layout/layout';
import { Dashboard } from './dashboard/dashboard/dashboard';
import { Requests } from './dashboard/requests/requests';
import { Logs } from './dashboard/logs/logs';
import { Notifications } from './dashboard/notifications/notifications';
import { FogortPassword } from './auth/fogort-password/fogort-password';
import { VerifyOtp } from './auth/verify-otp/verify-otp';
import { NewPassword } from './auth/new-password/new-password';
import { Clients } from './dashboard/clients/clients';
import { ApiDocs } from './dashboard/api-docs/api-docs';
import { Settings } from './dashboard/settings/settings';

export const routes: Routes = [

  // ================= PUBLIC =================
  {
    path: '',
    component: Home,
    title: 'Password Recovery API Service(PRAS)'
  },

  // ================= LOGIN =================
  {
    path: 'login',
    component: Login,
    title: 'Login'
  },

  // ================= FORGOT PASSWORD =================
  {
    path: 'forgot-password',
    component: FogortPassword,
    title: 'Forgot Password'
  },

  // ================= VERIFY OTP =================
  {
    path: 'verify-otp',
    component: VerifyOtp,
    title: 'Verify-otp'
  },

  // ================= CREATE NEW PASWORD =================
  {
    path: 'reset-password',
    component: NewPassword,
    title: 'Reset Password'
  },

  // ================= DASHBOARD =================
  {
    path: 'admin',
    component: Layout,

    children: [

      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },

      {
        path: 'overview',
        component: Dashboard,
        title: 'Dashboard'
      },

      {
        path: 'requests',
        component: Requests,
        title: 'Recovery Requests'
      },

      {
        path: 'api-logs',
        component: Logs,
        title: 'Api-Logs'
      },

      {
        path: 'notifications',
        component: Notifications,
        title: 'Notifications'
      },

      {
        path: 'api-docs',
        component: ApiDocs,
        title: 'api-docs'
      },

      {
        path: 'settings',
        component: Settings,
        title: 'Settings'
      },
      
      {
        path: 'clients',
        component: Clients,
        title: 'Clients'
      }

    ]
  },

  // ================= 404 =================
  {
    path: '**',
    redirectTo: ''
  }

  

];