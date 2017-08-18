import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';

import { UsersService } from '../admin/users.service';

import { Provider } from '../shared/models/provider.model';

@Injectable()
export class ProvidersService {
    constructor(
        public usersService: UsersService,
        public http: Http
    ) { }
    emit: EventEmitter<any> = new EventEmitter();

    private providers: Provider[] = [
        // new Provider('0',
        //     'Test ltd.',
        //     'https://www.childrenslearninginstitute.org/assets/aoes/aoe-logo.png',
        //     'Ea aute exercitation ad do ea enim exercitation deserunt exercitation aliqua voluptate.',
        //     'test@test.com',
        //     ['1'],
        //     0,
        //     [
        //         'lorem ipsum',
        //         'hello!',
        //         'dsddd'
        //     ]),
        // new Provider('1',
        //     'Lorem Ipsum inc.',
        //     'http://static.tumblr.com/kb1bvwn/qpym42qv3/tumblr.png',
        //     'Cillum aute cillum sint ipsum fugiat qui esse non deserunt occaecat id ex eu. Labore tempor dolore aliquip excepteur id ea ut dolore est pariatur. Non consequat ipsum consequat exercitation ullamco dolore voluptate enim irure ut. Adipisicing aute qui minim qui qui ad velit cupidatat exercitation ut ad pariatur eu. Commodo non incididunt aute occaecat aliquip elit amet minim esse velit officia id dolore. Esse sit eiusmod mollit voluptate duis ea in do elit id est. Aute duis sint exercitation est laborum enim.',
        //     'lorem@ipsum.com',
        //     ['2'],
        //     0,
        //     []),
        // new Provider('2',
        //     'DDD',
        //     'http://www.sundaramart.com/images/brand-logo1.png',
        //     'Adipisicing sunt consequat aute dolore sit deserunt consectetur do.',
        //     'ddd@mail.test.com',
        //     ['3'],
        //     0,
        //     []),
        // new Provider('3',
        //     'Apple',
        //     'http://logok.org/wp-content/uploads/2014/04/Apple-logo-Glass-themed.png',
        //     'Officia magna est mollit cupidatat dolore. Cupidatat pariatur exercitation laboris id culpa labore do ut exercitation ex. Incididunt anim ad sint aliqua nisi nulla nulla. Cupidatat consequat non proident nulla.',
        //     'apple@apple.com',
        //     ['1'],
        //     0,
        //     []),
        // new Provider('4',
        //     'Microsoft',
        //     'https://upload.wikimedia.org/wikipedia/commons/8/8b/Microsoft_logo_%282012%29_modified.png',
        //     'Nulla dolor dolore pariatur deserunt.',
        //     'mail@microsoft.com',
        //     ['5'],
        //     0,
        //     [])
    ];

    loadProviders() {
        this.http.get('https://angular-shop-e7657.firebaseio.com/providers.json')
            .subscribe(
            (res: Response) => {
                let resJson = res.json(),
                    newProviders = [];
                for (let i in resJson) {
                    newProviders.push(resJson[i]);
                }
                this.providers = newProviders;
                this.emit.emit();
            });
    }

    getProviders() {
        return this.providers.slice();
    }

    getProvider(id: String) {
        return this.providers.find(
            (provider) => provider.id === id
        );
    }

    addProvider(newProvider: Provider) {
        newProvider.id = (new Date).getTime().toString();
        this.http.put(`https://angular-shop-e7657.firebaseio.com/providers/${newProvider.id}.json`, newProvider).subscribe(
            () => {
                this.loadProviders();
                this.emit.emit();
            }
        );
    }

    updateProvider(updatedProvider: Provider) {
        this.http.put(`https://angular-shop-e7657.firebaseio.com/providers/${updatedProvider.id}.json`, updatedProvider).subscribe(
            () => {
                this.loadProviders();
                this.emit.emit();
            }
        );
    }

    deleteProvider(id: string) {
        this.http.delete(`https://angular-shop-e7657.firebaseio.com/providers/${id}.json`).subscribe(
            () => {
                this.loadProviders();
                this.emit.emit();
            }
        );
    }

    rateProvider(id: string, rating: number) {
        if (this.usersService.getCurrentUser().ratedProviders.indexOf(id) < 0) {
            this.usersService.getCurrentUser().ratedProviders.push(id);
            this.getProvider(id).rating += rating;
            this.emit.emit();
        }
    }

    addComment(providerId: string, comment: string) {
        if (comment.length > 0) {
            this.getProvider(providerId).comments.push(comment);
            this.emit.emit();
        }
    }

    deleteComment(providerId: string, commentIndex: string) {
        this.getProvider(providerId).comments.splice(+commentIndex, 1);
        this.emit.emit();
    }

    getProvidersByUserId(userId: string) {
        if (this.providers.length <= 0) {
            this.loadProviders();
        }
        let providersIds = [];
        for (let provider of this.providers) {
            console.log(provider);
            if (provider.users.indexOf(userId) > -1) {
                providersIds.push({ id: provider.id, name: provider.name });
            }
        }
        return providersIds;
    }
}
