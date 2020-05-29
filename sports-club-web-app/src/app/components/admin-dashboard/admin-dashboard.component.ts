import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ApiService } from 'src/app/service/api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {forkJoin} from 'rxjs';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  user_name: String;
  user_email: String;
  pending_approvals: any[] = [];
  all_approvals: any[] = [];
  date_today: String;
  coaches: any;


  constructor(private authService: AuthService, private apiService: ApiService) 
  { 
    this.user_name = this.authService.getUserName()
    this.user_email = this.authService.getUserEmail()

    var today = new Date();
    var today_date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    this.date_today = today_date;

    this.apiService.getAllAttendanceByDate(today_date).subscribe(
      (res) => {
        for(var i=0;i<res.length;i++)
        {
          if(res[i].allowSchedule==false)
          {
            this.pending_approvals.push( {attendance_id: res[i]._id, player_name: res[i].player_name, player_id:res[i].player_id, desired_opponent_name: res[i].desired_opponent_name, desired_opponent_id: res[i].desired_opponent_id} )
          }
          
        }
       


      }, (error) => {
        return false;
      });
      
      this.apiService.getAttendances().subscribe(
        (res) => {
          for(var i=0;i<res.length;i++)
          {
            if(res[i].allowSchedule==true)
            {
              this.all_approvals.push( {attendance_id: res[i]._id, player_name: res[i].player_name, player_id:res[i].player_id, desired_opponent_name: res[i].desired_opponent_name, desired_opponent_id: res[i].desired_opponent_id} )
            }
            
          }
         
  
  
        }, (error) => {
          return false;
        });



        this.apiService.getCoaches().subscribe(
        (res) => {
          this.coaches = res;
       
  
        }
        );



  }

  incTime(st: String, i)
  {
    if(i==0) return st;
    var substrings = st.split(":")
    var hour = substrings[0]
    var minute = substrings[1]

    var hh = parseInt(hour)
    var mm = parseInt(minute)

    for(var x = 0; x<i;x++)
    {
        mm = mm + 30
        if(mm==60)
        {
          mm=0
          hh = hh + 1
          if(hh==24)
          {
            hh=0
          }
        }
      }

      var to_return = hh.toString(10) + ":" + mm.toString(10);


    if(hh<10)
    {
      to_return= "0" + hh.toString(10) + ":" + mm.toString(10)
    }

    if(mm<10)
    {
      to_return= hh.toString(10) + ":" + "0" + mm.toString(10)
    }

    if(hh<10 && mm<10)
    {
      to_return= "0" + hh.toString(10) + ":" + "0" + mm.toString(10)
    }
  
    return to_return

  }

 
  createSession(data)
  {
    this.apiService.createSession(data).subscribe(
      (res) => {

        
        return res;
        
       
      }, (error) => {
        return false;
      });
  }


  getMultiple(): Observable<Array<any>> {

    var list: any[] = [];
    for(let approval of this.pending_approvals)
    {
        list.push({player_id: approval.player_id, desired_opponent_id: approval.desired_opponent_id})
    }

    //let singleUrls = ['singleUrl1', 'singleUrl2', 'singleUrl3']; // can be replaced with any 'Single' identifier

    let singleObservables = list.map((singleUrl: any, urlIndex: number) => {
        return this.apiService.getPlayer(singleUrl.player_id).pipe(map((res: Response)=>{ return {player: res, desired_opponent_id: singleUrl.desired_opponent_id} || {} }))
        
            //.map(single => single)
            //.catch((error: any) => {
                //console.error('Error loading Single, singleUrl: ' + singleUrl, 'Error: ', error);
                //return Observable.of(null); // In case error occurs, we need to return Observable, so the stream can continue
            //});
    });

    return forkJoin(singleObservables);
};


  getTodaySessions(): Observable<any>
  {
                            
    var today = new Date();
    var today_date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    return this.apiService.getSessionByDate(today_date).pipe(
      map((res: Response) => {
        return res || {}
      })
    )

  }


  generateSchedule()
  {

    this.getMultiple().subscribe(
      (list: Array<any>) => {

        this.getTodaySessions().subscribe(
          (res) => {

            for(let obj_m of list)
            {
                for(let game1 of obj_m.player.games_priority)
                {
                  for(let obj_s of list)
                  {
                    if(obj_s.player._id!=obj_m.player._id)
                    {
                      for(let game2 of obj_s.player.games_priority)
                      {
                        if((game1.game==game2.game && game1.time==game2.time) && !(game1.scheduled || game2.scheduled))
                        {

                 
                                
                                var dont_use_coach_list = [];
                                for(var i=0;i<this.coaches.length;i++)
                                {
                                  for(var x=0;x<res.length;x++)
                                  {
                                      if(this.coaches[i]._id==res[x].coach_id && res[x].start_time==game1.time)
                                      {
                                        dont_use_coach_list.push(this.coaches[i]._id)
                                      }
                                  }
                                  
                
                                }


                                if(dont_use_coach_list.length!=this.coaches.length)
                                {

                                  var desired_coach_id = "none";

                                var coach = this.coaches[Math.floor(Math.random() * this.coaches.length)];
                                desired_coach_id = coach._id;
                                while(dont_use_coach_list.some((c) => c == desired_coach_id))
                                {
                                  coach = this.coaches[Math.floor(Math.random() * this.coaches.length)];
                                  desired_coach_id = coach._id;

                                  console.log("reached 2")
                                }

                                console.log("reached 3")


                                if(desired_coach_id!="none")
                                {
                                  console.log("reached 4")
                                  var data = {
                                    game: game1.game,
                                    player1_id: obj_m.player._id,
                                    player2_id: obj_s.player._id,
                                    game_court: "test_court",
                                    coach_id: desired_coach_id, 
                                    start_time: game1.time,
                                    end_time: this.incTime(game1.time, 1)

                                  }
                                  
                                  game1.scheduled = true;
                                  game2.scheduled = true;
                                  this.createSession(data);
                                  
                             
                                  
                                  

                               
                                  
                                }


                                }
                                



                            


                        }

                      }
                    }
                  }
                }
            }

    
        return true;

          });     
      });
      return true;

     

  }

  approveSchedules()
  {
    if(this.generateSchedule())
    {
          for(let approval of this.pending_approvals)
          {
                  var data = {
                    allowSchedule: true
                  }

                  this.apiService.updateAttendance(approval.attendance_id, data).subscribe(
                    (res) => {
                      this.all_approvals.push(approval);


              
                    }, (error) => {
                      return false;
                    });

                this.pending_approvals =[];
          }
    
    }
  }

  ngOnInit(): void {
  }

}
