import './PaymentMethod.css';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let paymentData;

    switch (paymentMethod) {
      case 'credit':
        paymentData = {
          method: 'credit',
          creditCardNumber,
          expirationDate,
          cvn,
        };
        break;
      case 'debit':
        paymentData = {
          method: 'debit',
          debitCardNumber,
          expirationDate,
          cvn,
        };
        break;
      case 'paypal':
        paymentData = {
          method: 'paypal',
          paypalEmail,
        };
        break;
      default:
        paymentData = {};
    }

    console.log('Payment Data:', paymentData);
    // Aquí puedes agregar la lógica para enviar los datos a Firebase
  };

  return (
    <div className="container-payment-card">
      <form onSubmit={handleSubmit} className="payment-container">
        <div className="payment-form-group">
          <label>Código de promoción</label>
          <input type="text" name="promoCode" className="payment-input-field" />
        </div>
        <div className="payment-form-group">
          <label>Aplicar Código de regalo</label>
          <input type="text" name="giftCardsRewards" className="payment-input-field" />
        </div>
        <div>
          <div className="payment-titles">
            <label className="payment-method-title">Elegir Método de Pago</label>
            <img src="https://lofrev.net/wp-content/photos/2016/07/visa_logo_7.jpg" alt="visa logo" className="payment-logo" />
            <img src="https://www.oceanpayment.com/shopify_app/oceanpayment_logo/Paypal.png" alt="paypal logo" className="payment-logo" />
          </div>
          <div className="payment-options">
            <div className="payment-option">
              <input
                type="radio"
                value="credit"
                checked={paymentMethod === 'credit'}
                onChange={handlePaymentMethodChange}
              />
              <label>Credit Card</label>
            </div>
            <div className="payment-option">
              <input
                type="radio"
                value="debit"
                checked={paymentMethod === 'debit'}
                onChange={handlePaymentMethodChange}
              />
              <label>Debit Card</label>
            </div>
            <div className="payment-option">
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
          <div>
            <div className="payment-form-group">
              <label>Numero Tarjeta de Credito</label>
              <input
                type="text"
                value={creditCardNumber}
                onChange={handleCreditCardNumberChange}
                maxLength="16"
                className="payment-input-field"
              />
            </div>
            <div className="payment-form-group">
              <label>Expiracion MM/YY</label>
              <input
                type="text"
                value={expirationDate}
                onChange={handleExpirationDateChange}
                maxLength="5"
                className="payment-input-field"
              />
            </div>
            <div className="payment-form-group">
              <label>CVN</label>
              <input
                type="text"
                value={cvn}
                onChange={handleCvnChange}
                maxLength="3"
                className="payment-input-field"
              />
            </div>
          </div>
        )}
        {paymentMethod === 'debit' && (
          <div>
            <div className="payment-form-group">
              <label>Numero Tarjeta de Debito</label>
              <input
                type="text"
                value={debitCardNumber}
                onChange={handleDebitCardNumberChange}
                maxLength="16"
                className="payment-input-field"
              />
            </div>
            <div className="payment-form-group">
              <label>Expiracion MM/YY</label>
              <input
                type="text"
                value={expirationDate}
                onChange={handleExpirationDateChange}
                maxLength="5"
                className="payment-input-field"
              />
            </div>
            <div className="payment-form-group">
              <label>CVN</label>
              <input
                type="text"
                value={cvn}
                onChange={handleCvnChange}
                maxLength="3"
                className="payment-input-field"
              />
            </div>
          </div>
        )}
        {paymentMethod === 'paypal' && (
          <div>
            <div className="payment-form-group">
              <label>PayPal Email</label>
              <input
                type="email"
                value={paypalEmail}
                onChange={handlePaypalEmailChange}
                className="payment-input-field"
              />
            </div>
          </div>
        )}
        <button type="submit" className="payment-button">Realizar Pago</button>
      </form>
    </div>
  );
};

export default PaymentMethod;
