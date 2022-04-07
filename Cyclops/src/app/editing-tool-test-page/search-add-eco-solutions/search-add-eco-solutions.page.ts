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
      /* this.articleCol = [[], [], []];
       for (this.i = 0; this.i < this.searchField.length; this.i++) {
         //load data into each column
         const currentArticle = this.searchField[this.i];
         if (currentArticle.columnName == '1') {
           this.articleCol[0].push(currentArticle);
         } else if (currentArticle.columnName == '2') {
           this.articleCol[1].push(currentArticle);
         } else if (currentArticle.columnName == '3') {
           this.articleCol[2].push(currentArticle);
         }
       }
       this.i = 0;
       console.log("independent data loaded!", this.articleCol);*/

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
    this.checkedSolutions=[]
    for (let i = 0; i < this.searchField.length; i++) {
      let currentSol = this.searchField[i];
      if (currentSol.checked == true) {
        this.checkedSolutions.push(currentSol);
      }
    }
    this.modalController.dismiss(this.checkedSolutions);
  }

}
