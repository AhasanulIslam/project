import { Room } from './../_models/room';
import { Transaction } from './../_models/transaction';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { User } from '../_models';
import { parse } from 'url';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    register(username: string, password: string, email: string, phone: string, access: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/register/Stu`, { username, password, email, phone, access });
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    // tslint:disable-next-line:variable-name
    transac(debit: string, credit: string, date: string, account_tite: string) {
        return this.http.post<any>(`${environment.apiUrl}/StuffTransaction/id`, { debit, credit, date, account_tite});

    }
    roomAcc(numbers: string, capacity: string, building: string) {
        return this.http.post<any>(`${environment.apiUrl}/RoomST/id`, { numbers, capacity, building});

    }
    getAllTransactions() {
        return this.http.get<Transaction[]>(`${environment.apiUrl}/StuffTransaction/transactions`);
    }
    getAllRooms() {
        return this.http.get<Room[]>(`${environment.apiUrl}/RoomST/rooms`);
    }
}
