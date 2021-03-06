import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ModalMainComponent } from './modal-main/modal-main.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { AlertComponent } from './alert/alert.component';

import { ModalDirective } from './modal.directive';

@NgModule({
    imports: [SharedModule],
    declarations: [ModalMainComponent, ConfirmationComponent, AlertComponent, ModalDirective],
    exports: [ModalMainComponent]
})
export class ModalModule { }
