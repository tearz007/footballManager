import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { HasuraService } from '../services/hasura.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  user: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private hasuraService: HasuraService,
    private authService: AuthServiceService
  ) {
    this.userForm = formBuilder.group({
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
    });
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  async getUserInfo() {
    var userId = await this.authService.currentUser();
    this.hasuraService.getUser().valueChanges.subscribe((snap) => {
      var data = snap.data.football_user;
      data.forEach((a: any) => {
        console.log(a);
        if (a.email === userId) {
          this.user.push(a);
        }
      });
      this.userForm.patchValue({
        email: this.user[0]?.email,
        name: this.user[0]?.name,
        surname: this.user[0]?.surname,
        soccerTeam: this.user[0]?.soccerTeam,
      });
    });
  }

  updateUser() {
    this.hasuraService.updateUser(this.userForm).subscribe((snap) => {});
    console.log(this.userForm.value);
  }
}
