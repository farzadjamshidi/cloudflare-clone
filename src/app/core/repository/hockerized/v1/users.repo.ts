import { Injectable } from "@angular/core";
import { NetworkWrapperHelper } from "../../../helpers/network-wrapper.helper";
import { PostLoginRequest, PostLoginResponse } from "../../../models/login.model";
import { PostRefreshTokenRequest, PostRefreshTokenResponse } from "../../../models/refresh-token.model";
import { IUsersRepo } from "../../interfaces/users.interface";


@Injectable()
export class UsersV1Hockerized implements IUsersRepo
{

  apiUrl = "https://api.hockerized.com/v1/users/";

  constructor(
    protected networkWrapperHelper: NetworkWrapperHelper
  )
  {
  }
  verifyUserIdentifier(request: any)
  {
    throw new Error("Method not implemented.");
  }
  sendVerifyNotification(request: any)
  {
    throw new Error("Method not implemented.");
  }
  login(request: PostLoginRequest)
  {
    const url = this.apiUrl + 'login';
    return this.networkWrapperHelper.post<PostLoginResponse>({ url: url, data: request, withoutAuth: true });
  }
  refreshToken(request: PostRefreshTokenRequest)
  {
    const url = this.apiUrl + 'login';
    return this.networkWrapperHelper.post<PostRefreshTokenResponse>({ url: url, data: request, withoutAuth: true });
  }
  forgetPassword(request: any)
  {
    throw new Error("Method not implemented.");
  }
  signup(request: any)
  {
    throw new Error("Method not implemented.");
  }
}

