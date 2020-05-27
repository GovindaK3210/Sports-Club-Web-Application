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
    public apiService: ApiService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.readSessionsAndProcessIDs();
  }

  readSessionsAndProcessIDs(){
    this.apiService.getSessionByPlayerID(this.authService.getUserID()).subscribe((data) => {
      this.Sessions = data
      for (let i = 0; i< this.Sessions.length; ++i){
        this.apiService.getPlayer(this.Sessions[i]["player1_id"]).subscribe(obj => {this.Sessions[i]["player1_name"] = obj["name"]});
        this.apiService.getPlayer(this.Sessions[i]["player2_id"]).subscribe(obj => {this.Sessions[i]["player2_name"] = obj["name"]});
        this.apiService.getPlayer(this.Sessions[i]["coach_id"]).subscribe(obj => {this.Sessions[i]["coach_name"] = obj["name"]});
      }
    })
  }
}
