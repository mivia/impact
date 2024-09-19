'use client'

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { getUniqueCartItems } from '@/app/lib/utils';

import styles from './product.module.css'

export type Product = {
  id: string,
  title: string,
  price: number,
  category: string,
  description: string,
  image: string,
  quantity: number,
}

type ProductProps = {
  product: Product;
}

export default function Product({ product }: ProductProps) {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const getAndSetCartItems = () => {
    const cartItems = localStorage.getItem('cart') || '[]';
    const parsedCartItems = JSON.parse(cartItems)

    setCartItems(parsedCartItems)
  }

  useEffect(() => {
    getAndSetCartItems();

    const checkCartData = () => {
      getAndSetCartItems();
    }
  
    window.addEventListener('storage', checkCartData)
    return () => window.removeEventListener('storage', checkCartData)
  }, [])

  const onAddToCartClick = (product: Product) => {
    const uniqueCartItems = getUniqueCartItems(product, cartItems)

    localStorage.setItem('cart', JSON.stringify(uniqueCartItems))
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <div data-test-id='e2eProductContainer' className={styles.productContainer}>
      <header>
        <h2>{product.title}</h2>
      </header>
      <main className={styles.imgContainer}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          style={{ objectFit: 'contain' }}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </main>
      <footer>
        <h3><b>{product.price}$</b></h3>
        <button onClick={() => onAddToCartClick({ ...product, quantity: 1})}>Add to cart</button>
      </footer>
    </div>
  )
}