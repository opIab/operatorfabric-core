import { Injectable } from "@angular/core";
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { User } from '@ofModel/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable()
export class UserService {

    readonly userUrl : string;

    /**
     * @constructor
     * @param httpClient - Angular build-in
     */
    constructor(private httpClient : HttpClient) {
        this.userUrl = `${environment.urls.users}`;
    }

    askUserApplicationRegistered(user : string) : Observable<User> {
        console.log("user in askUserApplicationRegistered service : " + user);
        return this.httpClient.get<User>(`${this.userUrl}/users/${user}`);
    }

    askCreateUser(token : string, userData : User) : Observable<User> {
        console.log("user in askCreateUser service : " + userData.login);

        if (!!token) {
            // const postData = new FormData();
            const postData = new URLSearchParams();
            postData.append('token', token);


            console.log("userData : " + userData);


            const headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});

            // return this.httpClient.put<User>(`${this.userUrl}/users/${user}`, userData, {headers: headers});
            return this.httpClient.put<User>(`${this.userUrl}/users/${userData.login}`, userData);
        }
        return of(null);
    }
}