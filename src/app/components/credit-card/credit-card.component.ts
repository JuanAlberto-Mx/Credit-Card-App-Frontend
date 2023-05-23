import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  // List of credit cards
  creditCardList: any[] = [
    {
      user: 'Jhon Doe',
      cardNumber: '1234567898765432',
      endDate: '12/24',
      cvv: '123'
    },
    {
      user: 'Richard Doe',
      cardNumber: '9876543219283746',
      endDate: '11/23',
      cvv: '321'
    }
  ];

  // Variable to set the values of the credit card form.
  creditCardForm: FormGroup;

  /**
   * Dependency injection of FormBuilder to build the form.
   * @param formBuilder the instance of the credit card form.
   * @param toastr the instance of the Toastr Service.
   */
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {

    // Initialize the variable and set validators to each property.
    this.creditCardForm = this.formBuilder.group({
      user: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      endDate: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  /**
   * Function to add a new credit card.
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
    this.creditCardList.push(creditCard);

    // Display the message of credit card added
    this.toastr.success('Credit card added successfully', 'Add Credit Card');

    // Reset the information of the form
    this.creditCardForm.reset();
  }

  /**
   * Updates the credit card informacion
   */
  editCreditCard() {

  }

  /**
   * Deletes a credit card according to the list index
   * @param index the index of the credit card.
   */
  deleteCreditCard(index: number) {
    // Removes just one item from the index.
    this.creditCardList.splice(index, 1);

    // Display the message of credit card deleted
    this.toastr.error('Credit card deleted successfully', 'Delete Credit Card');
  }
}
