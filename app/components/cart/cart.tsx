'use client'

import Image from 'next/image';
import Link from 'next/link';

import { useState, useEffect } from 'react';

import type { Product } from '../product/product';

import styles from './cart.module.css';

type CartProps = {
  width?: number,
  height?: number,
}

const getProductsAmount = () => {
  const cartItems = localStorage.getItem('cart') || '[]';
  const cartItemsParsed = JSON.parse(cartItems);

  return cartItemsParsed.reduce((acc: number, item: Product) => {
    return acc + item.quantity;
  }, 0)
}

export default function Cart({ width=50, height=50}: CartProps) {
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    const productsAmount = getProductsAmount();
    setProductsCount(productsAmount);

    const checkCartData = () => {
      const productsAmount = getProductsAmount();
      setProductsCount(productsAmount);
    }
  
    window.addEventListener('storage', checkCartData)
    return () => window.removeEventListener('storage', checkCartData)
  }, [])

  return (
    <div className={styles.cartContainer}>
      <Link href="/cart">
        <Image
          src="/basket-icon.svg"
          width={width}
          height={height}
          alt="Basket icon"
        />
        {
          productsCount ? (
            <div className={styles.productsCountCircle}><b>{productsCount}</b></div>
          ) : null
        }
      </Link>
    </div>
  )
}