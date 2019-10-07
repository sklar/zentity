import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ListItem, ListService } from '../shared/list.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

    dataSource: Observable<ListItem[]>;
    displayedColumns = [
        'input',
        'output',
    ];

    constructor(
        private listService: ListService,
    ) { }

    ngOnInit() {
        this.dataSource = this.listService.getItems();
    }

}
