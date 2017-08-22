import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsEditGuard } from '../auth/route-guard/news-edit-guard.service';
import { AddItemGuard } from '../auth/route-guard/add-item-guard.service';

import { NewsListComponent } from './news-list/news-list.component';
import { NewsPostComponent } from './news-post/news-post.component';
import { NewsEditComponent } from './news-edit/news-edit.component';

const newsRoutes = [
    { path: 'news', component: NewsListComponent },
    { path: 'news/new', component: NewsEditComponent, canActivate: [AddItemGuard] },
    { path: 'news/:id', component: NewsPostComponent },
    { path: 'news/:id/edit', component: NewsEditComponent, canActivate: [NewsEditGuard] }
];

@NgModule({
    imports: [
        RouterModule.forChild(newsRoutes)
    ],
    exports: [RouterModule],
    providers: [NewsEditGuard, AddItemGuard]
})
export class NewsRoutingModule { }
