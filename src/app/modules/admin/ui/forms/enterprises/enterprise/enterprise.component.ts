import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnterpriseService } from 'app/shared/Service/enterprise/enterprise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.scss']
})
export class EnterpriseComponent implements OnInit {

  horizontalStepperForm: FormGroup;
  step1Array: FormArray[];
  step2Array: FormArray[];

  /**
  * Constructor
  */
  constructor(
    private _formBuilder: FormBuilder,
    private enterpriseService: EnterpriseService,
    private router: Router) { }

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
        tax_number: ['', Validators.required]
      }),
      step2: this._formBuilder.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        postal_code: [''],
      }),
    });
  }

  addEnterprise() {
    this.step1Array = this.horizontalStepperForm.value.step1;
    console.log("step 1 ", this.step1Array);
  }

  addAddress() {
    this.step2Array = this.horizontalStepperForm.value.step2;
    console.log("step 2 ", this.step2Array);
  }

  saveEnterprise() {
    let form = { ...this.horizontalStepperForm.value.step1 };
    form.name = this.horizontalStepperForm.value.step1.name;
    form.tax_number = this.horizontalStepperForm.value.step1.tax_number;
    form.local_address = this.horizontalStepperForm.value.step2;

    console.log("L'enterprise : ", form);
    this.enterpriseService.saveEnterprise(form).subscribe({
      next: (data) => {
        console.log("la valeur : ", data);
        alert("Enterprise has been successfullyy saved");
        this.horizontalStepperForm.reset();
      },
      error: (err) => {
        console.log("Error at the company's backup level", err);
      },
    });
    this.router.navigate(['/ui/enterprises/allEnterprise']);
  }

}
