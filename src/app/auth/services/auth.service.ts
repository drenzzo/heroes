import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroments } from 'enviroments/enviroments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

    private baseUrl = enviroments.baseUrl;
    private user?: User;

    constructor(private http: HttpClient) { }

    get currentUser(): User|undefined {
        if( !this.user ) return undefined;
        return structuredClone(this.user); //deep clone de JS
    }

    login( email: string, password: string): Observable<User> {

        return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap(user => this.user = user),
                tap(user => localStorage.setItem('token', '1awedqwe231.2qweqwdq234q2.eqwe324456uygyjg'))
            );
    }

    checkAuthentication(): Observable<boolean> | boolean {

        if(!localStorage.getItem('token')) return of(false)

            const token = localStorage.getItem('token');

            return this.http.get<User>(`${this.baseUrl}/users/1`)
                .pipe(
                    tap( user => this.user = user ),
                    map( user => !!user ),
                    catchError( err => of(false) )
                );

    }

    logout() {
        this.user = undefined;
        localStorage.clear();
    }

}