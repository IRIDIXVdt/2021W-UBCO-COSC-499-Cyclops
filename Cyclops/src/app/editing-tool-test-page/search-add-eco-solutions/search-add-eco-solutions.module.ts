import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchAddEcoSolutionsPageRoutingModule } from './search-add-eco-solutions-routing.module';

import { SearchAddEcoSolutionsPage } from './search-add-eco-solutions.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchAddEcoSolutionsPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SearchAddEcoSolutionsPage]
})
export class SearchAddEcoSolutionsPageModule {}
