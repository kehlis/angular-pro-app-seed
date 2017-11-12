import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Workout } from '../../../shared/services/workouts/workouts.service';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';

@Component({
    selector: 'workout-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['workout-form.component.scss'],
    template: `
        <div class="workout-form">
            <form [formGroup]="form">
                <div class="workout-form__name">
                    <label>
                        <h3>Workout name</h3>
                        <input
                            type="text"
                            placeholder="e.g. Breakfast"
                            formControlName="name">
                        <div class="error" *ngIf="required">
                            Workout name is required
                        </div>
                    </label>
                </div>                
                <div class="workout-form__submit">
                    <div>
                        <button *ngIf="!exists"
                            type="button"
                            class="button"
                            (click)="createWorkout()">
                            Create workout
                        </button>
                        <button *ngIf="exists"
                            type="button"
                            class="button"
                            (click)="updateWorkout()">
                            Save
                        </button>
                        <a class="button button--cancel"
                            [routerLink]="['../']">
                            Cancel
                        </a>
                    </div>

                    <div *ngIf="exists" class="workout-item__delete">
                        <div *ngIf="toggled">
                            <p>Delete item?</p>
                            <button class="confirm"
                                type="button"
                                (click)="removeWorkout()">
                                Yes
                            </button>
                            <button class="cancel"
                                type="button"
                                (click)="toggle()">
                                No
                            </button>
                        </div>
                        <button class="button button--delete"
                            type="button"
                            (click)="toggle()">
                            Delete
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `
})
export class WorkoutFormComponent implements OnChanges {

    toggled = false;
    exists = false;

    @Input() workout: Workout;

    @Output() create = new EventEmitter<Workout>();

    @Output() update = new EventEmitter<Workout>();

    @Output() remove = new EventEmitter<Workout>();

    form = this.fb.group({
        name: ['', Validators.required]
    });
    
    constructor(
        private fb: FormBuilder
    ) {}

    ngOnChanges(changes: SimpleChanges) {
       
    }

    // get ingredients() {
    //     return this.form.get('ingredients') as FormArray;
    // }

    get required() {
        return (
            this.form.get('name').hasError('required') && this.form.get('name').touched
        );
    }

    // emptyIngredients() {
    //     while(this.ingredients.controls.length) {
    //         this.ingredients.removeAt(0);
    //     }
    // }

    createWorkout() {
        if (this.form.valid) {            
            this.create.emit(this.form.value);
        }
    }

    updateWorkout() {
        if (this.form.valid) {            
            this.update.emit(this.form.value);
        }
    }

    removeWorkout() {
        this.remove.emit(this.form.value);
    }

    // addIngredient() {
    //     this.ingredients.push(new FormControl(['']));
    // }

    // removeIngredient(index: number) {
    //     this.ingredients.removeAt(index);
    // }

    toggle() {
        this.toggled = !this.toggled;
    }
}
