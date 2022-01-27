import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class ScreensizeService {
 
  private isDesktop = new BehaviorSubject<boolean>(false);
 
  constructor() { }
 
  onResize(size) {    
    console.log('size: ', size)
    if (size < 1024) {
      this.isDesktop.next(false);
    } else {
      this.isDesktop.next(true);
    }
  }
 
  isDesktopView(): Observable<boolean> {
    return this.isDesktop.asObservable().pipe(distinctUntilChanged());
  }
}