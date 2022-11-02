import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'app/shared/Models/Person.model';
import { PersonService } from 'app/shared/Service/person/person.service';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.scss']
})
export class UpdatePersonComponent implements OnInit {

  personId: number;
  getPerson: Person;
  enterpriseId: number;
  addressId: Number;
  horizontalStepperForm: FormGroup;

  step1Array: FormArray[];
  step2Array: FormArray[];


  constructor(
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.personId = this.route.snapshot.params['id'];
    console.log("L'id person " + this.personId);
    this.personService.getPersonById(this.personId).subscribe(
      (data) => {
        this.getPerson = data;
        console.log("person : ", this.getPerson);
        console.log('Le nom de personne', this.getPerson.name);
        console.log('Le nom de personne', this.getPerson.lastname);
        console.log("l'address : ", this.getPerson.local_address);
      }
      , (err) => {
        console.log(err);
      }
    );
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

  updatePerson(): void {
    let form = { ...this.horizontalStepperForm.value.step1 };
    form.id = this.getPerson.id;
    form.name = this.horizontalStepperForm.value.step1.name;
    form.lastname = this.horizontalStepperForm.value.step1.lastname;
    form.post = this.horizontalStepperForm.value.step1.post;
    form.local_address = this.horizontalStepperForm.value.step2;
    form.enterprise_id = this.getPerson.enterprise_id;
    form.local_address.id = this.getPerson.local_address.id;
    console.log("Person avant UPDATE : ", form);

    this.personService.updatePerson(form.id, form).subscribe(
      (data) => {
        console.log("les nouveaux information de person : ", data);
        this.router.navigate(["/ui/forms/enterprises/getEnterprise/" + data.enterprise_id])
      }, (err) => {
        console.log("Erreur au niveau de MAJ Person ", err);
      }
    )
  };


  /* updatePersonI(id: number, person: Person) {

  } */

  addPerson() {
    console.log("personne : ", this.horizontalStepperForm.value.step1);
  }

  addAddress() {
    console.log("l'adress : ", this.horizontalStepperForm.value.step2);
  }

  submit() {
    console.log({ ...this.horizontalStepperForm.value.step1, ...this.horizontalStepperForm.value.step2 });
  }



}
