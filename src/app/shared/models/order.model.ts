export class Order {
    constructor(
        public id: string,
        public userId: string,
        public products: { name: string, price: number }[],
        public date: Date,
        public location: any
    ) { }
}
