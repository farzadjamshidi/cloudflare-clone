import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './core/interceptors/http-request-interceptor.interceptor';
import { ProfileV1Hockerized } from './core/repository/hockerized/v1/profile.repo';
import { UsersV1Hockerized } from './core/repository/hockerized/v1/users.repo';
import { AuthTokensV1LocalStorage } from './core/repository/local-storage/v1/auth-tokens.repo';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: 'IProfileRepo', useClass: ProfileV1Hockerized },
    { provide: 'IUsersRepo', useClass: UsersV1Hockerized },
    { provide: 'IAuthTokensRepo', useClass: AuthTokensV1LocalStorage }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
