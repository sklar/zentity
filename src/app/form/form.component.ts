import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CalculatorService, CURRENCY_BASE, CURRENCY_DEFAULT, Rates } from '../shared/calculator.service';
import { ListItem, ListService } from '../shared/list.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {

    calculator: FormGroup;
    conversion = 0;

    private rates: Rates;

    constructor(
        private calculatorService: CalculatorService,
        private formBuilder: FormBuilder,
        private listService: ListService,
    ) { }

    get currencies() {
        return this.calculatorService.getCurrencies();
    }

    get isSubmitAllowed() {
        return this.calculator.valid && this.calculator.controls.input.get('amount').value > 0;
    }

    ngOnInit() {
        this.calculator = this.createForm();
        this.calculatorService.getRates()
            .subscribe((rates: Rates) => {
                this.rates = rates;
            });
        this.onChange();
    }

    onChange() {
        this.calculator.valueChanges.subscribe({
            next: (change) => {
                const amount = change.input.amount;
                const currency = change.input.currency;

                if (this.rates[currency]) {
                    this.conversion = this.calculatorService.getConversion(amount, this.rates[currency]);
                    this.calculator.patchValue(
                        { output: { amount: this.conversion } },
                        { emitEvent: false }
                    );
                }

            }
        });
    }

    onSubmit(form: FormGroup) {
        const input = form.controls.input;
        const output = form.controls.output;
        const item: ListItem = {
            input: {
                amount: input.get('amount').value,
                currency: input.get('currency').value
            },
            output: {
                amount: output.get('amount').value,
                currency: output.get('currency').value
            }
        };

        if (this.isSubmitAllowed) {
            this.listService.addItem(item);
        }
    }

    private createForm(): FormGroup {
        return this.formBuilder.group({
            input: this.formBuilder.group({
                amount: [0, [Validators.pattern('[0-9]*([0-9]*(\.|,))?[0-9]+')]],
                currency: [CURRENCY_DEFAULT, [Validators.required]],
            }),
            output: this.formBuilder.group({
                amount: [{ value: 0, disabled: true }],
                currency: [{ value: CURRENCY_BASE, disabled: true }],
            }),
        });
    }

}
