import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';

// import data from './data.json';

interface Item {
    amount: number;
    currency: string;
}

export interface ListItem {
    input: Item;
    output: Item;
}

// const MOCK_DATA: ListItem[] = data.slice(0, 3);

@Injectable({
    providedIn: 'root'
})
export class ListService {

    list$: Observable<ListItem[]>;

    private items: ListItem[] = [];
    private listSubject = new BehaviorSubject<ListItem[]>([]);
    // private listSubject = new BehaviorSubject<ListItem[]>(
    //     MOCK_DATA.slice(0, 3)
    // );

    constructor(
        private snackbar: MatSnackBar,
    ) {
        this.list$ = this.listSubject.asObservable();
    }

    addItem(item: ListItem): void {
        this.items = [
            ...this.items,
            item,
        ];
        this.listSubject.next(this.items);

        // this.snackbar.open(`
        //     Conversion from ${formatCurrency(item.input.amount, 'EUR', 'symbol', '1.2-2')}
        //     to ${formatCurrency(item.output.amount, 'USD', 'symbol', '1.2-2')} added ✌
        // `);
        this.snackbar.open(`Conversion added ✌`);
    }

    getItems(): Observable<ListItem[]> {
        return this.list$;
    }

    getSum(): number {
        return this.items.reduce((acc, item) => {
            return acc + item.output.amount;
        }, 0);
    }

}
