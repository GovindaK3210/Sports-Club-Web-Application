import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone, HostBinding  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.css']
})
export class PlayerCreateComponent implements OnInit {
  submitted = false;
  playerForm: FormGroup;
  // PlayerProfile: any = ['Player', 'Admin', 'Coach']
  GamesName: String[] = ['Tennis', 'Badminton', 'Table tennis', 'Squash'];
  GamesRanking: String[] = ['Beginner', 'Medium', 'Advance'];
  numberOfGames: number = 1;
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.playerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      role: ['player'],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', [Validators.required]],
      game1: ['', [Validators.required]],
      ranking1: ['', [Validators.required]],
      games_info: this.fb.group({
        name: ['']
      })
    })
  }

  // Choose role with select dropdown
  updateGame(e){
    this.playerForm.get('game' + this.numberOfGames).setValue(e, {
      onlySelf: true
    })
  }

  updateRanking(e){
    this.playerForm.get('ranking' + this.numberOfGames).setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.playerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.playerForm.valid) {
      console.log('Player creation unsuccessful!')
      return false;
    } else {
      this.apiService.createPlayer(this.playerForm.value).subscribe(
        (res) => {
          console.log('Player successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/players-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

  incrementNumberOfGames() {
    if (this.numberOfGames != this.GamesName.length){
      this.numberOfGames += 1;
      this.playerForm.addControl('game' + this.numberOfGames, new FormControl);
      this.playerForm.addControl('ranking' + this.numberOfGames, new FormControl);
    }
  }

  returnArrayOfLengthN(n: number): any[] {
    return Array(n);
  }
}
