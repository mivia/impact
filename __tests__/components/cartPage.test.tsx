import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Cart from '@/app/cart/page';

import { LocalStorageMock } from '../../app/lib/utils';

// @ts-expect-error Don't have enough time to find a way of implementing the key property to above mock
global.localStorage = new LocalStorageMock;
 
it('calculates the right total value of cart items', () => {
  const cartItems = [
    {
      id: '1',
      title: 'first item',
      price: 20,
      image: '/image.jpg',
      quantity: 3
    },
    {
      id: '2',
      title: 'second item',
      price: 10,
      image: '/image.jpg',
      quantity: 2
    }
  ]

  localStorage.setItem('cart', JSON.stringify(cartItems))
  render(<Cart />)

  const expectedTotalAmount = (cartItems[0].price * cartItems[0].quantity + cartItems[1].price * cartItems[1].quantity).toFixed(2);
  const totalAmount = screen.getByTestId('totalAmount');

  expect(totalAmount).toHaveTextContent(`${expectedTotalAmount}$`)
})