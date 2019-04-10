import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  artists: any[] = [];
  songs: any[] = [];

  constructor(private spotifySvc: SpotifyService) { }

  SearchArtist(searchTerm: string) {
    this.spotifySvc.GetArtists(searchTerm)
      .subscribe((data: any) => {
        this.artists = data;
        console.log(this.artists);
      });
  }

  SearchForSongs(searchTerm:string){
    this.spotifySvc.SearchForSongs(searchTerm).subscribe((data:any)=>{
      this.songs = data.tracks.items;
      console.log(this.songs);
    })
  }

}
