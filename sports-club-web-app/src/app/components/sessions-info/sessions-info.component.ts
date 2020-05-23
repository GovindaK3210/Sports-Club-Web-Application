import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service'
import {AuthService} from '../../service/auth.service'

@Component({
  selector: 'app-sessions-info',
  templateUrl: './sessions-info.component.html',
  styleUrls: ['./sessions-info.component.css']
})
export class SessionsInfoComponent implements OnInit {

  Sessions: any;

  constructor(
    private apiService: ApiService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.readSessions();
  }

  readSessions(){
    this.apiService.getSessionByPlayerID(this.authService.getUserID()).subscribe((data) => {
      this.Sessions = data
    })
  }
}
