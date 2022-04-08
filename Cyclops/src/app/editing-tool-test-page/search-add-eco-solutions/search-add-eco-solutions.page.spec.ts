import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchAddEcoSolutionsPage } from './search-add-eco-solutions.page';

describe('SearchAddEcoSolutionsPage', () => {
  let component: SearchAddEcoSolutionsPage;
  let fixture: ComponentFixture<SearchAddEcoSolutionsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAddEcoSolutionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchAddEcoSolutionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
