import './PaymentMethod.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogSignSVG } from '../components/SVGS';

export const PaymentMethod = () => {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState(false);
  // *Lo guardo en un state para mandarlo constantemente a la funcion de validacion para mi campo de entrada P loco
  const [cardDetails, setCardDetails] = useState({ 
    creditCardNumber: '',
    expirationDate: '',
    cvn: '',
  });
  const [error, setError] = useState('');
  // *Se ve mas facha con el pago realizado con exito y el time que le di para que redirija al profile para eso uso esto
  const [successMessage, setSuccessMessage] = useState('');


  // *Aqui valido que no se pueda ingresar letras y solo numeros en las entradas wazaaa
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'creditCardNumber' || name === 'cvn') {
      if (!/^\d*$/.test(value)) return; 
    } else if (name === 'expirationDate') {
      if (!/^\d{0,2}\/?\d{0,2}$/.test(value)) return; 
    }

    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { creditCardNumber, expirationDate, cvn } = cardDetails;
    const cardNumberRegex = /^\d{16}$/;
    const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvnRegex = /^\d{3}$/;

    if (!cardNumberRegex.test(creditCardNumber)) {
      return 'Número de tarjeta inválido. Debe contener 16 dígitos.';
    }

    if (!expirationDateRegex.test(expirationDate)) {
      return 'Fecha de expiración inválida. Debe estar en formato MM/YY.';
    }

    if (!cvnRegex.test(cvn)) {
      return 'CVV inválido. Debe contener 3 dígitos.';
    }

    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMessage = validateForm();

    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError('');
      setPaymentMethod(true); // !Aqui cambio a true el estado que querias para que se vuelva premium chesco
      setSuccessMessage('¡Pago completado con éxito!');
      console.log(paymentMethod);

      setTimeout(() => {
        navigate('/profile');
      }, 2000); 
    }
  };

  return (
    <>
      <div className="back-to-profile" onClick={() => {navigate('/profile')}}>
        <LogSignSVG />
      </div>
      <div className="container-payment-card">
        <form onSubmit={handleSubmit} className="payment-container">
          <div>
            <div className="payment-titles">
              <label className="payment-method-title">Introducir Método de Pago</label>
              <img src="https://lofrev.net/wp-content/photos/2016/07/visa_logo_7.jpg" alt="visa logo" className="payment-logo" />
            </div>
          </div>
          <div>
            <div className="payment-form-group">
              <label>Número Tarjeta</label>
              <input
                type="text"
                name="creditCardNumber"
                value={cardDetails.creditCardNumber}
                onChange={handleInputChange}
                maxLength="16"
                className="payment-input-field"
              />
            </div>
            <div className="payment-form-group">
              <label>Expiración MM/YY</label>
              <input
                type="text"
                name="expirationDate"
                value={cardDetails.expirationDate}
                onChange={handleInputChange}
                maxLength="5"
                placeholder='MM/YY'
                className="payment-input-field"
              />
            </div>
            <div className="payment-form-group">
              <label>CVV</label>
              <input
                type="text"
                name="cvn"
                value={cardDetails.cvn}
                onChange={handleInputChange}
                maxLength="3"
                className="payment-input-field"
              />
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit" className="payment-button">Realizar Pago</button>
        </form>
      </div>
    </>
  );
};

export default PaymentMethod;
