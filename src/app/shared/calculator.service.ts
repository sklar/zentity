import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Payload {
    rates: Rates;
    base: string;
    date: string;
}
export interface Rates {
    [currenctCode: string]: number;
}

const CURRENCY: string[] = [
    'CHF',
    'CZK',
    'EUR',
    'GBP',
    'HKD',
    'IDR',
    'JPY',
    'USD',
];

export const CURRENCY_BASE    = 'USD';
export const CURRENCY_DEFAULT = 'EUR';

const FOREX_API_URL = 'https://api.exchangeratesapi.io/latest';

@Injectable({
    providedIn: 'root'
})
export class CalculatorService {

    private readonly query = [
        `base=${CURRENCY_BASE}`,
        `symbols=${[...CURRENCY].join(',')}`,
    ].join('&');

    constructor(
        private http: HttpClient,
    ) { }

    getConversion(amount: number, rate: number): number {
        const num = amount / rate;
        // return (Math.round((num + Number.EPSILON ) * 100 ) / 100);
        return num;
    }

    getCurrencies(): string[] {
        return CURRENCY;
    }

    getRates(): Observable<Rates> {
        return this.http.get<Payload>(`${FOREX_API_URL}?${this.query}`)
            .pipe(map((data) => {
                return data.rates;
            }));
    }

}
