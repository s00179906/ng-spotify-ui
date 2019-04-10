import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {

  artist: any = {};
  topTracks: any[] = [];
  artistID: any[];
  id: any[];

  constructor(private router: ActivatedRoute,
    private spotify: SpotifyService) {

    this.router.params.subscribe(params => {
      this.GetArtist(params['id']);
      this.GetTopTracks(params['id']);
      console.log(params['id']);
    });
  }

  GetArtist(id: string) {
    this.spotify.GetArtist(id)
      .subscribe(artists => {
        this.artist = artists;
      });
  }

  GetTopTracks(id: string) {
    this.spotify.GetTopTracks(id)
      .subscribe(topTracks => {
        this.topTracks = topTracks;
        // this.topTracks.artists.forEach(element => {
        //   this.id = element.uri;
        // });
        console.log(this.topTracks);
      });
  }
}