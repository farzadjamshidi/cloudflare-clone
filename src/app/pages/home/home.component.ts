import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProfileRepo } from '../../core/repository/interfaces/profile.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit
{
  profile$!: Observable<any>;

  constructor(
    @Inject('IProfileRepo') private profileRepo: IProfileRepo,
    private router: Router
  )
  { }

  ngOnInit(): void
  {
    this.profile$ = this.profileRepo.Get();
  }

  logout(): void
  {
    this.router.navigate(['logout']);
  }
}
