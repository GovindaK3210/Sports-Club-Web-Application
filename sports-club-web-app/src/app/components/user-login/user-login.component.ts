import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from './../../service/auth.service';
import { format } from 'util';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  form:FormGroup;
  public submitted: boolean;

  constructor(private fb:FormBuilder, 
    private authService: AuthService, 
    private router: Router) {

          this.form = this.fb.group({
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
          password: ['',Validators.required]
          });
          this.submitted=false;
          this.authService.logout();
      }


      onSubmit() {
        this.submitted=true;
        const val = this.form.value;
        if (val.email && val.password) {
            this.authService.login(val.email, val.password)
                .subscribe(
                    (res) => {
                        console.log("User is logged in");
                        if (this.authService.getUserRole() === 'player')
                          this.router.navigateByUrl('/player-dashboard');
                        else if (this.authService.getUserRole() === 'coach')
                          this.router.navigateByUrl("/coach-dashboard")
                          else if (this.authService.getUserRole() === 'admin')
                          this.router.navigateByUrl("/admin-dashboard")
                    },
                    (error) => {
                      console.log(error);
                      this.form.setErrors({ 'invalid': true });

                    }
                );
        }
    }

  ngOnInit(): void {
  }

}
