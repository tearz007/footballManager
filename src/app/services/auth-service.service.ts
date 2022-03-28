import { Injectable } from '@angular/core';
import Amplify, { Auth } from 'aws-amplify';
import { map } from 'rxjs/operators';
import awsmobile from 'src/aws-exports';
import { HasuraService } from './hasura.service';

Amplify.configure(awsmobile);

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private hasuraService: HasuraService) {}

  signIn(user: any) {
    return Auth.signIn(user.email, user.password);
  }

  signup(user: any) {
    return Auth.signUp({
      username: user.email,
      password: user.password,
    });
  }

  confirmCode(email: any, code: string) {
    return Auth.confirmSignUp(email, code);
  }

  async currentUser(): Promise<any> {
    try {
      var res = await Auth.currentUserPoolUser();

      return res.attributes.email;
    } catch (e: any) {
      console.log(e.message);
    }
  }

}
