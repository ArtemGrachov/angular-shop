export class News {
    constructor(
        public id: string,
        public title: string,
        public content: string,
        public rating: number,
        public authorId: string,
        public date: Date
    ) { }
    public authorName: string;
}
