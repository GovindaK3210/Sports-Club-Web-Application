import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerCreateComponent } from './components/player-create/player-create.component';
import { PlayerEditComponent } from './components/player-edit/player-edit.component';
import { PlayerListComponent } from './components/player-list/player-list.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './service/api.service';
import { AuthService } from './service/auth.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

import { AuthInterceptor } from './interceptors/jwt_interceptor';



@NgModule({
  declarations: [
    AppComponent,
    PlayerCreateComponent,
    PlayerEditComponent,
    PlayerListComponent,
    NavbarComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, AuthService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
