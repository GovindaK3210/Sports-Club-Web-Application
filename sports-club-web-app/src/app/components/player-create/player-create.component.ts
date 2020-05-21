import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone, HostBinding } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

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
    //these are all the input fields used
    this.playerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      role: ['player'],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', [Validators.required]],
      games_info: this.fb.array([
        this.fb.group({
          game: [''],
          ranking: ['']
        })
      ])
    })
  }

  //getter for formarray
  get games_info() {
    return this.playerForm.get('games_info') as FormArray;
  }

  //add upto 4 games and corresponding rankings
  add_games_info() {
    if (this.numberOfGames != this.GamesName.length) {
      this.numberOfGames += 1;
      this.games_info.push(this.fb.group({
        game: [''],
        ranking: ['']
      }))
    }
  }

  // Choose game with select dropdown
  updateGame(e, index) {
    console.log(this.games_info.controls);
    this.games_info.controls[index].get('game').setValue(e, {
      onlySelf: true
    })
  }

  //choose ranking with dropdown
  updateRanking(e, index) {
    this.games_info.controls[index].get('ranking').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.playerForm.controls;
  }

  //check validation and submit
  onSubmit() {
    this.submitted = true;
    if (!this.playerForm.valid) {
      console.log('Player creation unsuccessful!');
      // console.log(this.playerForm.value);
      return false;
    } else {
      // console.log(this.playerForm.value);
      this.apiService.createPlayer(this.playerForm.value).subscribe(
        (res) => {
          console.log('Player successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/players-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }
}
