import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerCreateComponent } from './components/player-create/player-create.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerEditComponent } from './components/player-edit/player-edit.component';
import { UserLoginComponent } from './components/user-login/user-login.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', component: UserLoginComponent },
  { path: 'create-player', component: PlayerCreateComponent },
  { path: 'edit-player/:id', component: PlayerEditComponent },
  { path: 'players-list', component: PlayerListComponent },
  { path: 'user-login', component: UserLoginComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
