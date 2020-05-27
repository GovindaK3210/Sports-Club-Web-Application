import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../service/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title: string;

  constructor(public authService: AuthService,private router: Router) { }

  logoutPlayer()
  {
    this.authService.logout();
    
    this.router.navigateByUrl('/user-login');
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  isLoggedOut(){
    return this.authService.isLoggedOut();
  }
  


  ngOnInit(): void {
  }

}
