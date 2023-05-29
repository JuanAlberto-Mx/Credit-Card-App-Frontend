import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {
  // Variable to set the name of the operation selected by the user.
  selectedOption: string = "Add credit card";

  // Variable to set the id of the credit card selected by the user.
  id: number | undefined;

  // Array for the list of credit cards
  creditCardList: any[] = [];

  // Variable to set the values of the credit card form.
  creditCardForm: FormGroup;

  /**
   * Dependency injection of FormBuilder to build the form.
   * @param formBuilder the instance of the credit card form.
   * @param toastr the instance of the Toastr Service.
   * @param creditCard the instance of the CreditCard service.
   */
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private creditCard: CreditCardService) {

    // Initialize the variable and set validators to each property.
    this.creditCardForm = this.formBuilder.group({
      user: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      endDate: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  ngOnInit(): void {
    this.getCreditCards();
  }

  /**
   * Selects the operation to perform (add or update credit card) based on the option selected by the user.
   */
  saveCreditCard() {
    if(this.id == undefined)
      this.addCreditCard();
    else
      this.updateCreditCard();
  }

  /**
   * Subscribes the getCreditCards method of the Credit Card API.
   */
  getCreditCards() {
    this.creditCard.getCreditCards().subscribe(
      data => {
        // Set the variable list with the information obteined from the API
        this.creditCardList = data;
      },
      error => {
        this.toastr.error(error.message, "Error");
      });
  }

  /**
   * Subscribes the addCreditCard API method to add a new credit card.
   */
  addCreditCard() {
    // Set the variables to the values received from the credit card form
    const creditCard: any = {
      user: this.creditCardForm.get('user')?.value,
      cardNumber: this.creditCardForm.get('cardNumber')?.value,
      endDate: this.creditCardForm.get('endDate')?.value,
      cvv: this.creditCardForm.get('cvv')?.value
    }

    // Add the credit card to the list
    this.creditCard.addCreditCard(creditCard).subscribe(
      data => {
        // Display the message of credit card added
        this.toastr.success('Credit card added successfully', 'Add Credit Card');

        // Reset the information of the form
        this.creditCardForm.reset();

        // Loads the credit cards available in the database
        this.getCreditCards();
      },
      error => {
        this.toastr.error(error.message, "Error");
      }
    );
  }

  /**
   * Updates the form content based on the selected credit card informacion.
   */
  editCreditCard(creditCard: any) {
    // Sets the variable with the edit option.
    this.selectedOption = "Update credit card";

    // Sets the variable to the credit card identifier.
    this.id = creditCard.id;

    // Fills the form with the information of the credit card selected.
    this.creditCardForm.patchValue({
      user: creditCard.user,
      cardNumber: creditCard.cardNumber,
      endDate: creditCard.endDate,
      cvv: creditCard.cvv
    });
  }

  /**
   * Subscribes the editCreditCard API method to update the information of a specific credit card.
   */
  updateCreditCard() {
    // Set the variables to the values received from the credit card form
    const creditCard: any = {
      user: this.creditCardForm.get('user')?.value,
      cardNumber: this.creditCardForm.get('cardNumber')?.value,
      endDate: this.creditCardForm.get('endDate')?.value,
      cvv: this.creditCardForm.get('cvv')?.value
    };

    creditCard.id = this.id;

    this.creditCard.updateCreditCard(creditCard.id, creditCard).subscribe(
      data => {
        // Display the message of credit card updated
        this.toastr.info('Credit card updated successfully', 'Update Credit Card');

        // Reset the information of the form
        this.creditCardForm.reset();

        // Loads the credit cards available in the database
        this.getCreditCards();

        // Resets the variables to determine the options selected by the user
        this.id = undefined;
        this.selectedOption = "Add credit card";
      },
      error => {
        this.toastr.error(error.message, "Error");
      }
    );
  }

  /**
   * Subscribes the deleteCreditCard API method to remove a credit card according to index sent.
   * @param index the index of the credit card to delete.
   */
  deleteCreditCard(index: number) {
    this.creditCard.deleteCreditCard(index).subscribe(
      data => {
        // Displays the message of credit card deleted
        this.toastr.error('Credit card deleted successfully', 'Delete Credit Card');

        // Loads the credit cards available in the database
        this.getCreditCards();
      },
      error => {
        this.toastr.error(error.message, "Error");
      }
    );
  }
}
