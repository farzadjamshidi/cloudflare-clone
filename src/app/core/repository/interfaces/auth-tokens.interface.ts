import { Observable } from 'rxjs';
import { AuthTokens } from "../../models/auth-tokens.model";

export interface IAuthTokensRepo
{
  get(): Observable<AuthTokens>;
  set(model: AuthTokens): Observable<void>;
  delete(): Observable<void>;
}
