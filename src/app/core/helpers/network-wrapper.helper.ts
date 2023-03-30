import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkWrapperHelper
{
  token: string | string[] = '';

  constructor(
    private _httpClient: HttpClient
  )
  {
  }

  headers = new HttpHeaders()
    .set('content-type', 'application/json');

  headersWithAuth = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', this.token);

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
