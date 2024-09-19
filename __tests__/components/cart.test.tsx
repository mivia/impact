import { render } from '@testing-library/react'

import Cart from '@/app/components/cart/cart'

import { LocalStorageMock } from '../../app/lib/utils';

// @ts-expect-error Don't have enough time to find a way of implementing the key property to above mock
global.localStorage = new LocalStorageMock;
 
it('renders Cart with a circle containing items count', () => {
  localStorage.setItem('cart', JSON.stringify([{id: '1', quantity: 1}]))
  const { container } = render(<Cart />)
  expect(container).toMatchSnapshot()
})

it('renders Cart without a circle containing items count', () => {
  localStorage.setItem('cart', JSON.stringify([]))
  const { container } = render(<Cart />)
  expect(container).toMatchSnapshot()
})