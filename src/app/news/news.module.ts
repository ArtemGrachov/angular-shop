import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';

import { NewsListComponent } from './news-list/news-list.component';
import { NewsPostComponent } from './news-post/news-post.component';
import { NewsEditComponent } from './news-edit/news-edit.component';

@NgModule({
  imports: [
    CommonModule, NewsRoutingModule

  ],
  declarations: [NewsListComponent, NewsPostComponent, NewsEditComponent]
})
export class NewsModule { }
