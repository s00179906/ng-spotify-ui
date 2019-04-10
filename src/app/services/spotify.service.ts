import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { map } from "rxjs/operators";
import { User } from './user';
import { AuthService, ScopesBuilder, AuthConfig, TokenService } from 'spotify-auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})

export class SpotifyService {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(private http: HttpClient, private afs: AngularFirestore,private authService: AuthService,private router:Router, private tokenSvc:TokenService) {
    let tokenSliceStart = window.location.hash.slice(14);
    let tokenSliceEnd = tokenSliceStart.slice(0, -41);
    let access_token = tokenSliceEnd;

    localStorage.setItem('spotify-token', access_token);
  }

  public Login(): void {
    const scopes = new ScopesBuilder().build();
    const ac: AuthConfig = {
      client_id: "e8794524c32b40ffbffdd5db2b98d77b",  
      response_type: "token",
      redirect_uri: "http://localhost:4200", 
      //redirect_uri: "https://notify-91d95.firebaseapp.com",
      state: "",
      show_dialog: true, 
      scope: scopes
    };
    this.authService.configure(ac).authorize();
  }

  AddUserToFirebaseDatabase(userFirstName:string, userLastName:string, userEmail:string, feedback:string){
    this.usersCollection = this.afs.collection("users");
    this.afs.collection('users').add({ 
      'userFirstName': userFirstName,
      'userLastName': userLastName,
      'userEmail': userEmail,
      'userFeedback': feedback
    });
  }

  GetQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const access_token = localStorage.getItem('spotify-token');
    const headers = new HttpHeaders({
      Authorization:
        `Bearer ${access_token}`
    });
    return this.http.get(url, { headers });
  }

  GetUser() {
    return this.GetQuery("me");
  }

  GetUsersTracks() {
    return this.GetQuery("me/tracks?limit=50");
  }

  GetUserByTheirID(userID: string) {
    return this.GetQuery(`users/${userID}`);
  }

  GetUserTracksByTheirID(playlistID: string) {
    return this.GetQuery(`playlists/${playlistID}/tracks`);
  }

  GetUsersPlaylistsByTheirID(userID: string) {
    return this.GetQuery(`users/${userID}/playlists`);
  }

  SearchForSongs(searchTerm: string){
    return this.GetQuery(`search?q=${searchTerm}&type=track`);
  }

  GetNewReleases() {
    return this.GetQuery("browse/new-releases?limit=20").pipe(
      map(data => data["albums"].items)
    );
  }

  GetArtists(searchTerm: string) {
    return this.GetQuery(`search?q=${searchTerm}&type=artist&limit=50`).pipe(
      map(data => data["artists"].items)
    );
  }

  GetArtist(id: string) {
    return this.GetQuery(`artists/${id}`);
    // .pipe( map( data => data['artists'].items));
  }

  GetTopTracks(id: string) {
    return this.GetQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map(data => data["tracks"])
    );
  }

}