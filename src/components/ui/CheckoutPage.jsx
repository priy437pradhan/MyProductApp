import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, total, subtotal, shipping, tax } = location.state || {
    cartItems: [],
    total: 0,
    subtotal: 0,
    shipping: 0,
    tax: 0
  };

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    } else {
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      if (validateForm(1)) {
        setStep(2);
      }
    } else {
      if (validateForm(2)) {
        try {
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          navigate('/order-confirmation', { 
            state: { 
              orderNumber: Math.floor(Math.random() * 1000000),
              formData,
              cartItems,
              total
            }
          });
        } catch (error) {
          alert('There was an error processing your order. Please try again.');
        }
      }
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      navigate('/cart');
    }
  };

  // If no cart items, redirect to cart
  React.useEffect(() => {
    if (!cartItems.length) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Rest of the component remains the same as before...
  // (Keep all the JSX from the previous version)

  return (
    <div className="max-w-6xl mx-auto p-4">
      <button 
        onClick={handleBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {step === 1 ? 'Back to Cart' : 'Back to Shipping'}
      </button>

      {/* Rest of your JSX remains the same */}
    </div>
  );
};

export default CheckoutPage;