import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  userData: any;
  userTrack: any[];
  userId: string;
  loginUserData: any;
  otherUsersTracks:any;
  otherUsersPlaylists:any;
  
  
  constructor(private spotifySvc: SpotifyService) {
    this.spotifySvc.GetUser().subscribe((data: any) => {
      this.userData = data;
    })

    this.spotifySvc.GetUsersTracks().subscribe((data: any) => {
      this.userTrack = data.items;
    })
  }

  LoginWithSpotify(){
    this.spotifySvc.Login();
  }

  //gets a users id, so i can use it to put into "get playlist"
  GetUserByTheirID(userID:string) {
    this.spotifySvc.GetUserByTheirID(userID).subscribe((data: any) =>
      this.loginUserData = data);
    this.GetUsersPlaylistsByTheirID();
  }

  GetUsersPlaylistsByTheirID(){
    var userID = this.loginUserData.id;
    this.spotifySvc.GetUsersPlaylistsByTheirID(userID).subscribe((data: any) =>{
      console.log(data);
      this.otherUsersPlaylists = data.items;
    });
  }
}