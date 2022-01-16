import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../service.service';
@Component({
  selector: 'app-crud-demo',
  templateUrl: './crud-demo.page.html',
  styleUrls: ['./crud-demo.page.scss'],
})
export class CRUDDemoPage implements OnInit {
  name: any;
  constructor(
    public service: ServiceService
  ) {}

  addStudent(){
    console.log(this.name);
    let data = {
      name: this.name
    }

    this.service.addStudent(data).subscribe((res:any) =>{
      console.log("SUCCESS ===",res);
    },(error:any) => {
      console.log("ERROR ===",error);
    })
  } 


  ngOnInit() {
  }

}
