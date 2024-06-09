import React, { useState } from 'react';

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [debitCardNumber, setDebitCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvn, setCvn] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCreditCardNumberChange = (e) => {
    setCreditCardNumber(e.target.value);
  };

  const handleDebitCardNumberChange = (e) => {
    setDebitCardNumber(e.target.value);
  };

  const handleExpirationDateChange = (e) => {
    setExpirationDate(e.target.value);
  };

  const handleCvnChange = (e) => {
    setCvn(e.target.value);
  };

  const handlePaypalEmailChange = (e) => {
    setPaypalEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Method:', paymentMethod);
    if (paymentMethod === 'credit') {
      console.log('Credit Card Number:', creditCardNumber);
      console.log('Expiration Date:', expirationDate);
      console.log('CVN:', cvn);
    } else if (paymentMethod === 'debit') {
      console.log('Debit Card Number:', debitCardNumber);
      console.log('Expiration Date:', expirationDate);
      console.log('CVN:', cvn);
    } else if (paymentMethod === 'paypal') {
      console.log('PayPal Email:', paypalEmail);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Promo Code</label>
        <input type="text" name="promoCode" />
      </div>
      <div>
        <label>Apply Gift Cards and Rewards</label>
        <input type="text" name="giftCardsRewards" />
      </div>
      <div>
        <label>Payment Options</label>
        <div>
          <input
            type="radio"
            value="credit"
            checked={paymentMethod === 'credit'}
            onChange={handlePaymentMethodChange}
          />
          <label>Credit Card</label>
          <input
            type="radio"
            value="debit"
            checked={paymentMethod === 'debit'}
            onChange={handlePaymentMethodChange}
          />
          <label>Debit Card</label>
          <input
            type="radio"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={handlePaymentMethodChange}
          />
          <label>PayPal</label>
        </div>
      </div>
      {paymentMethod === 'credit' && (
        <div>
          <label>Credit Card Number</label>
          <input
            type="text"
            value={creditCardNumber}
            onChange={handleCreditCardNumberChange}
          />
          <label>Expiration MM/YY</label>
          <input
            type="text"
            value={expirationDate}
            onChange={handleExpirationDateChange}
          />
          <label>CVN</label>
          <input
            type="text"
            value={cvn}
            onChange={handleCvnChange}
          />
        </div>
      )}
      {paymentMethod === 'debit' && (
        <div>
          <label>Debit Card Number</label>
          <input
            type="text"
            value={debitCardNumber}
            onChange={handleDebitCardNumberChange}
          />
          <label>Expiration MM/YY</label>
          <input
            type="text"
            value={expirationDate}
            onChange={handleExpirationDateChange}
          />
          <label>CVN</label>
          <input
            type="text"
            value={cvn}
            onChange={handleCvnChange}
          />
        </div>
      )}
      {paymentMethod === 'paypal' && (
        <div>
          <label>PayPal Email</label>
          <input
            type="email"
            value={paypalEmail}
            onChange={handlePaypalEmailChange}
          />
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default PaymentMethod;
