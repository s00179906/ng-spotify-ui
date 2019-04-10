import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  userData: any;
  constructor(private spotifySvc: SpotifyService) {
    const token = localStorage.getItem('spotify-token');
    if(token != ""){
      this.spotifySvc.GetUser().subscribe((data: any) => {
        this.userData = data;
      })
    }
  }

  LoginWithSpotify(){
    this.spotifySvc.Login();
  }
}