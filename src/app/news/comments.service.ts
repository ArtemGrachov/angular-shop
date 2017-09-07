import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { DataService } from '../shared/data.service';

import * as Redux from 'redux';
import { AlertsStore } from '../data/stores/alerts.store';
import * as AlertActions from '../data/actions/alerts.actions';
import { Alert } from '../shared/models/alert.model';

import { Comment } from '../shared/models/comment.model';

@Injectable()
export class CommentsService {
    constructor(
        private http: Http,
        private dataService: DataService,
        @Inject(AlertsStore) private alertStore: Redux.Store<Alert>
    ) { }
    comments: Comment[] = [];

    loadAllComments() {
        return this.dataService.loadDataList('comments');
    }

    loadPostComments(postId: string) {
        return this.dataService.loadDataList('comments')
            .map(
            res => {
                return res.filter(
                    comment => comment.postId === postId
                );
            });
    }

    addComment(newComment: Comment) {
        newComment.id = (new Date).getTime().toString();
        return this.dataService.putData('comments', newComment).map(
            () => this.alertStore.dispatch(AlertActions.addAlert(new Alert('Comment added', 'success')))
        );
    }

    deleteComment(id: string) {
        return this.dataService.deleteData(`comments/${id}`, true).map(
            () => this.alertStore.dispatch(AlertActions.addAlert(new Alert('Comment deleted', 'warning')))
        );
    }

    getLatest(count: number) {
        return this.loadAllComments()
            .map(
            res => {
                return res.sort(
                    (a, b) => {
                        if (a.date < b.date) {
                            return 1;
                        } else if (a.date > b.date) {
                            return - 1;
                        } else {
                            return 0;
                        }
                    }
                ).slice(0, count);
            });
    }

    getCount() {
        return this.loadAllComments().map(
            res => res.length
        );
    }
}
