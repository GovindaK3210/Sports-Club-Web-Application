import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  Player:any = [];

  constructor(private apiService: ApiService) { 
    this.readPlayer();
  }

  ngOnInit() {}

  readPlayer(){
    this.apiService.getPlayers().subscribe((data) => {
     this.Player = data;
    })    
  }

  removePlayer(player, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deletePlayer(player._id).subscribe((data) => {
          this.Player.splice(index, 1);
        }
      )    
    }
  }
}
