import React, { useState } from 'react';

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvn, setCvn] = useState('');

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCreditCardNumberChange = (e) => {
    setCreditCardNumber(e.target.value);
  };

  const handleExpirationDateChange = (e) => {
    setExpirationDate(e.target.value);
  };

  const handleCvnChange = (e) => {
    setCvn(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Method:', paymentMethod);
    console.log('Credit Card Number:', creditCardNumber);
    console.log('Expiration Date:', expirationDate);
    console.log('CVN:', cvn);
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
            value="creditCard"
            checked={paymentMethod === 'creditCard'}
            onChange={handlePaymentMethodChange}
          />
          <label>Credit Card</label>
          <input
            type="radio"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={handlePaymentMethodChange}
          />
          <label>PayPal</label>
          <input
            type="radio"
            value="affirm"
            checked={paymentMethod === 'affirm'}
            onChange={handlePaymentMethodChange}
          />
          <label>Affirm</label>
        </div>
      </div>
      {paymentMethod === 'creditCard' && (
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default PaymentMethod;

