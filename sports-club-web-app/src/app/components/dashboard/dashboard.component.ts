import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from './../../service/api.service';
import { ToastrService } from 'ngx-toastr';
import { range } from 'rxjs';



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

  timeForm: FormGroup;
  timeFormSubmitted: Boolean;
  scheduleFormSubmitted: Boolean;

  priorityFormSubmitted: Boolean;

  oppForm: FormGroup;
  currAttID: String;

  scheduleForm: FormGroup;

  notTimeSet: boolean;
  notPrioritySet: boolean;
  notAttendanceMarked: boolean;

  attendanceMarked: boolean;
  scheduleGenerated: boolean;
  attendanceDate: String;
  attendanceTime: String;
  already: Boolean;

  games_info: any[];
  present_players: any[];
  GamesName: any[][] = [];
  priorityForm: FormGroup;

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {


    this.timeForm = this.fb.group({
      startTime: ['', [Validators.required, Validators.pattern("^([01][0-9]|2[0-3]):([0-5][0-9])$")]],
      endTime: ['', [Validators.required, Validators.pattern("^([01][0-9]|2[0-3]):([0-5][0-9])$")]]
    });

    this.oppForm = this.fb.group({
      opponent_player_ranking: ['', Validators.required],

    });

    this.scheduleForm = this.fb.group({
      chooser: ['system', Validators.required],
      opp_player: ['']

    });

    this.priorityForm = this.fb.group({

      priorities_info: this.fb.array([

      ])

    })

    this.user_id = this.authService.getUserID()
    this.user_role = this.authService.getUserRole()
    this.user_name = this.authService.getUserName()
    this.user_email = this.authService.getUserEmail()

    this.timeFormSubmitted = false;
    this.priorityFormSubmitted = false;
    this.scheduleGenerated = false;

    var today = new Date();
    var today_date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    this.present_players = []

    this.apiService.getAllAttendanceByDate(today_date).subscribe(
      (res) => {

        for(var i=0;i<res.length;i++)
        {

          this.present_players.push( {player_name: res[i].player_name, player_id: res[i].player_id} )
        }



      }, (error) => {
        return false;
      });
    

    this.apiService.getPlayer(this.authService.getUserID()).subscribe(
      (res) => {
        this.games_info = res.games_info;

        var strArray: any[] = [];
        for (var i = 0; i < (this.games_info.length); i++) {

          strArray.push(this.games_info[i].game)
          this.getFormArray().push(this.fb.group({
            game: ['', Validators.required],
          }))
        }

        for (var i = 0; i < (this.games_info.length); i++) {
          this.GamesName.push(strArray);
        }



      }, (error) => {
        return false;
      });


  }

  getFormArray() {
    return this.priorityForm.controls.priorities_info as FormArray;
  }

  onPriorityFormSubmit() {

    console.log(this.getFormArray)
    this.priorityFormSubmitted = true;

    if (this.priorityForm.valid) {
      const val = this.priorityForm.value;
      var gm: String[] = []
      for (var i = 0; i < val.priorities_info.length; i++) {
        gm.push(val.priorities_info[i].game)
      }

      var data = {
        games_priority: gm
      }


      this.apiService.updatePlayer(this.authService.getUserID(), data).subscribe(
        (res) => {
          this.toastr.success("Priorities updated", "Success")
          this.notPrioritySet=false;


        }, (error) => {
          this.toastr.error("Check DB connection", "Failure")
          return false;
        });

    }

  }

  updatePriority(e, index) {



    var x = index + 1
    for (; x < this.GamesName.length; x++) {
      this.GamesName[x] = this.GamesName[0];


      for (var i = 0; i < x; i++) {


        var newG: any[] = this.GamesName[x].filter(item => item !== this.getFormArray().controls[i].get("game").value)
        this.GamesName[x] = newG;




      }


    }



    this.getFormArray().controls[index].get("game").setValue(e, {
      onlySelf: true
    })
  }

  updateRanking(e) {
    this.oppForm.controls.opponent_player_ranking.setValue(e, {
      onlySelf: true
    })
  }

  getTimeForm() {
    return this.timeForm.controls;
  }

  onTimeFormSubmit() {
    this.timeFormSubmitted = true;
    if (this.timeForm.valid) {
      const val = this.timeForm.value;
      console.log(val.startTime);
      console.log(val.endTime);

      this.apiService.updatePlayer(this.authService.getUserID(), this.timeForm.value).subscribe(
        (res) => {
          this.toastr.success("Timings updated", "Success")
          this.notTimeSet = false;


        }, (error) => {
          this.toastr.error("Check DB connection", "Failure")
          return false;
        });

    }
  }

  onOppFormSubmit() {
    if (this.oppForm.valid) {
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

  generateSchedule() {
    this.scheduleFormSubmitted = true;
    
    if(this.scheduleForm.valid)
    {

      this.apiService.getPlayer(this.authService.getUserID()).subscribe(
        (res) => {
          console.log(res)
          var passed:Boolean = true;
          if(res.startTime==null || res.endTime==null){
            this.notTimeSet=true;
            passed = false;
          } 
  
          if(res.games_priority.length==0)
          {
            this.notPrioritySet=true;
            passed=false
          }
  
          var today = new Date();
          var today_date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  
          this.apiService.getAttendanceByIDandDate(this.authService.getUserID(), today_date).subscribe(
            (res) => {
    
              if(res.length!=0) {
    
                  this.notAttendanceMarked=false;
                  this.currAttID = res[0]._id;
                  console.log(this.currAttID)
              
            }
            else{
              this.notAttendanceMarked=true;
              passed=false
            }
           
    
            }, (error) => {
              this.toastr.error("Check DB connection", "Failure")
              passed=false
              
              return false;
            });
  
          if(passed) 
          {
            this.scheduleGenerated = true;
            if(this.scheduleForm.controls.opp_player.value!='')
            {


            }
            
  
  
  
  
          }
  
  
        }, (error) => {
          this.toastr.error("Check DB connection", "Failure")
          return false;
        });
    }

 

  }

  updateOppPlayer(e) {
    this.scheduleForm.controls.opp_player.setValue(e, {
      onlySelf: true
    })

  }

  markAttendance() {

    
      var today = new Date();
      var today_date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
      var today_time = today.getHours() + ":" + today.getMinutes();


      this.apiService.getAttendanceByIDandDate(this.authService.getUserID(), today_date).subscribe(
        (res) => {

          if(res.length!=0) {

         
          this.toastr.success("Your attendance was already marked for today!", "Success")
          this.already = true;
          this.notAttendanceMarked=false;
          this.attendanceDate = res[0].date;
          this.attendanceTime = res[0].time;
        }
        else {
          var data_obj = {
            player_id: this.authService.getUserID(),
            player_name: this.authService.getUserName(),
            date: today_date,
            time: today_time
          };
    
          this.apiService.createAttendance(data_obj).subscribe(
            (res) => {
    
              this.toastr.success("Attendance marked", "Success")
              this.attendanceDate = res.date;
              this.attendanceTime = res.time;
              this.attendanceMarked = true;
              this.notAttendanceMarked=false;
    
    
    
            }, (error) => {
              this.toastr.error("Check DB connection", "Failure")
              return false;
            });

          }

        }, (error) => {
          this.toastr.error("Check DB connection", "Failure")
          
          return false;
        });


     
    


  }



  ngOnInit(): void {
    this.updateRanking("Beginner");
  }

}
