
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authentication/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
    console.log('this.router.url', this.router.url);
  }

  list = [
    {
      "link": "/tabs/page-space-er",
      "icon": "compass",
      "name": "Home"
    }, {
      "link": "/tabs/page-space-la",
      "icon": "reader",
      "name": "Articles"
    }, {
      "link": "/tabs/page-space-su",
      "icon": "leaf",
      "name": "Eco Tracker"
    }
  ]
  menuClick() {
    console.log('Split Pane Button on click, this.router.url', this.router.url);
  }

}

