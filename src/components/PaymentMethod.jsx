import './PaymentMethod.css'
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
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="payment-container">
        <div className="form-group promo-code-section">
          <label>Código de promoción</label>
          <input type="text" name="promoCode" />
        </div>
        <div className="form-group gift-cards-rewards-section">
          <label>Aplicar Código de regalo</label>
          <input type="text" name="giftCardsRewards" />
        </div>
        <div className="payment-options-section">
          <div className="payment-titles">
            <label className="method-title">Elegir Método de Pago</label>
            <img src="https://lofrev.net/wp-content/photos/2016/07/visa_logo_7.jpg" alt="visa logo" />
            <img src="https://www.oceanpayment.com/shopify_app/oceanpayment_logo/Paypal.png" alt="paypal logo" />
          </div>
          <div className="payment-options">
            <div className="option">
              <input
                type="radio"
                value="credit"
                checked={paymentMethod === 'credit'}
                onChange={handlePaymentMethodChange}
              />
              <label>Credit Card</label>
            </div>
            <div className="option">
              <input
                type="radio"
                value="debit"
                checked={paymentMethod === 'debit'}
                onChange={handlePaymentMethodChange}
              />
              <label>Debit Card</label>
            </div>
            <div className="option">
              <input
                type="radio"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={handlePaymentMethodChange}
              />
              <label>PayPal</label>
            </div>
          </div>
        </div>
        {paymentMethod === 'credit' && (
          <div className="credit-card-details-section">
            <div className="form-group">
              <label>Numero Tarjeta de Credito</label>
              <input
                type="text"
                value={creditCardNumber}
                onChange={handleCreditCardNumberChange}
                maxLength="16"
              />
            </div>
            <div className="form-group">
              <label>Expiracion MM/YY</label>
              <input
                type="text"
                value={expirationDate}
                onChange={handleExpirationDateChange}
                maxLength="5"
              />
            </div>
            <div className="form-group">
              <label>CVN</label>
              <input
                type="text"
                value={cvn}
                onChange={handleCvnChange}
                maxLength="3"
              />
            </div>
          </div>
        )}
        {paymentMethod === 'debit' && (
          <div className="debit-card-details-section">
            <div className="form-group">
              <label>Numero Tarjeta de Debito</label>
              <input
                type="text"
                value={debitCardNumber}
                onChange={handleDebitCardNumberChange}
                maxLength="16"
              />
            </div>
            <div className="form-group">
              <label>Expiracion MM/YY</label>
              <input
                type="text"
                value={expirationDate}
                onChange={handleExpirationDateChange}
                maxLength="5"
              />
            </div>
            <div className="form-group">
              <label>CVN</label>
              <input
                type="text"
                value={cvn}
                onChange={handleCvnChange}
                maxLength="3"
              />
            </div>
          </div>
        )}
        {paymentMethod === 'paypal' && (
          <div className="paypal-email-section">
            <div className="form-group">
              <label>PayPal Email</label>
              <input
                type="email"
                value={paypalEmail}
                onChange={handlePaypalEmailChange}
              />
            </div>
          </div>
        )}
        <button type="submit">Realizar Pago</button>
      </form>
    </div>
  );
};

export default PaymentMethod;
