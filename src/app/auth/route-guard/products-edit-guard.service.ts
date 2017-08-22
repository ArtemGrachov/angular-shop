import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { EditAccessService } from '../../shared/edit-access.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductsEditGuard implements CanActivate {
    constructor(
        public editAccessService: EditAccessService
    ) { }

    canActivate(route: ActivatedRouteSnapshot) {
        return this.editAccessService.productEditAccess(route.params.id);
    }
}
