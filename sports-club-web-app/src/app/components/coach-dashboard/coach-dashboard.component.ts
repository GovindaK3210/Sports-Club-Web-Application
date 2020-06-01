import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service'
import { ApiService } from '../../service/api.service'
import { FormArray, FormGroup, FormBuilder, Validators, FormControl, Form } from "@angular/forms";
import { CommonModule } from '@angular/common';  

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
      this.session_form = this.fb.group({
        scoring_form_array: this.fb.array([])
      })
    }

  ngOnInit(): void {
    this.readSessionsAndProcessIDs();
  }

  get player_scoring_form_array(){
    return this.session_form.get('scoring_form_array') as FormArray
  }

  add_element_in_form_array(){
    this.player_scoring_form_array.push(this.fb.group({
      player1_score: ['', Validators.required],
      player2_score: ['', Validators.required]
    }))
  }

  readSessionsAndProcessIDs(){
    this.apiService.getSessionByCoachID(this.authService.getUserID()).subscribe((data) => {
      this.Sessions = data
      for (let i = 0; i< this.Sessions.length; ++i){
        this.apiService.getPlayer(this.Sessions[i]["player1_id"]).subscribe(obj => {this.Sessions[i]["player1_name"] = obj["name"]});
        this.apiService.getPlayer(this.Sessions[i]["player2_id"]).subscribe(obj => {this.Sessions[i]["player2_name"] = obj["name"]});
        this.apiService.getPlayer(this.Sessions[i]["coach_id"]).subscribe(obj => {this.Sessions[i]["coach_name"] = obj["name"]});
        this.add_element_in_form_array();
      }
    })
  } 

  submitScore(index, session){
    session['ranking_player1'] = this.player_scoring_form_array.controls[index].get('player1_score').value;
    session['ranking_player2'] = this.player_scoring_form_array.controls[index].get('player2_score').value;
    this.apiService.updateSession(session._id, session).subscribe(obj=>console.log(obj));
  }
}
