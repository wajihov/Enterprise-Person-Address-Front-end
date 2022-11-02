import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'app/shared/Models/Person.model';
import { PersonService } from 'app/shared/Service/person/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  horizontalStepperForm: FormGroup;
  entrepriseId: number;

  step1Array: FormArray[];
  step2Array: FormArray[];

  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this.entrepriseId = this.route.snapshot.params['id'];
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
        postal_code: [''],
      }),
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

  public savePerson() {

    let form = { ...this.horizontalStepperForm.value.step1 };
    let person: Person = form;
    person.name = form.name;
    person.lastname = form.lastname;
    person.post = form.post;
    person.local_address = this.horizontalStepperForm.value.step2;
    person.enterprise_id = this.entrepriseId;
    this.personService.savePerson(person).subscribe({
      next: (data) => {
        console.log("la valeur : ", data);
        this.horizontalStepperForm.reset();
      },
      error: (err) => {
        console.log("Error at the person's backup level", err);
      }
    });
    this.router.navigate(['/ui/forms/enterprises/getEnterprise/' + this.entrepriseId])
  }

  submit() {
    console.log({
      /* ...this.horizontalStepperForm.value.step1,
      ...this.horizontalStepperForm.value.step2,
      ...this.horizontalStepperForm.value.step3 */
    });

  }
}
