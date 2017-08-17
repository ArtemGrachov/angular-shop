import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';

import { UsersService } from '../admin/users.service';

import { News } from '../shared/models/news.model';

@Injectable()
export class NewsService {
    constructor(
        public usersService: UsersService,
        public http: Http
    ) { }

    news: News[] = [
    ];

    emit: EventEmitter<any> = new EventEmitter();

    loadNews() {
        this.http.get('https://angular-shop-e7657.firebaseio.com/news.json')
            .subscribe(
            (res: Response) => {
                let resJson = res.json(),
                    newNewsList = [];
                for (let i in resJson) {
                    newNewsList.push(resJson[i]);
                }
                this.news = newNewsList;
                this.emit.emit();
            });
    }

    getNews() {
        return this.news.slice();
    }

    getNewsPost(id) {
        return this.news.find(
            (post) => post.id === id
        );
    }

    ratePost(id: string, rate: number) {
        this.loadNews();
        this.getNewsPost(id).rating += rate;
        this.updatePost(this.getNewsPost(id));
    }

    addPost(newPost: News) {
        newPost.id = (new Date).getTime().toString();
        this.http.put(`https://angular-shop-e7657.firebaseio.com/news/${newPost.id}.json`, newPost).subscribe(
            () => {
                this.loadNews();
            }
        );
    }

    updatePost(updatedPost: News) {
        this.http.put(`https://angular-shop-e7657.firebaseio.com/products/${updatedPost.id}.json`, updatedPost).subscribe(
            () => {
                this.loadNews();
            }
        );
    }

    deletePost(id: string) {
        this.http.delete(`https://angular-shop-e7657.firebaseio.com/news/${id}.json`).subscribe(
            () => {
                this.loadNews();
            }
        );
    }

    getLatest(count: number): News[] {
        const sortedNews: News[] = this.news.slice().sort(
            function (a, b) {
                if (a.date < b.date) {
                    return 1;
                } else if (a.date > b.date) {
                    return - 1;
                } else {
                    return 0;
                }
            }
        );
        return sortedNews.slice(0, count);
    }

    getCount(): number {
        return this.news.length;
    }
}
