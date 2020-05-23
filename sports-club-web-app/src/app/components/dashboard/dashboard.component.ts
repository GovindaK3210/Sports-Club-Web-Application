import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from './../../service/api.service';
import { ToastrService } from 'ngx-toastr';



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
  GamesRanking: String[] = ['Beginner', 'Medium', 'Advanced'];

  timeForm:FormGroup;
  timeFormSubmitted:Boolean;

  oppForm:FormGroup;

  constructor(private fb:FormBuilder, 
    private apiService: ApiService,
    private authService: AuthService, 
    private toastr: ToastrService
    ) {
      

      this.timeForm = this.fb.group({
        startTime: ['', [Validators.required, Validators.pattern("^([01][0-9]|2[0-3]):([0-5][0-9])$")]],
        endTime: ['',[Validators.required, Validators.pattern("^([01][0-9]|2[0-3]):([0-5][0-9])$")]]
      });

      this.oppForm = this.fb.group({
        opponent_player_ranking: ['', Validators.required],
        
      });

    this.user_id = this.authService.getUserID()
    this.user_role = this.authService.getUserRole()
    this.user_name = this.authService.getUserName()
    this.user_email = this.authService.getUserEmail()

    this.timeFormSubmitted = false;


  }

  updateRanking(e) {
    this.oppForm.controls.opponent_player_ranking.setValue(e, {
      onlySelf: true
    })
  }

  getTimeForm() {
    return this.timeForm.controls;
  }

  onTimeFormSubmit()
  {
    this.timeFormSubmitted = true;
    if(this.timeForm.valid)
    {
      const val = this.timeForm.value;
      console.log(val.startTime);
      console.log(val.endTime);

      this.apiService.updatePlayer(this.authService.getUserID(), this.timeForm.value).subscribe(
        (res) => {
          this.toastr.success("Timings updated", "Success")

          
        }, (error) => {
          this.toastr.error("Check DB connection", "Failure")
          return false;
        });

    }
  }

  onOppFormSubmit()
  {
    if(this.oppForm.valid)
    {
      const val = this.oppForm.value;
     

      this.apiService.updatePlayer(this.authService.getUserID(), this.oppForm.value).subscribe(
        (res) => {
          this.toastr.success("Opponent ranking updated", "Success")

          
        }, (error) => {
          this.toastr.error("Check DB connection", "Failure")
          return false;
        });

    }
  }

  

  ngOnInit(): void {
    this.updateRanking("Beginner");
  }

}
