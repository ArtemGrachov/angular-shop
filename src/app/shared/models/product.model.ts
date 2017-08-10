export class Product {
    constructor(
        public id: number,
        public name: string,
        public imgUrl: string,
        public description: string,
        public price: number,
        public rating: number,
        public count: number,
        public date: Date
    ) { }
}
