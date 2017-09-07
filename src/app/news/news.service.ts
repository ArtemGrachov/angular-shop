import { Injectable, Inject } from '@angular/core';

import { DataService } from '../shared/data.service';
import { UsersService } from '../admin/users.service';

import * as Redux from 'redux';
import { AlertsStore } from '../data/stores/alerts.store';
import * as AlertActions from '../data/actions/alerts.actions';
import { Alert } from '../shared/models/alert.model';

import { News } from '../shared/models/news.model';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class NewsService {
    constructor(
        private dataService: DataService,
        private usersService: UsersService,
        @Inject(AlertsStore) private alertStore: Redux.Store<Alert>
    ) { }

    loadNews() {
        return this.dataService.loadDataList('news');
    }

    loadPost(id: string) {
        return this.dataService.loadDataObj(`news/${id}`);
    }

    ratePost(id: string, rate: number) {
        let obs = new Observable(
            observer => {
                this.usersService.rateItem(id, 'ratedNews').subscribe(
                    res => {
                        if (res) {
                            this.loadPost(id).subscribe(
                                post => {
                                    post.rating += rate;
                                    this.dataService.putObjValue(`news/${post.id}/rating`, post.rating).subscribe(
                                        res => observer.next(true)
                                    );
                                }
                            );
                        } else {
                            observer.next(false);
                            observer.complete();
                        }
                    }
                );
            }
        );
        return obs;
    }

    addPost(newPost: News) {
        newPost.id = (new Date).getTime().toString();
        return this.dataService.putData('news', newPost).map(
            () => this.alertStore.dispatch(AlertActions.addAlert(new Alert('Post added', 'success')))
        );
    }

    updatePost(updatedPost: News) {
        return this.dataService.putData('news', updatedPost).map(
            () => this.alertStore.dispatch(AlertActions.addAlert(new Alert('Post updated', 'info')))
        );
    }

    deletePost(id: string) {
        return this.dataService.deleteData('news/' + id, true).map(
            () => this.alertStore.dispatch(AlertActions.addAlert(new Alert('Post deleted', 'warning')))
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

    loadAuthorName(authorId) {
        return this.usersService.loadUser(authorId).map(
            user => user.name
        );
    }
}
