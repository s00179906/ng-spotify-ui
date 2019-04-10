import { Component } from "@angular/core";
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  spotifySongs: any[] = [];
  myData: any;
  token = localStorage.getItem("spotify-token");
  notloggedIn: boolean = true;

  constructor(private spotifySvc: SpotifyService) {
    if (this.token != "") {
      this.notloggedIn = false;
      this.spotifySvc.GetNewReleases().subscribe(
        (data: any) => {
          this.spotifySongs = data;
        }
      );
    }
  }
}
