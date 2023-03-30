export class PostRefreshTokenRequest
{
  refresh_token!: string;
}


export class PostRefreshTokenResponse
{
  token_type!: string;
  expires_in!: number;
  access_token!: string;
  refresh_token!: string;
}
