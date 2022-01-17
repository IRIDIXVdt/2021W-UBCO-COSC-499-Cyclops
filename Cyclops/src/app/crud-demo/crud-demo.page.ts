import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../service.service';
@Component({
  selector: 'app-crud-demo',
  templateUrl: './crud-demo.page.html',
  styleUrls: ['./crud-demo.page.scss'],
})
export class CRUDDemoPage implements OnInit {
  name: any;
  users: any;
  constructor(
    public service: ServiceService
  ) {this.getName()}

  addName(){
    console.log(this.name);
    let data = {
      name: this.name
    }

    this.service.addName(data).subscribe((res:any) =>{
      console.log("SUCCESS ===",res);
      this.name='';
      alert("SUCCESS");
      this.getName();
    },(error:any) => {
      console.log("ERROR ===",error);
    })
  } 

  getName(){
    this.service.getName().subscribe((res:any) =>{
      console.log("getName SUCCESS ===",res);
      this.users=res;
    },(error:any) => {
      console.log("getName ERROR ===",error);
    })
  }

  ngOnInit() {
  }

}
