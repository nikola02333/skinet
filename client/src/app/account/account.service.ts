import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { IUser } from '../shared/models/user';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient, private router: Router) { }

  login(values: any){
    return this.http.post(this.baseUrl + 'account/login', values).pipe(

      map( (user: IUser) => {
        if (user)
        {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(value: any){
    return this.http.post(this.baseUrl + 'account/register', value).pipe(
      map( (user: IUser) => {
        if(user)
        {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);

        }
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
   }
   
   loadCurrentUser(token: string){
     if(token == null)
     {
       this.currentUserSource.next(null);
       return of(null);
     }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', {headers}).pipe(
      // we are gona map user object that we are gonna recive in  CurrentUser$
      map( (user: IUser) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);

      })
    );
   }
   checkEmailExists(email: string){
    return this.http.get( this.baseUrl + 'account/emailexists?email=' + email);
   }

}
