import { IonicModule } from '@ionic/angular';
import {ArticleCardComponent} from '../article-card/article-card.component'
import {SearchbarComponent} from '../searchbar/searchbar.component'
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule
  ],
  declarations: [
    Tab2Page,
    ArticleCardComponent,
    SearchbarComponent
  ]
})
export class Tab2PageModule {}
