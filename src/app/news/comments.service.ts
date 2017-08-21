import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { AlertsService } from '../alerts/alerts.service';

import { DataService } from '../shared/data.service';

import { Comment } from '../shared/models/comment.model';

@Injectable()
export class CommentsService {
    constructor(
        public http: Http,
        public dataService: DataService,
        public alertsService: AlertsService
    ) { }
    comments: Comment[] = [];

    loadAllComments() {
        return this.dataService.loadDataList('comments');
    }

    loadPostComments(postId: string) {
        return this.dataService.loadDataList('comments')
            .map(
            res => {
                let comments: Comment[] = [];
                for (const comment of res) {
                    if (comment.postId === postId) {
                        comments.push(comment);
                    }
                }
                return comments;
            });
    }

    addComment(newComment: Comment) {
        newComment.id = (new Date).getTime().toString();
        return this.dataService.putData('comments', newComment).map(
            () => this.alertsService.addAlert({ message: 'Comment added', type: 'success' })
        );
    }

    deleteComment(id: string) {
        return this.dataService.deleteData(`comments/${id}`).map(
            () => this.alertsService.addAlert({ message: 'Comment deleted', type: 'warning' })
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
                );
            });
    }

    getCount() {
        return this.loadAllComments().map(
            res => res.length
        );
    }
}
