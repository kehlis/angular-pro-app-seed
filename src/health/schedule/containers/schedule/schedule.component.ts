import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ScheduleService, ScheduleItem } from '../../../shared/services/schedule/schedule.service';

import { Store } from 'store';

@Component({
    selector: 'schedule',
    styleUrls: ['schedule.component.scss'],
    template: `
        <div class="schedule">
            <schedule-calendar
                [date]="date$ | async"
                [items]="schedule$ | async"
                (change)="changeDate($event)">
            </schedule-calendar>
        </div>
    `
})
export class ScheduleComponent implements OnInit, OnDestroy {

    date$: Observable<Date>;
    schedule$: Observable<ScheduleItem[]>;
    subscriptions: Subscription[] = [];

    constructor(
        private store: Store,
        private scheduleService: ScheduleService
    ) {}

    ngOnInit() {
        this.date$ = this.store.select('date');
        this.schedule$ = this.store.select('schedule');

        this.subscriptions = [
            this.scheduleService.schedule$.subscribe()
        ];
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    changeDate(date: Date) {
        this.scheduleService.updateDate(date);
    }
}
