import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { CheckCircle, Home } from 'lucide-react';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, formData, cartItems, total } = location.state || {};

  if (!orderNumber) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600">Thank you for your order</p>
              <p className="font-medium">Order #{orderNumber}</p>
            </div>

            <div className="border-t border-b py-4">
              <h3 className="font-medium mb-2">Order Details</h3>
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between py-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t mt-2 pt-2 font-medium">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Shipping Address</h3>
              <p>{formData.firstName} {formData.lastName}</p>
              <p>{formData.address}</p>
              <p>{formData.city}, {formData.state} {formData.zipCode}</p>
            </div>

            <button 
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              <Home className="w-4 h-4" />
              Return to Home
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfirmationPage;