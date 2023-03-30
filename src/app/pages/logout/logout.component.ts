import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { IAuthTokensRepo } from '../../core/repository/interfaces/auth-tokens.interface';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit
{
  constructor(
    @Inject('IAuthTokensRepo') private authTokensRepo: IAuthTokensRepo,
    private router: Router
  )
  { }

  async ngOnInit(): Promise<void>
  {
    await firstValueFrom(this.authTokensRepo.delete());
    this.router.navigate(['login']);
  }
}
