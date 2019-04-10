import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})

export class SongsComponent {

  @Input() items: any[] = [];
  @Input() songs:any[] =[];
  constructor( private router: Router ) { }


  GetArtistsByID( item: any ) {
    let artistID;
    if (item.type === 'artist') {
      artistID = item.id;
    } else {
      artistID = item.artists[0].id;
    }
    this.router.navigate([ '/artist', artistID  ]);
  }
}