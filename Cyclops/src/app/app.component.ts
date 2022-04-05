
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authentication/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {
    console.log('this.router.url', this.router.url);
  }

  list = [
    {
      "link": "/tabs/Home",
      "icon": "compass",
      "name": "Home"
    }, {
      "link": "/tabs/Articles",
      "icon": "reader",
      "name": "Articles"
    }, {
      "link": "/tabs/EcoTracker",
      "icon": "leaf",
      "name": "Eco Tracker"
    }
  ]
  menuClick() {
    console.log('Split Pane Button on click, this.router.url', this.router.url);
  }

}

