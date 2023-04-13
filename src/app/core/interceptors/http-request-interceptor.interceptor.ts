import
{
  HTTP_INTERCEPTORS, HttpErrorResponse,
  HttpEvent, HttpHandler,
  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { NetworkWrapperHelper } from '../helpers/network-wrapper.helper';
import { AuthTokens } from '../models/auth-tokens.model';
import { PostRefreshTokenRequest } from '../models/refresh-token.model';
import { IAuthTokensRepo } from '../repository/interfaces/auth-tokens.interface';
import { IUsersRepo } from '../repository/interfaces/users.interface';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor
{

  private isRefreshing = false;

  constructor(
    private networkWrapperHelper: NetworkWrapperHelper,
    private router: Router,
    @Inject('IAuthTokensRepo') private authTokensRepo: IAuthTokensRepo,
    @Inject('IUsersRepo') private usersRepo: IUsersRepo
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>
  {
    return next.handle(request).pipe(
      catchError((error) =>
      {
        if (
          error instanceof HttpErrorResponse &&
          !request.url.includes('users/login') &&
          error.status === 401
        )
        {
          return this.handle401Error(request, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler)
  {
    if (!this.isRefreshing)
    {
      this.isRefreshing = true;

      // if (this.storageService.isLoggedIn())
      // const authTokens = await firstValueFrom(this.authTokensRepo.get())
      const authTokens: AuthTokens = JSON.parse(localStorage.getItem('authTokens') || "");
      // if (this.authTokensRepo.get())
      if (authTokens.access_token)
      {
        const refreshTokenRequest: PostRefreshTokenRequest = {
          refresh_token: authTokens.refresh_token
        };

        return this.usersRepo.refreshToken(refreshTokenRequest).pipe(
          switchMap((response) =>
          {
            this.isRefreshing = false;

            // await firstValueFrom(this.authTokensRepo.set(response));
            localStorage.setItem('authTokens', JSON.stringify(response));
            const token = response.token_type + " " + response.access_token;
            this.networkWrapperHelper.setAuthorizationToken(token);

            const newRequest = request.clone({
              headers: request.headers.set('Authorization', token)
            });

            return next.handle(newRequest);
          }),
          catchError((error) =>
          {
            this.isRefreshing = false;

            if (error.status === 403)
            {
              this.router.navigate(['logout']);
            }

            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }

}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
