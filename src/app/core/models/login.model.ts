export class PostLoginRequest
{
  username!: string;
  password!: string;
}


export class PostLoginResponse
{
  token_type!: string;
  expires_in!: number;
  access_token!: string;
  refresh_token!: string;
}
