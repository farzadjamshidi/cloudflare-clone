import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkWrapperHelper
{

  constructor(
    private _httpClient: HttpClient
  )
  {
  }

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

  headersWithAuth = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', '');

  post<T>(data: postMethod)
  {

    return this._httpClient.post<T>(
      data.url,
      data.data,
      { headers: data.withoutAuth ? this.headers : this.headersWithAuth }
    );
  }

  get<T>(data: getMethod)
  {

    return this._httpClient.get<T>(
      data.url,
      {
        params: data.params as any,
        headers: data.withoutAuth ? this.headers : this.headersWithAuth
      }
    );

  }

  delete<T>(data: getMethod)
  {

    return this._httpClient.delete<T>(
      data.url,
      {
        params: data.params as any,
        headers: data.withoutAuth ? this.headers : this.headersWithAuth
      }
    );

  }

  put<T>(data: postMethod)
  {

    return this._httpClient.put<T>(
      data.url,
      data.data,
      { headers: data.withoutAuth ? this.headers : this.headersWithAuth }
    );
  }

  setAuthorizationToken(token: string)
  {
    this.headersWithAuth = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);
  }
}

export interface postMethod
{
  url: string,
  data: any;
  withoutAuth?: boolean;
}

export interface getMethod
{
  url: string,
  params?: any;
  withoutAuth?: boolean;
}
