import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Enterprise } from 'app/shared/Models/Enterprise.model';
import { EnterpriseService } from 'app/shared/Service/enterprise/enterprise.service';

@Component({
  selector: 'app-update-enterprise',
  templateUrl: './update-enterprise.component.html',
  styleUrls: ['./update-enterprise.component.scss']
})
export class UpdateEnterpriseComponent implements OnInit {

  horizontalStepperForm: FormGroup;
  verticalStepperForm: FormGroup;

  step1Array: FormArray[];
  step2Array: FormArray[];

  id: number;
  getEnterprise: Enterprise;

  /**
   * Constructor
   */
  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private enterprieService: EnterpriseService) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.enterprieService.getEnterpriseById(this.id).subscribe((data) => {
      this.getEnterprise = data;
      console.log("l'entreprise est : ", this.getEnterprise);
      console.log("le nom de l'entreprise : ", this.getEnterprise.name);
      console.log("le tax number de l'entreprise est : ", this.getEnterprise.tax_number);
      console.log("l'adresse de l'entreprise est : ", this.getEnterprise.local_address);
    });
    // Horizontal stepper form
    this.horizontalStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        name: ['', [Validators.required]],
        tax_number: ['', Validators.required],
      }),
      step2: this._formBuilder.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        postal_code: [''],
      }),
    });
  }

  updateEnterpriseStep1() {
    this.step1Array = this.horizontalStepperForm.value.step1;
    console.log("step 1 ", this.step1Array);
  }

  updateAddressStep2() {
    this.step2Array = this.horizontalStepperForm.value.step2;
    console.log("step 2 ", this.step2Array);
  }

  updateEnterprise(): void {
    let form = { ...this.horizontalStepperForm.value.step1 };
    form.id = this.getEnterprise.id;
    form.name = this.horizontalStepperForm.value.step1.name;
    form.tax_number = this.horizontalStepperForm.value.step1.tax_number;
    form.local_address = this.horizontalStepperForm.value.step2;
    form.local_address.id = this.getEnterprise.local_address.id;
    console.log("Update enterprise : ", form);
    this.enterprieService.updateEnterprise(form.id, form).subscribe(
      (data) => {
        console.log("Les données sont modifié", data);
        this.router.navigate(['/ui/forms/enterprises/getEnterprise/' + form.id]);
      }, (err) => {
        console.log("Erreur au niveau de MAJ Enterprise", err);
      },
    )
  };
  submit() {
    console.log({
      ...this.horizontalStepperForm.value.step1,
      ...this.horizontalStepperForm.value.step2,
      ...this.horizontalStepperForm.value.step3
    });
  }

}