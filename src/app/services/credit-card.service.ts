import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  // Variable to set the URL of the backend.
  private urlBackend = "https://localhost:7039/";

  // Variable to set the API URL.
  private urlAPI = "api/CreditCard/"

  /**
   * Dependency injection to use HTTP client functionalities.
   * @param httpClient the instance of HTTP client.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Gets all the credit cards available in the database.
   * @returns the Observable response.
   */
  getCreditCards(): Observable<any>{
    return this.httpClient.get(this.urlBackend + this.urlAPI);
  }

  /**
   * Adds a new credit card in the database.
   * @param creditCard the credit card instance.
   * @returns the Observable response.
   */
  addCreditCard(creditCard: any): Observable<any> {
    return this.httpClient.post(this.urlBackend + this.urlAPI, creditCard);
  }

  /**
   * Updates the information of a specific credit card.
   * @param id the index of the credit card to update.
   * @returns the Observable response.
   */
  updateCreditCard(id: number, creditCard: any): Observable<any> {
    return this.httpClient.put(this.urlBackend + this.urlAPI + id, creditCard);
  }

  /**
   * Deletes a specific credit card.
   * @param id the identifier of the credit card to delete.
   * @returns the Observable response.
   */
  deleteCreditCard(id: number): Observable<any> {
    return this.httpClient.delete(this.urlBackend + this.urlAPI + id);
  }
}
