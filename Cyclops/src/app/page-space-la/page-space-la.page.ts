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
    const searchbar = document.querySelector('ion-searchbar');
    const items = Array.from(document.querySelector('ion-list').children as HTMLCollectionOf<HTMLElement>);

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
  }
  
}
// const searchbar = document.querySelector('ion-searchbar');
// const items = Array.from(document.querySelector('ion-list').children);

// searchbar.addEventListener('ionInput', handleInput);

// function handleInput(event) {
//   const query = event.target.value.toLowerCase();
//   requestAnimationFrame(() => {
//     items.forEach(item => {
//       const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
//       item.style.display = shouldShow ? 'block' : 'none';
//     });
//   });
// }