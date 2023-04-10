import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { NetworkWrapperHelper } from '../../core/helpers/network-wrapper.helper';
import { PostLoginRequest } from '../../core/models/login.model';
import { IAuthTokensRepo } from '../../core/repository/interfaces/auth-tokens.interface';
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
    private networkWrapperHelper: NetworkWrapperHelper,
    @Inject('IUsersRepo') private usersRepo: IUsersRepo,
    @Inject('IAuthTokensRepo') private authTokensRepo: IAuthTokensRepo,
    private router: Router
  )
  { }

  submit(): void
  {
    const request: PostLoginRequest = this.form.value;

    this.usersRepo.login(request).subscribe({
      next: async (response) =>
      {
        await firstValueFrom(this.authTokensRepo.set(response));
        this.networkWrapperHelper.setAuthorizationToken(response.token_type + " " + response.access_token);
        this.router.navigate(['home']);
      }
    });
  }

}
