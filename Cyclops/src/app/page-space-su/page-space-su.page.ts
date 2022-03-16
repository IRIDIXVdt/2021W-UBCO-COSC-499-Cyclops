import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { EcoPopoverComponent } from './eco-popover/eco-popover.component';
import { ScoreModalComponent } from './score-modal/score-modal.component';
import { NavController } from '@ionic/angular';
import { PageSpaceMePage } from '../page-space-me/page-space-me.page';
import { Router } from '@angular/router';
import { FirebaseService } from '../FirebaseService/firebase.service';
import { Observable, from, of } from 'rxjs'
import { filter } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';
import { convertToViews } from '@ionic/core/dist/types/components/nav/view-controller';
import { solutionItem, sectionList, ecoData } from '../sharedData/ecoData';

@Component({
  selector: 'app-page-space-su',
  templateUrl: './page-space-su.page.html',
  styleUrls: ['./page-space-su.page.scss'],
})
export class PageSpaceSuPage implements OnInit {

  profile = {
    solution: "Solution", // retrives solution from score modal
    section: "Section", // retrives section from score modal
    range: 0, // retrives value from score modal
    level: 0, // retrives level from score modal
    updatedscore: 0, // retrives level*range
    rating: 0
  }

  surveyPage: PageSpaceMePage;

  solutions;
  // selectOptions;
  localSol: fetchSolution[];
  displaySol: fetchSolution[];
  sortType: string;//this handles the type of sorting
  section: string;//this handles which section we want
  sections: string[];

  constructor(
    public ecopopover: PopoverController,
    private modalCtrol: ModalController,
    public navCtrl: NavController,
    public firebaseService: FirebaseService,
    private router: Router,
  ) {
    this.contentLoading();
    // this.dummyContentLoading();
    this.sections = sectionList;
    this.sortTypeOnChange();
  }
  rangeChange() {
    console.log("range change");
  }
  buttonClick() {
    console.log("onSubmit");
  }
  async notifications(ev: any) {
    const popover = await this.ecopopover.create({
      component: EcoPopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  goSurvey() {
    this.router.navigateByUrl('tabs/page-space-me');
  }

  contentLoading() {
    //stop sub while read
    this.firebaseService.getAllEcoSolutionService().subscribe((res) => {
      this.solutions = res.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          detail: e.payload.doc.data()['detail'],
          section: e.payload.doc.data()['section'],
          star: e.payload.doc.data()['star']
        }
      })

      // console.log("content loaded", this.solutions.map((a: any) => a.starLevel));
      this.localSol = this.solutions;
      console.log("solution", this.solutions);
      this.sortTypeInitialize();
    }, (err: any) => {
      console.log(err);
    })

  }
  dummyContentLoading() {
    // this.localSol = ecoData;
    this.sortTypeInitialize();
  }

  ngOnInit() {

  }

  sortTypeInitialize() {
    this.sortType = "starUp";
    this.section = "All";
    this.displaySol = this.localSol;
  }
  openModal() {
    this.modalCtrol.create({
      component: ScoreModalComponent,
      componentProps: this.profile
    }).then(modalres => {
      modalres.present();

      modalres.onDidDismiss().then(res => {
        if (res.data != null) {
          this.profile = res.data;
        }
      })
    }) 
  }
  sortTypeOnChange() {
    // const currentTime = new Date().getTime();
    // console.log("sort type:", this.sortType, currentTime);
    //handle the event here
    //use the new sortType to update displaySol
    if (this.sortType === "starUp") {
      console.log("sort Asc")
      this.displaySol.sort((a, b) => (a.star > b.star) ? 1 : -1);
    } else if (this.sortType === "starDown") {
      console.log("sort Des")
      this.displaySol.sort((a, b) => (a.star < b.star) ? 1 : -1);
    } else if (this.sortType === "sN") {
      console.log("solution name")
      this.displaySol.sort((a, b) => (a.name > b.name) ? 1 : -1);
    } else if (this.sortType === "sT") {
      console.log("section name")
      this.displaySol.sort((a, b) => (a.section > b.section) ? 1 : -1);
    }
  }

  sectionTypeOnChange() {
    this.displaySol = this.localSol;
    if (this.section === "All") {
      console.log("Display All");
    } else {
      console.log(this.section);
      this.displaySol = this.displaySol.filter(f => (f.section === this.section));
    }

  }
}
type fetchSolution = {
  id: string;
  name: string;
  star: number;
  detail: string;
  section: string;
}

