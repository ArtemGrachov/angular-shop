export class Product {
    constructor(
        public id: string,
        public name: string,
        public price: number,
        public rating: number,
        public count: number,
        public date: Date
    ) { }
}
