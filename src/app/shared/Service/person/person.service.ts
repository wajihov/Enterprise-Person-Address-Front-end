import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from 'app/shared/Models/Person.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient) { }

  public savePerson(person: Person): Observable<Person> {
    return this.httpClient.post<Person>(environment.backendHost + "/persons", person);
  }

  public updatePerson(id: number, person: Person): Observable<Person> {
    return this.httpClient.put<Person>(environment.backendHost + "/persons/" + id, person);
  }

  public getPersonById(id: number): Observable<Person> {
    return this.httpClient.get<Person>(environment.backendHost + "/persons/" + id);
  }

  public getPersons(): Observable<Array<Person>> {
    return this.httpClient.get<Array<Person>>(environment.backendHost + "/persons");
  }

  public deletePerson(id: number) {
    return this.httpClient.delete(environment.backendHost + "/persons/" + id);
  }
}
