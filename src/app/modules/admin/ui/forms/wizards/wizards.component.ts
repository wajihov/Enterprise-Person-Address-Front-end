import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'forms-wizards',
    templateUrl: './wizards.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FormsWizardsComponent implements OnInit {
    horizontalStepperForm: FormGroup;
    verticalStepperForm: FormGroup;

    step1Array: FormArray[];
    step2Array: FormArray[];

    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Horizontal stepper form
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                name: ['', [Validators.required]],
                lastname: ['', Validators.required],
                post: ['', Validators.required],
            }),
            step2: this._formBuilder.group({
                address: ['', Validators.required],
                city: ['', Validators.required],
                country: ['', Validators.required],
                postalCode: [''],
            }),
            /* step3: this._formBuilder.group({
                byEmail: this._formBuilder.group({
                    companyNews: [true],
                    featuredProducts: [false],
                    messages: [true]
                }),
                pushNotifications: ['everything', Validators.required],
            }), */
        });


        // Vertical stepper form
        this.verticalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                email: ['', [Validators.required, Validators.email]],
                country: ['', Validators.required],
                language: ['', Validators.required]
            }),
            step2: this._formBuilder.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                userName: ['', Validators.required],
                about: ['']
            }),
            step3: this._formBuilder.group({
                byEmail: this._formBuilder.group({
                    companyNews: [true],
                    featuredProducts: [false],
                    messages: [true]
                }),
                pushNotifications: ['everything', Validators.required]
            })
        });
    }

    addPerson() {
        this.step1Array = this.horizontalStepperForm.value.step1;
        console.log("step 1 ", this.step1Array);
    }

    addAddress() {
        this.step2Array = this.horizontalStepperForm.value.step2;
        console.log("step 2 ", this.step2Array);
    }

    submit() {
        console.log({
            ...this.horizontalStepperForm.value.step1,
            ...this.horizontalStepperForm.value.step2,
            ...this.horizontalStepperForm.value.step3
        });

    }
}
