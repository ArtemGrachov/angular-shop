import { Injectable, Inject } from '@angular/core';

import { AlertsService } from '../alerts/alerts.service';

import { DataService } from '../shared/data.service';

import { News } from '../shared/models/news.model';

@Injectable()
export class NewsService {
    constructor(
        public dataService: DataService,
        public alertsService: AlertsService
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
                return this.dataService.putData('news', post);
            }
        );
    }

    addPost(newPost: News) {
        newPost.id = (new Date).getTime().toString();
        return this.dataService.putData('news', newPost).map(
            () => this.alertsService.addAlert({ message: 'Post added', type: 'success' })
        );
    }

    updatePost(updatedPost: News) {
        return this.dataService.putData('news', updatedPost).map(
            () => this.alertsService.addAlert({ message: 'Post updated', type: 'info' })
        );
    }

    deletePost(id: string) {
        return this.dataService.deleteData('news/' + id).map(
            () => this.alertsService.addAlert({ message: 'Post deleted', type: 'warning' })
        );
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
