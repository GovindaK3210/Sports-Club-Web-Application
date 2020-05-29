import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
      
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/not-authorized']);
        return false;
      }

      if(state.url=="/players-list") {
        if(this.authService.getUserRole()!="admin") {
          this.router.navigate(['/not-authorized']);
          return false;
        }
      }

      if(state.url=="/edit-player/:id") {
        if(this.authService.getUserRole()!="admin") {
          this.router.navigate(['/not-authorized']);
          return false;
        }
      }

      if(state.url=="/player-dashboard") {
        if(this.authService.getUserRole()!="player") {
          this.router.navigate(['/not-authorized']);
          return false;
        }
      }

      if(state.url=="/sessions-info") {
        if(this.authService.getUserRole()!="player") {
          this.router.navigate(['/not-authorized']);
          return false;
        }
      }

      
      if(state.url=="/coach-dashboard") {
        if(this.authService.getUserRole()!="coach") {
          this.router.navigate(['/not-authorized']);
          return false;
        }
      }

      if(state.url=="/admin-dashboard") {
        if(this.authService.getUserRole()!="admin") {
          this.router.navigate(['/not-authorized']);
          return false;
        }
      }
      

        return true;
    }
  
}
