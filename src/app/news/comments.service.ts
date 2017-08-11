import { Injectable, EventEmitter } from '@angular/core';

import { Comment } from '../shared/models/comment.model';

@Injectable()
export class CommentsService {
    private comments: Comment[] = [
        new Comment('0', '0', '1', 'Hello!'),
        new Comment('1', '1', '1', 'Voluptate sunt minim culpa Lorem laborum aliqua enim.'),
        new Comment('2', '0', '2', 'Do et qui ipsum ut reprehenderit nisi dolor amet occaecat.')
    ];
    public emit: EventEmitter<any> = new EventEmitter();

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
        this.comments.push(newComment);
        this.emit.emit();
    }

    deleteComment(id: string) {
        for (const index in this.comments) {
            if (this.comments[index].id === id) {
                this.comments.splice(+index, 1);
            }
        }
        this.emit.emit();
    }
}
