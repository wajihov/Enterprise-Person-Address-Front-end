import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from 'app/shared/Models/Address.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }

  public saveAddress(allAddress: Address): Observable<Address> {
    return this.httpClient.post<Address>(environment.backendHost + "/addresses/", allAddress);
  }

}
