import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(private basicAuthService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const basicAuthHeader = this.basicAuthService.getAuthToken();
    const user = this.basicAuthService.getAuthUser();
    if (basicAuthHeader && user) {
      req = req.clone({
        setHeaders: {
          Authorization: basicAuthHeader
        }
      });
    }
    return next.handle(req);
  }


}
