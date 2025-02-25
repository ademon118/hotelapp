import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request Interceptor', req);
  
  if(req.method === 'POST')
  {
    const newRequest = req.clone({ headers: new HttpHeaders({ token: '14245346gbgf' }) });
    return next(newRequest);
  }
  return next(req);
};
