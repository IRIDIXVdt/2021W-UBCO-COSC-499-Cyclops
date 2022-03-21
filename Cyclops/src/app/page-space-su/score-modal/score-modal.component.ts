import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { SolutionPageForm } from '../form/solution.page.form';
import { COLORS } from './enum';
import { SectionSolution } from './SectionSolution';
import { SectionSolutionTags } from "./SectionSolutionTags"
import { StarSolutions } from './StarSolutions';

import { SolutionAssign } from './SolutionAssign';
import { MainFormTags } from './MainFormTags';
import { ScoreAssign } from './ScoreAssign';
import { SectionAssign } from './SectionAssign';

@Component({
  selector: 'app-score-modal',
  templateUrl: './score-modal.component.html',
  styleUrls: ['./score-modal.component.scss'],
})
export class ScoreModalComponent implements OnInit  {
  tags :any;
  Tags: FetchTags[];
  solutions: any=[];
  sections: any=[];
  sol: any=[];
  sec: any=[];
  level: any=[];
  range: any=[];
  stars: any=[];
  starsols : any=[];

  @Input() rating: number ;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();starinput: string[];
  sectionstars: any=[];
  starsection: any=[];
  starsol: any=[];
  navCtrl: any;
  
;

  myForm: FormGroup;
  myFormSection: FormGroup;
  submitted = false;
  public colors = COLORS;
  public grey = COLORS.GREY;
  public green = COLORS.GREEN;
  public red = COLORS.RED;
  public yellow = COLORS.YELLOW;



  usereco: any = {};
  public buttonClicked: boolean=false;
  public starbuttonClicked: boolean=false;
  public sectionClicked: boolean=false;
  public starClicked: boolean=false;

  number: number;
  color: string;    


  //@Input() solution: string;
 // @Input() score: number;
  //@Input() totalscore: number;
  //scoreInput = new FormControl('', Validators.required);
  //taskInput = new FormControl('', Validators.required);
  

  constructor(private modalCtrl: ModalController, private navParams: NavParams, public formBuilder: FormBuilder) { 

  

    this.usereco = this.navParams.data;

    
  }
  public onSectionClick(){

      this.sectionClicked = !this.sectionClicked;
      this.starClicked=null;
    
    
  }
  public onStarClick(){

    this.starClicked = !this.starClicked;
    this.sectionClicked=null;
  
  
}

  ngOnInit() {
    this.sections =  MainFormTags[0].sections;
    console.log(this.sections);
    console.log(this.solutions);

    this.stars = MainFormTags[0].stars;
    console.log(this.stars);

    this.myForm = this.formBuilder.group({
      // Select_Section : ['', Validators.required],
      Select_Level : ['', Validators.required],
      Select_LevelSolution : ['', Validators.required],
      // Select_Range : ['', Validators.required]
    });
    this.myFormSection = this.formBuilder.group({
      Select_Section : ['', Validators.required],
      Select_Solution : ['', Validators.required],
      // Select_Level : ['', Validators.required],
      // Select_Range : ['', Validators.required]
    });
  }
  
  dismissModal() {
    this.modalCtrl.dismiss();

  }
  get errorCtr() {
    return this.myForm.controls;
  }
  get errorCtr1() {
    return this.myFormSection.controls;
  }

  

  



  onSolution(){

    this.submitted = true;
    if (!this.myForm.valid) {
      console.log('All fields are required.')
      return false;
    } else {
      this.modalCtrl.dismiss(this.usereco) //Sends all modal data to eco tracker tab
      console.log(this.usereco)
    
    }
  }
  onSectionSolution(){

    this.submitted = true;
    if (!this.myFormSection.valid) {
      console.log('All fields are required.')
      return false;
    } else {
      this.modalCtrl.dismiss(this.usereco) //Sends all modal data to eco tracker tab
      console.log(this.usereco)
    
    }
  }
  rate(index: number) {
    // function used to change the value of our rating 
    // triggered when user, clicks a star to change the rating
    this.usereco.range = this.rating = index; //  index is Value to database
    console.log(this.usereco.range);
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
       return this.yellow;
    case 3:
      return this.yellow;
    case 4:
    case 5:
      return this.yellow;
    default:
      return this.grey;  
   }
  }

  isAboveRating(index: number): boolean {
    // returns whether or not the selected index is above ,the current rating
    // function is called from the getColor function.
    return index > this.rating;
  }
  rangeChange($event) {
    this.usereco.range = ($event.target.value); //Value to database
    console.log(this.usereco.range);



    if(this.usereco.range == 2){
      this.usereco.updatedscore = (this.usereco.level*this.usereco.range)/2;
    }else if(this.usereco.range == 1){
      this.usereco.updatedscore = (this.usereco.level*this.usereco.range)/2;
      
    }else{
      this.usereco.updatedscore = this.usereco.level*this.usereco.range;
    }
    console.log(this.usereco.updatedscore); //Value to database

    // this.usereco.updatedscore = this.usereco.rating*this.usereco.range;
    // console.log(this.usereco.updatedscore) // Value to database
  }
  getSolutionsForSelectedSections(val:string){
    this.buttonClicked = !this.buttonClicked;
    this.solutions = SectionAssign.find(s=> s.section.trim() == val.trim()).solutions;
  }
  selectedSection($event) {
    // this.buttonClicked = !this.buttonClicked;
    this.buttonClicked=null;
    this.usereco.section = ($event.target.value); // Value to database
    console.log(this.usereco.section)
  }
  selectedSolution($event) {
    this.usereco.solution = ($event.target.value); // Value to database
    console.log(this.usereco.solution)
  }
  selectedLevel($event) {
    this.starbuttonClicked=null;
    this.usereco.level = ($event.target.value); // Value to database
    console.log(this.usereco.level)
  }
  getSolutionsForSelectedStars(val:number){
    this.starbuttonClicked = !this.starbuttonClicked;
    // this.starsols = StarSolutions[0].starsols.find(s=> s.star == val).starsol;
    this.starsols = SolutionAssign.find(s=> s.star == val).starsol;
  }
  
  getStarsForSelectedSolution(val:string){
    // this.starsection = StarSolutions[0].sectionstars;
    // this.usereco.level= StarSolutions[0].sectionstars.find(s=> this.starsection = val.trim()).starinput;

    // for(var index of [0,1]) {
    //   console.log(index);
    //   this.usereco.level = StarSolutions[0].starsols.find(s=> s.starsol[index] == val).star;
    //   console.log(this.usereco.level);
    // }

    this.usereco.level = ScoreAssign.find(s=> s.solutionname == val).starnumber;
    console.log(this.usereco.level);

  }
  rColor(index: number){

    if (index == 2) {
      this.color = 'success';
    }
    else if (this.usereco.range == 1) {
        this.color = 'warning';
    }
    else if (this.usereco.range == 0) {
        this.color = 'dark';
    }
    else if (this.usereco.range == -1)  {
        this.color = 'danger';
    }

  }
 
 

 
  
  
  


  

    


    
    
   

   //const totals = this.totalscore + this.scoreInput.value;
   //const sol = this.taskInput.value;
   //const sc = this.scoreInput.value;

   //this.modalCtrl.dismiss(totals);
   //this.modalCtrl.dismiss(sol);
   //this.modalCtrl.dismiss(sc);

   

   

  

}
 type FetchTags = {
    sections : string[];
    solution : {
        section : string;
        solutions : string[];
    }[];
  }
function Table(Table: any, arg1: { averagesList: any; }) {
  throw new Error('Function not implemented.');
}

