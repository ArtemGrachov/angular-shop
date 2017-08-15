import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function isInteger(input: AbstractControl) {
    return +input.value === Math.ceil(+input.value) ? null : {
        isInteger: {
            valid: false
        }
    };
}
