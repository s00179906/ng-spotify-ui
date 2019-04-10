import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire'
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistComponent } from './components/artist/artist.component'
import { NavbarComponent } from './components/navbar/navbar.component';


import { ROUTES } from './app.routes';


import { DomSanitizers } from './pipes/domsanitizers.pipe';


import { SongsComponent } from './components/songs/songs.component'
import { SpotifyAuthModule } from 'spotify-auth';
import { UserComponent } from './components/user/user.component';
import { FormComponent } from './components/form/form.component';
import { TracksComponent } from './components/tracks/tracks.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ArtistComponent,
    NavbarComponent,
    DomSanitizers,
    SongsComponent,
    UserComponent,
    FormComponent,
    TracksComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    SpotifyAuthModule.forRoot(),
    RouterModule.forRoot(ROUTES, { useHash: true }),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
