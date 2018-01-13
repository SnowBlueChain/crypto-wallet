import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../entities/user';
import { Token } from '../../entities/token';
import { UserForm } from '../../forms/userform';
import { AuthenticationForm } from '../../forms/authenticationform';
import { Response } from '../../responses/response';

@Injectable()
export class UnregisteredUserProvider {

  private readonly subscribePath: string = "cryptowallet/unregistered/user/subscribe";
  private readonly authenticatePath: string = "cryptowallet/unregistered/user/authenticate";

  constructor(private http: HttpClient) {}

  public subscribe(userForm: UserForm): Observable<Response<User>> {
    return this.http.post<Response<User>>(this.subscribePath, userForm);
  }

  public authenticate(authenticationForm: AuthenticationForm): Observable<Response<Token>> {
    return this.http.post<Response<Token>>(this.authenticatePath, authenticationForm);
  }
}