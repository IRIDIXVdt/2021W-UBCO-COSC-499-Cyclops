import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { SolutionPageForm } from '../form/solution.page.form';
import { COLORS } from './enum';
import { SectionSolution } from './SectionSolution';
import { SectionSolutionTags } from "./SectionSolutionTags"
import { StarSolutions } from './StarSolutions';

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
    console.log(SectionSolution[0].sections);
    console.log(SectionSolution[0].solution);
    this.sections = SectionSolution[0].sections;
    this.solutions = SectionSolution[0].solution;

    console.log(StarSolutions[0].stars);
    console.log(StarSolutions[0].starsols);
    this.stars = StarSolutions[0].stars;
    this.starsols = StarSolutions[0].starsols;

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
    this.usereco.level = this.rating = index; //  index is Value to database
    console.log(this.usereco.level);
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
    this.solutions = SectionSolution[0].solution.find(s=> s.section.trim() == val.trim()).solutions;
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
  getSolutionsForSelectedStars(val:string){
    this.starbuttonClicked = !this.starbuttonClicked;
    this.starsols = StarSolutions[0].starsols.find(s=> s.star.trim() == val.trim()).starsol;
  }
  getStarsForSelectedSolution(val:string){
    // this.starsection = StarSolutions[0].sectionstars;
    // this.usereco.level= StarSolutions[0].sectionstars.find(s=> this.starsection = val.trim()).starinput;
    this.usereco.level = StarSolutions[0].starsols.find(s=> s.starsol[0] == val.trim()).star;
    console.log(this.usereco.level);
    
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
