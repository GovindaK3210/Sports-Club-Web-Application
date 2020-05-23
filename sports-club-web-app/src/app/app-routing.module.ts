import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerCreateComponent } from './components/player-create/player-create.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerEditComponent } from './components/player-edit/player-edit.component';
import { UserLoginComponent } from './components/user-login/user-login.component'

import { AuthGuard } from './auth/auth.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SessionsInfoComponent } from './components/sessions-info/sessions-info.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', component: UserLoginComponent},
  { path: 'edit-player/:id', component: PlayerEditComponent, canActivate: [AuthGuard]},
  { path: 'players-list', component: PlayerListComponent, canActivate: [AuthGuard]},
  { path: 'player-dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'create-player', component: PlayerCreateComponent },
  { path: 'user-login', component: UserLoginComponent},
  { path: 'not-authorized', component: NotAuthorizedComponent},
  { path: 'sessions-info', component: SessionsInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})

export class AppRoutingModule { }
