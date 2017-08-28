import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ModalMainComponent } from './modal-main/modal-main.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
    imports: [],
    declarations: [ModalMainComponent, ConfirmationComponent],
    exports: [ModalMainComponent]
})
export class ModalModule { }
