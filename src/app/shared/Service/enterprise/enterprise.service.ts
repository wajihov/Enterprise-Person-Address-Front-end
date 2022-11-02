import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enterprise } from 'app/shared/Models/Enterprise.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(private httpClient: HttpClient) { }

  public saveEnterprise(enterprise: Enterprise): Observable<Enterprise> {
    return this.httpClient.post<Enterprise>(environment.backendHost + "/enterprises", enterprise);
  }

  public getEnterprises(): Observable<Array<Enterprise>> {
    return this.httpClient.get<Array<Enterprise>>(environment.backendHost + "/enterprises");
  }

  public getEnterpriseById(id: number): Observable<Enterprise> {
    return this.httpClient.get<Enterprise>(environment.backendHost + "/enterprises/" + id);
  }

  public deleteEnterprise(id: number) {
    return this.httpClient.delete(environment.backendHost + "/enterprises/" + id);
  }

  public updateEnterprise(id: Number, enterprise: Enterprise): Observable<Enterprise> {
    return this.httpClient.put<Enterprise>(environment.backendHost + "/enterprises/" + id, enterprise);
  }
}
