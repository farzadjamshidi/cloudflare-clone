import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { AuthTokens } from "../../../models/auth-tokens.model";
import { IAuthTokensRepo } from "../../interfaces/auth-tokens.interface";

@Injectable()
export class AuthTokensV1LocalStorage implements IAuthTokensRepo
{
  localStorageKey = 'authTokens';

  get(): Observable<AuthTokens>
  {
    return of(JSON.parse(localStorage.getItem(this.localStorageKey) || ''));
  }
  set(model: AuthTokens): Observable<void>
  {
    return of(localStorage.setItem(this.localStorageKey, JSON.stringify(model)));
  }
  delete(): Observable<void>
  {
    return of(localStorage.removeItem(this.localStorageKey));
  }
}
