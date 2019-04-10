import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
  @Input() songs:any[] =[];
  constructor(private spotifySvc:SpotifyService) { }


  
  ngOnInit() {
  }

}
