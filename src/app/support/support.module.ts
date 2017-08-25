import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { SupportWindowComponent } from './support-window/support-window.component';

@NgModule({
    imports: [SharedModule],
    declarations: [SupportWindowComponent]
})
export class SupportModule { }
