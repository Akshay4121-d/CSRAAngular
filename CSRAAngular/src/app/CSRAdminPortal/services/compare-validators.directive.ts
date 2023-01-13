import { ValidatorFn, AbstractControl, ValidationErrors, NG_VALIDATORS, Validator } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { Subscription } from 'rxjs';



export function compareValidator(controlNameToCompare: string): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
        if (c.value === null || c.value.length === 0) {
            return null;

        }
        const controlToCompare = c.root.get(controlNameToCompare);
        if (controlToCompare) {
            const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
                c.updateValueAndValidity();
                subscription.unsubscribe();
            });
        }
        return controlToCompare && controlToCompare.value !== c.value ? { 'compare': true } : null;
    };
}

@Directive({
    selector: '[compare]',
    providers: [{ provide: NG_VALIDATORS, useExisting: CompareValidatorDirective, multi: true }]
    //Register custom validator class,
    //multi true:to tell angular we want to add custom validator to the list of validators angular meeting.
})
 //Custom Validator:CompareValidatorDirective  and Interface is Validator
export class CompareValidatorDirective implements Validator {
    //input property to match values of pwd and confirmpwd
    @Input('compare') controlNameToCompare: string;
    // validate:method,c:control(confirmpwdfieldcontrol) and type is abstract control(inbuilt import,validation success returns null,
    //fails returns key value pair validationerror)
    validate(c: AbstractControl): ValidationErrors | null {
        if (c.value === null || c.value.length === 0) {
            return null;

        }
        //parent:root form element(they are siblingsnodes pwd and confirmpwd)
        const controlToCompare = c.root.get(this.controlNameToCompare);//get method:Input property
        if (controlToCompare) {
            const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
                c.updateValueAndValidity();
                subscription.unsubscribe();
            });
        }
        return controlToCompare && controlToCompare.value !== c.value ? { 'compare': true } : null;
    }
}