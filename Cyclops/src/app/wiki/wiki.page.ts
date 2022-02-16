import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.page.html',
  styleUrls: ['./wiki.page.scss'],
})
export class WikiPage implements OnInit {
  articleId: string;

  constructor(
    private activatedrouter: ActivatedRoute
  ) {
    this.articleId = this.activatedrouter.snapshot.paramMap.get('docId');
  }

  ngOnInit() {
  }

}
