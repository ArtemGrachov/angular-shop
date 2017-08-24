export class Product {
    constructor(
        public id: string,
        public name: string,
        public imgUrl: string,
        public description: string,
        public providerId: string,
        public price: number,
        public rating: number,
        public count: number,
        public date: Date
    ) { }
    public providerName: string;
}
