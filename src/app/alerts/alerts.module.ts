import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsComponent } from './alerts.component';

@NgModule({
    declarations: [AlertsComponent],
    imports: [CommonModule],
    exports: [AlertsComponent],
    providers: [],
})
export class AlertsModule { }
