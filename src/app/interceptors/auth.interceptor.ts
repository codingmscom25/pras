import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('pras_access_token');

  if (!token) {

    return next(req);

  }

  const cloned = req.clone({

    setHeaders: {

      Authorization: `Bearer ${token}`

    }

  });

  return next(cloned);

};