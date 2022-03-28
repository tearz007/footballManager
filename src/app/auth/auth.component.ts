import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ConfirmCodeComponent } from '../confirm-code/confirm-code.component';
import { Router } from '@angular/router';
import { HasuraService } from '../services/hasura.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: [
    './auth.component.scss',
    '../auth/styles/auth.component.scss',
    '../auth/styles/auth.responsive.scss',
  ],
})
export class AuthComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  tap = 'login';

  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    private authService: AuthServiceService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private hasuraService: HasuraService
  ) {
    this.loginForm = formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      ),
    });

    this.registerForm = formBuilder.group({
      name: new FormControl(
        '',
        Validators.compose([Validators.minLength(3), Validators.required])
      ),
      surname: new FormControl(
        '',
        Validators.compose([Validators.minLength(3), Validators.required])
      ),
      soccerTeam: new FormControl(
        '',
        Validators.compose([Validators.minLength(3), Validators.required])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ),
    });
  }

  ngOnInit(): void {}

  login() {
    console.log(this.loginForm.value);
    this.authService
      .signIn(this.loginForm.value)
      .then((user) => {
        console.log('welcome', user);
        this.router.navigateByUrl('/home', {
          skipLocationChange: true,
          replaceUrl: true,
        });
      })
      .catch((err) => {
        console.log(err.message);

        switch (err.code) {
          case 'UserNotConfirmedException':
            this.openConfirmPopup();
            break;
          default:
            console.log(err.code);
            break;
        }
      });
  }

  signup() {
    console.log(this.registerForm.value);
    this.authService
      .signup(this.registerForm.value)
      .then((user) => {
        console.log('signed up successfully', user);
        this.openConfirmPopup();
        this.addUser(this.registerForm.value);
      })
      .catch((err: any) => {
        console.log(err.message);
      });
  }

  addUser(user:any) {
    this.hasuraService.registerUser(user).subscribe((snap) => {
      console.log(snap);
    }),
      (err: any) => {
        console.log(err);
      };
  }

  openConfirmPopup(): void {
    const dialogRef = this.dialog.open(ConfirmCodeComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('code', result);
      this.confirmCode(result.data.email, result.data.code);
    });
  }

  confirmCode(email: any, code: any) {
    this.authService
      .confirmCode(email, code)
      .then((user: any) => {
        console.log('confirmed successfully', user);
        this.tap = 'login';
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  toggle() {
    if (this.tap === 'register') this.tap = 'login';
    else {
      this.tap = 'register';
    }
  }
}
