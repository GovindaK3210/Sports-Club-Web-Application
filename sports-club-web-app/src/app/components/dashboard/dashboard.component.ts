import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user_id: String
  user_role: String
  user_name: String
  user_email: String

  constructor(private authService: AuthService) 
  {
    this.user_id = this.authService.getUserID()
    this.user_role = this.authService.getUserRole()
    this.user_name = this.authService.getUserName()
    this.user_email = this.authService.getUserEmail()


  }

  

  ngOnInit(): void {
  }

}
