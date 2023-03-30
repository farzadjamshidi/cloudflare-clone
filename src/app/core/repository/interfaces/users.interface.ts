import { Observable } from "rxjs";
import { PostLoginRequest, PostLoginResponse } from "../../models/login.model";
import { PostRefreshTokenRequest, PostRefreshTokenResponse } from "../../models/refresh-token.model";

export interface IUsersRepo
{
  verifyUserIdentifier(request: any): any;
  sendVerifyNotification(request: any): any;
  login(request: PostLoginRequest): Observable<PostLoginResponse>;
  refreshToken(request: PostRefreshTokenRequest): Observable<PostRefreshTokenResponse>;
  forgetPassword(request: any): any;
  signup(request: any): any;
}
