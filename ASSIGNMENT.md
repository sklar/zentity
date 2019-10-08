# Assignment

Prepare an HTML document with embedded JavaScript code that will serve as a multi-currency converter.  
It should consist of two areas: a simple form to enter the monetary value and a table containing all the entered values so far and their sum. The form should consist of a text input for entering the monetary amount, a select box for choosing the currency, text with hint of USD amount of entered value and a submit button.

Text hint should be updated every time user is changing text input or select box. After submitting the form, a new line should appear in the table displaying the original amount and currency and this amount converted to USD. At the bottom of the table there should be a sum of all the entered amounts (in USD only).  

### Example

- the user enters 100 in the amount field
- the user selects EUR as the currency
- text hint is displayed with USD amount according to conversion rate of the current day
- the user submits the form:
    - row appears in the table (below existing rows)
    - he first cell contains the value 100 EUR, the second cell contains the converted value  
    e.g. 111.97 USD – according to conversion rate on 02.06.2016)
    - he total value below the table is increased by the amount in USD (in this case 111.97)

## Instructions

- The solution must be a standalone front-end implementation (no server-side code)
- Please use an online currency conversion service to fetch conversion rates
- It is enough to use a few different currencies (e.g. EUR, USD, CZK) – there is no need to support all the currencies
- Validation on text input in form is welcomed
- There is no need for a reset form or clear page functionality (it can be easily achieved by reloading the page)
