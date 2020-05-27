import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service'
import { ApiService } from '../../service/api.service'
import { FormArray, FormGroup, FormBuilder, Validators, FormControl, Form } from "@angular/forms";

@Component({
  selector: 'app-coach-dashboard',
  templateUrl: './coach-dashboard.component.html',
  styleUrls: ['./coach-dashboard.component.css']
})
export class CoachDashboardComponent implements OnInit {
  Sessions: any;
  session_form: FormGroup;

  constructor(
    public apiService: ApiService,
    public authService: AuthService,
    public fb: FormBuilder) { 
      this.createForm();
    }

  ngOnInit(): void {
    this.readSessionsAndProcessIDs();
  }

  createForm(){
    this.session_form = this.fb.group({
      player1_score: ['', [Validators.required]],
      player2_score: ['', [Validators.required]],
      time_played: ['', [Validators.required]],
    })
  }

  readSessionsAndProcessIDs(){
    this.apiService.getSessionByCoachID(this.authService.getUserID()).subscribe((data) => {
      this.Sessions = data
      for (let i = 0; i< this.Sessions.length; ++i){
        this.apiService.getPlayer(this.Sessions[i]["player1_id"]).subscribe(obj => {this.Sessions[i]["player1_name"] = obj["name"]});
        this.apiService.getPlayer(this.Sessions[i]["player2_id"]).subscribe(obj => {this.Sessions[i]["player2_name"] = obj["name"]});
        this.apiService.getPlayer(this.Sessions[i]["coach_id"]).subscribe(obj => {this.Sessions[i]["coach_name"] = obj["name"]});
      }
    })
  }
}
