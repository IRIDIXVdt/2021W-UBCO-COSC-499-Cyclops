import { FallbackRegistry } from '@angular-devkit/core/src/experimental/jobs';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/FirebaseService/firebase.service';


@Component({
  selector: 'app-search-add-eco-solutions',
  templateUrl: './search-add-eco-solutions.page.html',
  styleUrls: ['./search-add-eco-solutions.page.scss'],
})
export class SearchAddEcoSolutionsPage implements OnInit {
  searchField: any[];
  checkedSolutions: any[];
  checkedIds: any[];
  userInput: string = '';
  constructor(
    public firebaseService: FirebaseService,
    public modalController: ModalController,
  ) { }

  contentLoading() {

    this.firebaseService.getAllEcoSolutionService().subscribe((res) => {
      this.searchField = res.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          section: e.payload.doc.data()['section'],
          star: e.payload.doc.data()['star'],
          detail: e.payload.doc.data()['detail'],
          checked: false
        }
      })
      console.log("Search Field Loaded", this.searchField);
      this.checkedIds = [];
      if (this.checkedSolutions) {
        for (let i = 0; i < this.checkedSolutions.length; i++) {
          this.checkedIds.push(this.checkedSolutions[i].id);
        }
        for (let i = 0; i < this.searchField.length; i++) {
          let currentSol = this.searchField[i];
          if (this.checkedIds.indexOf(currentSol.id) != -1) {
            this.searchField[i].checked = true;
          }
        }
      }


    }, (err: any) => {
      console.log(err);
    })

  }
  async loadData(searchbarComponent: HTMLElement) {
    this.contentLoading();
    searchbarComponent.style.display = "block";
    // loadData loads all article information into the searchField Component

  }
  searchBarOnclick() {
    console.log("clicked");
  }

  ngOnInit() {
    const searchbar = document.querySelector('ion-searchbar');
    searchbar.style.display = "none";
    this.loadData(searchbar);
  }
  saveResults() {
    // console.log("we have the editC now as:", this.editC);

    this.checkedSolutions = [];

    this.checkedIds = [];//check again before submission
    for (let i = 0; i < this.checkedSolutions.length; i++) {
      this.checkedIds.push(this.checkedSolutions[i].id);
    }
    for (let i = 0; i < this.searchField.length; i++) {
      let currentSol = this.searchField[i];
      if (currentSol.checked == true && this.checkedIds.indexOf(currentSol.id) == -1) {
        this.checkedSolutions.push(currentSol);
      }
    }
    this.checkedIds = [];
    for (let i = 0; i < this.checkedSolutions.length; i++) {
      this.checkedIds.push(this.checkedSolutions[i].id);
    }

    this.modalController.dismiss(this.checkedIds);
  }


}
