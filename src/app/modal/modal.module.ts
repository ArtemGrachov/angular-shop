import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ModalMainComponent } from './modal-main/modal-main.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

import { ModalDirective } from './modal.directive';

@NgModule({
    imports: [],
    declarations: [ModalMainComponent, ConfirmationComponent, ModalDirective],
    exports: [ModalMainComponent]
})
export class ModalModule { }
