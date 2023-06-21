import { HttpClient } from '@angular/common/http';
import {Injectable} from'@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/Environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService{

  constructor(private http: HttpClient){}
  public getUserId(username: string): Observable<any>{

    return this.http.get(environment.api + 'User/' + username)
  }
  public checkPassword(id:number, password:string): Observable<any>{
    return this.http.get(environment.api + 'User/'+ 'check-password/' + id + '/' + password)
  }
}
