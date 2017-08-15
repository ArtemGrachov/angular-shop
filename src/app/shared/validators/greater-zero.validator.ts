import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function greaterZero(input: AbstractControl) {
    return +input.value > 0 ? null : {
        greaterZero: {
            valid: false
        }
    };
}
