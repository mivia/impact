import { getUniqueCartItems } from "@/app/lib/utils";

import type { Product } from "@/app/components/product/product";

describe('utils tests', () => {
  const mockProduct = {
    id: '1',
    title: 'product title',
    price: 12,
    category: 'product category',
    description: 'product description',
    image: 'image path',
    quantity: 1,
  }

  const mockProduct2 = {
    id: '2',
    title: 'product title 2',
    price: 12,
    category: 'product category 2',
    description: 'product description 2',
    image: 'image path 2',
    quantity: 1,
  }

  it('should add a cart item to an empty cart', () => {
    const cart: Product[]  = [];

    const uniqueCartItems = getUniqueCartItems(mockProduct, cart);

    expect(uniqueCartItems).toHaveLength(1);
    expect(uniqueCartItems).toContainEqual(mockProduct);
    expect(uniqueCartItems[0].quantity).toEqual(mockProduct.quantity)
  });

  it('should add a cart item to a cart that already has this exact item and not duplicate it', () => {
    const cart: Product[]  = [mockProduct];

    const uniqueCartItems = getUniqueCartItems(mockProduct, cart);

    expect(uniqueCartItems).toHaveLength(1);
    expect(uniqueCartItems[0].quantity).toEqual(mockProduct.quantity + 1)
  });

  it('should add a cart item to a cart that already has another item', () => {
    const cart: Product[]  = [mockProduct];

    const uniqueCartItems = getUniqueCartItems(mockProduct2, cart);

    expect(uniqueCartItems).toHaveLength(2);
    expect(uniqueCartItems).toEqual(
      expect.arrayContaining([mockProduct, mockProduct2]),
    );
    expect(uniqueCartItems[0].quantity).toEqual(mockProduct.quantity)
    expect(uniqueCartItems[1].quantity).toEqual(mockProduct2.quantity)
  })
});