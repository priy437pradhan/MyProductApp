import  { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

const ProductPage = () => {
  const [reviews, setReviews] = useState([
    { id: 1, name: 'John Doe', rating: 5, comment: 'Excellent product! Exactly what I needed.', date: '2024-03-15' },
    { id: 2, name: 'Jane Smith', rating: 4, comment: 'Great quality, but shipping took a while.', date: '2024-03-10' }
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  const [submitMessage, setSubmitMessage] = useState('');

  const product = {
    name: 'Premium Widget',
    price: 99.99,
    description: 'High-quality widget perfect for all your needs. Features premium materials and expert craftsmanship.',
    imageUrl: '/api/placeholder/400/300'
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      setSubmitMessage('Please fill in all fields');
      return;
    }

    // Add new review
    const review = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews([...reviews, review]);
    setNewReview({ name: '', rating: 5, comment: '' });
    setSubmitMessage('Review submitted successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => setSubmitMessage(''), 3000);
  };

  const handleAddToCart = () => {
    // Here you would typically update a cart state or context
    alert('Product added to cart!');
    // Navigate to cart page
    window.location.href = '/cart'; // Update this to use your router
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`w-5 h-5 ${i < averageRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-sm text-gray-600">({reviews.length} reviews)</span>
          </div>
          <p className="text-2xl font-bold text-green-600">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>
          <button 
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{review.name}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Review Form */}
      <Card>
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent>
          {submitMessage && (
            <div className={`p-3 mb-4 rounded ${
              submitMessage.includes('error') 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {submitMessage}
            </div>
          )}
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={newReview.name}
                onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
                className="w-full p-2 border rounded-lg"
              >
                {[5,4,3,2,1].map(num => (
                  <option key={num} value={num}>{num} Stars</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Review</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                className="w-full p-2 border rounded-lg"
                rows={4}
                required
              />
            </div>
            <button 
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Submit Review
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPage;