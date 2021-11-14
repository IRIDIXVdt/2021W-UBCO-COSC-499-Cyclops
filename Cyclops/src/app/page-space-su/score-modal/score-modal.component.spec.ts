import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { ScoreModalComponent } from './score-modal.component';

describe('ScoreModalComponent', () => {
  let component: ScoreModalComponent;
  let fixture: ComponentFixture<ScoreModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreModalComponent ],
      imports: [IonicModule.forRoot(),
      ReactiveFormsModule,
     FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

})
