import type { Product } from "../components/product/product";

export const getUniqueCartItems = (product: Product, cartItems: Product[]) => {
  let newCartItems = [];
  const productIndex = cartItems.findIndex((item: Product) => item.id === product.id)
  const isProductInTheCart = productIndex > -1

  if (!isProductInTheCart) {
    newCartItems = [...cartItems]
    newCartItems.push({ ...product })
  } else {
    newCartItems = [...cartItems]
    newCartItems[productIndex] = { ...product, quantity: cartItems[productIndex].quantity + 1 }
  }

  return newCartItems;
}

export class LocalStorageMock {
  store: Record<string, string>
  length: number

  constructor() {
    this.store = {};
    this.length = length;
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}