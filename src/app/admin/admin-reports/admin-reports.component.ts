import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-admin-reports',
    templateUrl: './admin-reports.component.html'
})
export class AdminReportsComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    selectReport(event: any): void {
        this.router.navigate([event.currentTarget.value], { relativeTo: this.route });
        // console.log(event.currentTarget.value);
    }
}
