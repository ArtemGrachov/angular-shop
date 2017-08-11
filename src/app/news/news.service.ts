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
        // test 'unique' id
        let testId = Math.floor(Math.random() * 1000);
        newPost.id = testId.toString();
        // test 'unique' id

        this.news.push(newPost);
    }

    updatePost(updatedPost: News) {
        for (const i in this.news) {
            if (this.news[i].id === updatedPost.id) {
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
