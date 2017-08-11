import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { NewsRoutingModule } from './news-routing.module';

import { NewsListComponent } from './news-list/news-list.component';
import { NewsPostComponent } from './news-post/news-post.component';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  imports: [
    NewsRoutingModule,
    SharedModule
  ],
  declarations: [NewsListComponent, NewsPostComponent, NewsEditComponent, CommentsComponent]
})
export class NewsModule { }
