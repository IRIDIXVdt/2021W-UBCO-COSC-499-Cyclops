import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SolutionformComponent } from './solutionform.component';

describe('SolutionformComponent', () => {
  let component: SolutionformComponent;
  let fixture: ComponentFixture<SolutionformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionformComponent ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SolutionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
