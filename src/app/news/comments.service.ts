import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Comment } from '../shared/models/comment.model';

@Injectable()
export class CommentsService {
    constructor(
        public http: Http
    ) { }

    comments: Comment[] = [
        new Comment('0', '0', '1', 'Hello!', new Date()),
        new Comment('1', '1', '1', 'Voluptate sunt minim culpa Lorem laborum aliqua enim.', new Date()),
        new Comment('2', '0', '2', 'Do et qui ipsum ut reprehenderit nisi dolor amet occaecat.', new Date())
    ];
    emit: EventEmitter<any> = new EventEmitter();

    loadComments() {
        this.http.get('https://angular-shop-e7657.firebaseio.com/comments.json')
            .subscribe(
            (res: Response) => {
                let resJson = res.json(),
                    newCommentsList = [];
                for (let i in resJson) {
                    newCommentsList.push(resJson[i]);
                }
                this.comments = newCommentsList;
                this.emit.emit();
            });
    }

    getComments() {
        return this.comments.slice();
    }

    getCommentsToPost(postId: string) {
        let comments: Comment[] = [];
        for (const comment of this.comments) {
            if (comment.postId === postId) {
                comments.push(comment);
            }
        }
        return comments;
    }

    addComment(newComment: Comment) {
        newComment.id = (new Date).getTime().toString();
        this.http.put(`https://angular-shop-e7657.firebaseio.com/comments/${newComment.id}.json`, newComment).subscribe(
            () => this.loadComments()
        );
    }

    deleteComment(id: string) {
        this.http.delete(`https://angular-shop-e7657.firebaseio.com/comments/${id}.json`).subscribe(
            () => {
                this.loadComments();
            }
        );
    }

    getLatest(count: number): Comment[] {
        const sortedComments: Comment[] = this.comments.slice().sort(
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
        return sortedComments.slice(0, count);
    }

    getCount(): number {
        return this.comments.length;
    }
}
