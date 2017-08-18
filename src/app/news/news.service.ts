import { Injectable, Inject } from '@angular/core';

import { DataService } from '../shared/data.service';

import { News } from '../shared/models/news.model';

@Injectable()
export class NewsService {
    constructor(
        public dataService: DataService
    ) { }

    loadNews() {
        return this.dataService.loadDataList('news');
    }

    loadPost(id: string) {
        return this.dataService.loadDataObj(`news/${id}`);
    }

    ratePost(id: string, rate: number) {
        return this.loadPost(id).map(
            post => {
                post.rating += rate;
                return this.updatePost(post);
            }
        );
    }

    addPost(newPost: News) {
        newPost.id = (new Date).getTime().toString();
        return this.dataService.putData('news', newPost);
    }

    updatePost(updatedPost: News) {
        return this.dataService.putData('news', updatedPost);
    }

    deletePost(id: string) {
        return this.dataService.deleteData('news/' + id);
    }

    getLatest(count: number) {
        return this.loadNews().map(
            res => {
                res.sort(
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
                return res.slice(0, count);
            }
        );
    }

    getCount() {
        return this.loadNews().map(
            res => res.length
        );
    }
}
