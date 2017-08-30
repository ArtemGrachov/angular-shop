export class Order {
    constructor(
        public id: string,
        public userId: string,
        public products: { name: string, price: number, provider: string }[],
        public deliveryPrice: number,
        public date: Date,
        public discount: number,
        public location: any
    ) { }
    public username: string;
    public providerName: string;
}
