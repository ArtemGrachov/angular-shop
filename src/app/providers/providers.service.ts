import { Injectable, Inject, EventEmitter } from '@angular/core';

import { UsersService } from '../admin/users.service';

import { Provider } from '../shared/models/provider.model';

@Injectable()
export class ProvidersService {
    usersService: UsersService;
    constructor(
        @Inject(UsersService) usersService: UsersService
    ) {
        this.usersService = usersService;
    }

    private providers: Provider[] = [
        new Provider('0',
            'Test ltd.',
            'https://www.childrenslearninginstitute.org/assets/aoes/aoe-logo.png',
            'Ea aute exercitation ad do ea enim exercitation deserunt exercitation aliqua voluptate.',
            'test@test.com',
            ['1'],
            0,
            [
                'lorem ipsum',
                'hello!',
                'dsddd'
            ]),
        new Provider('1',
            'Lorem Ipsum inc.',
            'http://static.tumblr.com/kb1bvwn/qpym42qv3/tumblr.png',
            'Cillum aute cillum sint ipsum fugiat qui esse non deserunt occaecat id ex eu. Labore tempor dolore aliquip excepteur id ea ut dolore est pariatur. Non consequat ipsum consequat exercitation ullamco dolore voluptate enim irure ut. Adipisicing aute qui minim qui qui ad velit cupidatat exercitation ut ad pariatur eu. Commodo non incididunt aute occaecat aliquip elit amet minim esse velit officia id dolore. Esse sit eiusmod mollit voluptate duis ea in do elit id est. Aute duis sint exercitation est laborum enim.',
            'lorem@ipsum.com',
            ['2'],
            0,
            []),
        new Provider('2',
            'DDD',
            'http://www.sundaramart.com/images/brand-logo1.png',
            'Adipisicing sunt consequat aute dolore sit deserunt consectetur do.',
            'ddd@mail.test.com',
            ['3'],
            0,
            []),
        new Provider('3',
            'Apple',
            'http://logok.org/wp-content/uploads/2014/04/Apple-logo-Glass-themed.png',
            'Officia magna est mollit cupidatat dolore. Cupidatat pariatur exercitation laboris id culpa labore do ut exercitation ex. Incididunt anim ad sint aliqua nisi nulla nulla. Cupidatat consequat non proident nulla.',
            'apple@apple.com',
            ['1'],
            0,
            []),
        new Provider('4',
            'Microsoft',
            'https://upload.wikimedia.org/wikipedia/commons/8/8b/Microsoft_logo_%282012%29_modified.png',
            'Nulla dolor dolore pariatur deserunt.',
            'mail@microsoft.com',
            ['5'],
            0,
            [])
    ];

    emit: EventEmitter<any> = new EventEmitter();

    getProviders() {
        return this.providers.slice();
    }

    getProvider(id: String) {
        return this.providers.find(
            (provider) => provider.id === id
        );
    }

    addProvider(newProvider: Provider) {
        // test id
        const testId = Math.floor(Math.random() * 1000);
        newProvider.id = testId.toString();
        // test id
        this.providers.push(newProvider);
        this.emit.emit();
    }

    updateProvider(updatedProvider: Provider) {
        for (const i in this.providers) {
            if (this.providers[i].id === updatedProvider.id) {
                this.providers[i] = updatedProvider;
                this.emit.emit();
                return;
            }
        }
    }

    deleteProvider(id: string) {
        for (const index in this.providers) {
            if (this.providers[index].id === id) {
                this.providers.splice(+index, 1);
                this.emit.emit();
            }
        }
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
}
