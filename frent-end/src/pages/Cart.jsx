import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';
import EmptyCart from '../components/Cart/EmptyCart';
import CartActions from '../components/Cart/CartActions';
import { removeFromCart, clearCart, setCartItems } from '../redux/features/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);
  const itemCount = items.length;

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      dispatch(setCartItems(parsedCart));
    }
  }, [dispatch]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const handleRemoveFromCart = (courseId) => {
    dispatch(removeFromCart(courseId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      
      {itemCount === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartActions onClearCart={handleClearCart} itemCount={itemCount} />
            
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  onRemove={handleRemoveFromCart} 
                />
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <CartSummary total={total} itemCount={itemCount} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;