import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'schedule-days',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['schedule-days.component.scss'],
    template: `
        <div class="days">
            <button *ngFor="let day of days; index as i;"
                (click)="selectDay(i)"
                type="button"
                class="day">
                <span [class.active]="i === selected">
                    {{ day }}
                </span>
            </button>
        </div>
    `
})
export class ScheduleDaysComponent {

    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    @Input() selected: number;

    @Output() select = new EventEmitter<number>();
    
    selectDay(index: number) {
        this.select.emit(index);
    }

    constructor() {}
}
