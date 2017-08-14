export class Provider {
    constructor(
        public id: string,
        public name: string,
        public logoUrl: string,
        public description: string,
        public email: string,
        public orders: any[]
    ) { }
}