import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-space-la',
  templateUrl: './page-space-la.page.html',
  styleUrls: ['./page-space-la.page.scss'],
})
export class PageSpaceLaPage implements OnInit {
  
  constructor() { 
  }

  ngOnInit() {


    const searchResult = document.querySelector('#requested') as HTMLElement;
    searchResult.style.display = 'none';

    const textSpace = document.querySelector('#origin') as HTMLElement;
    const searchbar = document.querySelector('ion-searchbar');
    const items = Array.from(document.querySelector('ion-list').children as HTMLCollectionOf<HTMLElement>);

    $(function(){
      $("#includedContent").load("b.html"); 
    });

    searchbar.addEventListener('ionInput', handleInput);
    function handleInput(event) {
      const query = event.target.value.toLowerCase();
      requestAnimationFrame(() => {
        items.forEach(item => {
          const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
          item.style.display = shouldShow ? 'block' : 'none';
        });
      });
    }

    searchbar.addEventListener('ionFocus', handleFocus);
    function handleFocus(){
      console.log('message Focus emit');
      requestAnimationFrame(() => {
        textSpace.style.display = 'none';
        searchResult.style.display = 'block';
      }); 
      
    }

    
    searchbar.addEventListener('ionBlur',handleBlur);
    function handleBlur() {
      console.log('message Blur emit');
      requestAnimationFrame(() => {
        textSpace.style.display = 'block';
        searchResult.style.display = 'none';
      }); 
    }
  }
}


