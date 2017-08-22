import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsListComponent } from './news-list/news-list.component';
import { NewsPostComponent } from './news-post/news-post.component';
import { NewsEditComponent } from './news-edit/news-edit.component';

const newsRoutes = [
    { path: 'news', component: NewsListComponent, canActivate: [] },
    { path: 'news/new', component: NewsEditComponent },
    { path: 'news/:id', component: NewsPostComponent },
    { path: 'news/:id/edit', component: NewsEditComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(newsRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class NewsRoutingModule { }
