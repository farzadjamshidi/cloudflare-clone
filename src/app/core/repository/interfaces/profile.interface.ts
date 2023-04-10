import { Observable } from "rxjs";

export interface IProfileRepo
{
  Get(): Observable<any>;
}
