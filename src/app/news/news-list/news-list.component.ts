import { Component, OnInit } from '@angular/core';

import { News } from '../../shared/models/news.model';

import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  constructor(public newsService: NewsService) { }

  public newsList: News[] = [];

  ngOnInit() {
    this.newsList = this.newsService.getNews();
  }

}
