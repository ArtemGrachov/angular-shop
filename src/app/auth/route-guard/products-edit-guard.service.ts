import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { EditAccessService } from '../../shared/edit-access.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductsEditGuard implements CanActivate {
    constructor(
        private editAccessService: EditAccessService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot) {
        return this.editAccessService.productEditAccess(route.params.id).map(
            res => {
                if (!res) {
                    this.router.navigate(['/home']);
                }
                return res;
            }
        );
    }
}
