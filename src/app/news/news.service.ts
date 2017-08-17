import { Injectable, Inject, EventEmitter } from '@angular/core';

import { UsersService } from '../admin/users.service';

import { News } from '../shared/models/news.model';

@Injectable()
export class NewsService {
    constructor(
        public usersService: UsersService
    ) { }

    news: News[] = [
        new News(
            '1',
            'Hello world!',
            'This is the first news post in Angular Shop app',
            0,
            '0',
            new Date(2017, 8, 9, 17, 24, 1, 1)
        ),

        new News(
            '2',
            'Hello again',
            'This is the second news post in Angular Shop app, maked because of news component & service testing',
            0,
            '0',
            new Date(2017, 4, 9, 17, 26, 1, 1)
        ),
        new News(
            '3',
            'Test',
            'Aliqua irure Lorem id excepteur occaecat consequat exercitation dolor reprehenderit.',
            0,
            '1',
            new Date(2017, 10, 9, 17, 26, 1, 1)
        )
    ];

    emit: EventEmitter<any> = new EventEmitter();

    getNews() {
        return this.news.slice();
    }

    getNewsPost(id) {
        return this.news.find(
            (post) => post.id === id
        );
    }

    ratePost(id: string, rate: number) {
        if (this.usersService.getCurrentUser().ratedNews.indexOf(id) < 0) {
            this.usersService.getCurrentUser().ratedNews.push(id);
            let post: News = this.getNewsPost(id);
            post.rating += rate;
            this.emit.emit();
        }
    }

    addPost(newPost: News) {
        // test 'unique' id
        let testId = Math.floor(Math.random() * 1000);
        newPost.id = testId.toString();
        // test 'unique' id

        this.news.push(newPost);
        this.emit.emit();
    }

    updatePost(updatedPost: News) {
        for (const i in this.news) {
            if (this.news[i].id === updatedPost.id) {
                this.news[i] = updatedPost;
                this.emit.emit();
                return;
            }
        }
    }

    deletePost(id: string) {
        for (const index in this.news) {
            if (this.news[index].id === id) {
                this.emit.emit();
                return this.news.splice(+index, 1);
            }
        }
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
