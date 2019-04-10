import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  userFeedback:boolean;
  constructor(private spotifySvc: SpotifyService) {
    this.userFeedback = false;
    console.log(this.userFeedback)
   }

  UserFormData(firstName:string, lastName:string, email:string, feedback:string) {
    if (firstName != "" && lastName != "" && email != "") {
      this.spotifySvc.AddUserToFirebaseDatabase(firstName, lastName, email, feedback);
      this.userFeedback=true;
      document.getElementById('feedback-text').innerText = "Thanks for your Feedback!";
      console.log(this.userFeedback)
    }
  }
}