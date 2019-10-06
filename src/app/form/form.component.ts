import {
    ChangeDetectionStrategy,
    Component,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnChanges {

    calculator: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.calculator = this.createForm();
        this.calculator.valueChanges.subscribe({
            next: value => console.log(value)
        });
    }

    ngOnChanges(changes: SimpleChanges) {

    }

    onSubmit(form: FormGroup) {
        console.log(form.value);

        // DEBUUUUUUUUGG!
        if (true || form.status === 'VALID') {
            // this.listService.addItem(form.value);
        }
    }

    private createForm(): FormGroup {
        return this.formBuilder.group({
            input: this.formBuilder.group({
                amount: [0, [Validators.pattern('[0-9]*([0-9]*(\.|,))?[0-9]+')]],
                currency: ['EUR', [Validators.required]],
            }),
            output: this.formBuilder.group({
                amount: [{ value: 0, disabled: true }],
                currency: [{ value: 'USD', disabled: true }],
            }),
        });
    }

}
