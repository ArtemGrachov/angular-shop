export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public regDate: Date,
        public category: string,
        public birthdate: Date,
        public gender: string,
        public location: any,
        public phone: string,
        public ratedNews: string[],
        public ratedProducts: string[],
        public ratedProviders: string[]
    ) { }
}
