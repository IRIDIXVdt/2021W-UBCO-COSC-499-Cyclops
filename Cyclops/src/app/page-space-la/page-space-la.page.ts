import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { displayArticle, segmentItem } from '../sharedData/displayArticle';
import { displayArticles } from '../sharedData/displayArticles';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-page-space-la',
  templateUrl: './page-space-la.page.html',
  styleUrls: ['./page-space-la.page.scss'],
})
export class PageSpaceLaPage implements OnInit {
  userInput: string;
  // userInput string is used for search bar input
  i: number = 0;
  status1: any;
  searchField: fetchArticle[];
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    console.log('current segment is', this.status1);
  }

  

  constructor(public firebaseService: FirebaseService) {
    this.status1 = "Articles p1";
    // (document.querySelector('#requested') as HTMLElement).style.display = "none";
  }

  async loadData() {
    // loadData loads all article information into the searchField Component
    this.firebaseService.getDataServiceMainPage().subscribe((res) => {
      this.searchField = res.map(e => {
        return {
          id: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          subtitle: e.payload.doc.data()['subtitle'],
          segment: e.payload.doc.data()['segment'],
          cardIntroduction: e.payload.doc.data()['cardIntroduction']
        }
      })
      console.log("Search Field Loaded");
      console.log(this.searchField);


    }, (err: any) => {
      console.log(err);
    })
  }

  ngOnInit() {
    const textSpace = document.querySelector('#origin') as HTMLElement;
    const searchbar = document.querySelector('ion-searchbar');
    this.loadData();
    let items = null;
    // disable event Listener
    function handleInput(event) {
      items = Array.from(document.querySelector('ion-grid').children as HTMLCollectionOf<HTMLElement>);
      const query = event.target.value.toLowerCase();
      requestAnimationFrame(() => {
        items.forEach(item => {
          const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
          item.style.display = shouldShow ? 'block' : 'none';
        });
      });
    }

    searchbar.addEventListener('ionFocus', handleFocus);
    //searchbar focus, hide other things
    function handleFocus() {
      const searchResult = document.querySelector('#requested') as HTMLElement;
      console.log('message Focus emit');
      items = Array.from(document.querySelector('ion-grid').children as HTMLCollectionOf<HTMLElement>);
      requestAnimationFrame(() => {
        textSpace.style.display = 'none';
        searchResult.style.display = 'block';
      });

    }

    searchbar.addEventListener('ionBlur', handleBlur);
    //searchbar blur, hide other things
    function handleBlur() {
      const searchResult = document.querySelector('#requested') as HTMLElement;
      console.log('message Blur emit');
      requestAnimationFrame(() => {
        textSpace.style.display = 'block';
        searchResult.style.display = 'none';
      });
    }
  }
}

type fetchArticle = {
  id: string;
  title: string;
  subtitle: string;
  cardIntroduction: string;
  segment:segmentItem[];
}
