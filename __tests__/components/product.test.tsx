import { render } from '@testing-library/react'

import Product from '@/app/components/product/product'

import { LocalStorageMock } from '../../app/lib/utils';

// @ts-expect-error Don't have enough time to find a way of implementing the key property to above mock
global.localStorage = new LocalStorageMock;
 
it('renders a product with title, image, price and add to cart button', () => {
  const mockProduct = {
    id: '1',
    category: 'mock category',
    description: 'mock description',
    title: 'mock product',
    image: '/mockimage.jpg',
    price: 22,
    quantity: 1
  }
  const { container } = render(<Product product={mockProduct} />)

  expect(container).toMatchSnapshot()
})