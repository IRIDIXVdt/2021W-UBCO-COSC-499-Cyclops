import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  focused: boolean;
  focused2: boolean;
  focused3: boolean;

  email:any;
  userName:any;
  password:any;

  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  onBlur2(event2: any) {
    const value = event2.target.value;

    if (!value) {
      this.focused2 = false;
    }
  }

  onBlur3(event2: any) {
    const value = event2.target.value;

    if (!value) {
      this.focused3 = false;
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
