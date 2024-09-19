'use client'

import Image from 'next/image';

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
  const onAddToCartClick = (product: Product) => {
    const cartItems = localStorage.getItem('cart') || '[]';
    const parsedCartItems = JSON.parse(cartItems)
    let newCartItems = [];

    const productIndex = parsedCartItems.findIndex((item: Product) => item.id === product.id)
    const isProductInTheCart = productIndex > -1

    if (!isProductInTheCart) {
      newCartItems = [...parsedCartItems]
      newCartItems.push({ ...product })
    } else {
      newCartItems = [...parsedCartItems]
      newCartItems[productIndex] = { ...product, quantity: parsedCartItems[productIndex].quantity + 1 }
    }

    localStorage.setItem('cart', JSON.stringify(newCartItems))
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <div className={styles.productContainer}>
      <header>
        <h2>{product.title}</h2>
      </header>
      <main className={styles.imgContainer}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          style={{ objectFit:"contain" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </main>
      <footer>
        <h3><b>{product.price}$</b></h3>
        <button onClick={() => onAddToCartClick({ ...product, quantity: 1 })}>Add to cart</button>
      </footer>
    </div>
  )
}