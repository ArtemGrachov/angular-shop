import { Injectable, Inject, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { UsersService } from '../admin/users.service';

import { News } from '../shared/models/news.model';

@Injectable()
export class NewsService {
    constructor(
        public usersService: UsersService,
        public db: AngularFireDatabase
    ) { }

    news: News[] = [
        // new News(
        //     '1',
        //     'Hello world!',
        //     'This is the first news post in Angular Shop app',
        //     0,
        //     '0',
        //     new Date(2017, 8, 9, 17, 24, 1, 1)
        // ),

        // new News(
        //     '2',
        //     'Hello again',
        //     'This is the second news post in Angular Shop app, maked because of news component & service testing',
        //     0,
        //     '0',
        //     new Date(2017, 4, 9, 17, 26, 1, 1)
        // ),
        // new News(
        //     '3',
        //     'Test',
        //     'Aliqua irure Lorem id excepteur occaecat consequat exercitation dolor reprehenderit.',
        //     0,
        //     '1',
        //     new Date(2017, 10, 9, 17, 26, 1, 1)
        // )
    ];

    emit: EventEmitter<any> = new EventEmitter();

    loadNews() {
        this.db.list('/news').subscribe(
            res => {
                console.log(res);
                this.news = res;
                this.emit.emit();
            }
        );
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
        this.db.list('/news').set(newPost.id, newPost);
        this.loadNews();
    }

    updatePost(updatedPost: News) {
        console.log(updatedPost.id);
        this.db.list('/news').set(updatedPost.id, updatedPost);
        this.loadNews();
    }

    deletePost(id: string) {
        this.db.list('/news/' + id).remove();
        this.loadNews();
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
