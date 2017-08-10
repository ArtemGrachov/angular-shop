export class Comment {
    constructor(
        public id: string,
        public authorId: string,
        public postId: string,
        public content: string
    ) { }
}
