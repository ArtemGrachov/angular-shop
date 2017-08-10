import { Injectable } from '@angular/core';
import { News } from '../shared/models/news.model';

@Injectable()
export class NewsService {
    private news: News[] = [
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
            new Date(2017, 8, 9, 17, 26, 1, 1)
        )
    ];

    getNews() {
        return this.news;
    }

    getNewsPost(id) {
        return this.news.find(
            (post) => post.id === id
        );
    }

    setPostRating(id: string, rate: number) {
        let post: News = this.getNewsPost(id);
        post.rating += rate;
    }

    addPost(newPost: News) {
        this.news.push(newPost);
    }

    updatePost(id: string, updatedPost: News) {
        for (const i in this.news) {
            if (this.news[i].id === id) {
                this.news[i] = updatedPost;
                return;
            }
        }
    }

    deletePost(id: string) {
        for (const index in this.news) {
            if (this.news[index].id === id) {
                return this.news.splice(+index, 1);
            }
        }
    }
}
