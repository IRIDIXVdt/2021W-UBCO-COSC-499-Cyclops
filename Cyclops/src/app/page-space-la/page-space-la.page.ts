import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { displayArticle } from '../sharedData/displayArticle';
import { displayArticles } from '../sharedData/displayArticles';


@Component({
  selector: 'app-page-space-la',
  templateUrl: './page-space-la.page.html',
  styleUrls: ['./page-space-la.page.scss'],
})
export class PageSpaceLaPage implements OnInit {
  
  contents: displayArticle[] = displayArticles;
  // contentOri: displayArticle[] = displayArticles;
  contentCol1: displayArticle[] = [];
  contentCol2: displayArticle[] = [];
  contentCol3: displayArticle[] = [];
  i:number = 0;
  // JSONObject 
  constructor() { 
  }
  
  

  ngAfterViewChecked(){}
  ngOnInit() {
    for(this.i = 0; this.i<this.contents.length;this.i++){
      const currentArticle = this.contents[this.i];
      if(currentArticle.columnName==1){
        this.contentCol1.push(currentArticle);
      }else if(currentArticle.columnName==2){
        this.contentCol2.push(currentArticle);
      }else{        
        this.contentCol3.push(currentArticle);
      }
   
    }
    console.log(this.contentCol1);
    console.log(this.contentCol2);
    console.log(this.contentCol3);
    console.log(this.contents);
    
    const thisNotShow = document.querySelector('#requested') as HTMLElement;
    thisNotShow.style.display = 'none';

    const textSpace = document.querySelector('#origin') as HTMLElement;
    const searchbar = document.querySelector('ion-searchbar');
    
    let items = null;
    // console.log("orignal items length: ",items.length);
    searchbar.addEventListener('ionInput', handleInput);
    function handleInput(event) {
      // items = Array.from(document.querySelector('ion-list').children as HTMLCollectionOf<HTMLElement>);
      // items = Array.from(document.querySelector('ion-list').children as HTMLCollectionOf<HTMLElement>);
      items = this.searchresults;
      const query = event.target.value.toLowerCase();
      console.log(this.searchresults);
      requestAnimationFrame(() => {
        items.forEach(item => {
          const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
          item.style.display = shouldShow ? 'block' : 'none';
        });
      });
    }

    searchbar.addEventListener('ionFocus', handleFocus);
    function handleFocus(){
      const searchResult = document.querySelector('#requested') as HTMLElement;
      console.log('message Focus emit');
      items = Array.from(document.querySelector('ion-list').children as HTMLCollectionOf<HTMLElement>);
      
      requestAnimationFrame(() => {
        textSpace.style.display = 'none';
        searchResult.style.display = 'block';
        
        }); 
      
    }

    
    searchbar.addEventListener('ionBlur',handleBlur);
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


