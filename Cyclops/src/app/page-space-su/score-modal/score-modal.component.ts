import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { SolutionPageForm } from '../form/solution.page.form';
import { COLORS } from './enum';
import { SectionSolution } from './SectionSolution';
import { SectionSolutionTags } from "./SectionSolutionTags"

@Component({
  selector: 'app-score-modal',
  templateUrl: './score-modal.component.html',
  styleUrls: ['./score-modal.component.scss'],
})
export class ScoreModalComponent implements OnInit  {

  sections: any=[];
  solutions: any=[];
  sol: any=[];
  sec: any=[];
  level: any=[];

  @Input() rating: number ;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();;

  myForm: FormGroup;
  submitted = false;
  public colors = COLORS;
  public grey = COLORS.GREY;
  public green = COLORS.GREEN;
  public red = COLORS.RED;
  public yellow = COLORS.YELLOW;



  usereco: any = {};


  //@Input() solution: string;
 // @Input() score: number;
  //@Input() totalscore: number;
  //scoreInput = new FormControl('', Validators.required);
  //taskInput = new FormControl('', Validators.required);
  

  constructor(private modalCtrl: ModalController, private navParams: NavParams, public formBuilder: FormBuilder) { 

  

    this.usereco = this.navParams.data;

    
  }

  ngOnInit() {
    console.log(SectionSolution.sections);
    this.sections= SectionSolution.sections;
    console.log(SectionSolution.solution);
    this.solutions= SectionSolution.solution;

    this.myForm = this.formBuilder.group({
      // task: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      // score: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(100), Validators.min(0)]],
      // task1: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      // score1: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(100), Validators.min(0)]],
      Select_Section : ['', Validators.required],
      Select_Solution : ['', Validators.required],
      Select_Level : ['', Validators.required]
    });
  }
  
  dismissModal() {
    this.modalCtrl.dismiss();

  }
  get errorCtr() {
    return this.myForm.controls;
  }

  

  



  onSolution(){

    this.submitted = true;
    if (!this.myForm.valid) {
      console.log('All fields are required.')
      return false;
    } else {
      this.modalCtrl.dismiss(this.usereco)
      console.log(this.usereco)
    
    }
  }
  rate(index: number) {
    // function used to change the value of our rating 
    // triggered when user, clicks a star to change the rating
    this.usereco.rating = this.rating = index; //  index is Value to database
    console.log(index);
    this.ratingChange.emit(this.rating);
 }

 
  getColor(index: number) {
    /* function to return the color of a star based on what
     index it is. All stars greater than the index are assigned
     a grey color , while those equal or less than the rating are
     assigned a color depending on the rating. Using the following criteria:
  
          1-2 stars: red
          3 stars  : yellow
          4-5 stars: green 
    */
   if(this.isAboveRating(index)){
     return this.grey;
   }
   switch (this.rating){
     case 1:
     case 2:
       return this.red;
    case 3:
      return this.yellow;
    case 4:
    case 5:
      return this.green;
    default:
      return this.grey;  
   }
  }

  isAboveRating(index: number): boolean {
    // returns whether or not the selected index is above ,the current rating
    // function is called from the getColor function.
    return index > this.rating;
  }
  getSolutionsForSelectedSections(val:string){
    this.solutions = SectionSolution.solution.find(s=> s.section.trim() == val.trim()).solutions;
  }
  selectedSection($event) {
    this.usereco.section = ($event.target.value); // Value to database
    console.log(this.usereco.section)
  }
  selectedSolution($event) {
    this.usereco.solution = ($event.target.value); // Value to database
    console.log(this.usereco.solution)
  }
  selectedLevel($event) {
    this.usereco.level = ($event.target.value); // Value to database
    console.log(this.usereco.level)
  }
  
  


  

    


    
    
   

   //const totals = this.totalscore + this.scoreInput.value;
   //const sol = this.taskInput.value;
   //const sc = this.scoreInput.value;

   //this.modalCtrl.dismiss(totals);
   //this.modalCtrl.dismiss(sol);
   //this.modalCtrl.dismiss(sc);

   

   

  

}
