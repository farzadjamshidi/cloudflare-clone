import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostLoginRequest } from '../../core/models/login.model';
import { IUsersRepo } from '../../core/repository/interfaces/users.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent
{

  form: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    @Inject('IUsersRepo') private usersRepo: IUsersRepo,
    private router: Router
  )
  { }

  submit(): void
  {
    const request: PostLoginRequest = this.form.value;

    this.usersRepo.login(request).subscribe({
      next: (response) =>
      {

        //save to local storage

        this.router.navigate(['home']);
      }
    });
  }

}
