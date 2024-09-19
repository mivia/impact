'use client'

import { useState, useEffect } from "react";
import Image from 'next/image';

import type { Product as ProductType } from '../components/product/product';

import styles from './page.module.css';

export default function Cart() {
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState<ProductType[]>([]);

  useEffect(() => {
    const cartItems = localStorage.getItem('cart') || '[]';

    setCartItems(JSON.parse(cartItems));
  }, [])

  useEffect(() => {
    const total =  cartItems.reduce((acc: number, item: ProductType) => {
      return acc + Number(item.price) * item.quantity
    }, 0)

    setTotal(total);
  }, [cartItems])

  const saveProducts = (products: ProductType[]) => {
    setCartItems([...products])

    localStorage.setItem('cart', JSON.stringify(products))
    
    window.dispatchEvent(new Event('storage'))
  }

  const onQuantityPlusClick = (product: ProductType) => {
    const productIndex = cartItems.findIndex((item: ProductType) => item.id === product.id);
    cartItems[productIndex].quantity++;

    saveProducts(cartItems);
  }

  const onQuantityMinusClick = (product: ProductType) => {
    const productIndex = cartItems.findIndex((item: ProductType) => item.id === product.id);

    cartItems[productIndex].quantity--;

    saveProducts(cartItems)
  }

  const onProductDelete = (product: ProductType) => {
    const productIndex = cartItems.findIndex((item: ProductType) => item.id === product.id);

    cartItems.splice(productIndex, 1);

    saveProducts(cartItems)
  }

  return (
    <div>
      <main>
        {
          Boolean(cartItems.length) ? 
          (
            <div className={styles.itemsContainer}>
              <h2>
                Cart items:
              </h2>
              <div>
                {
                  cartItems.map((product: ProductType, index: number) => (
                    <div key={`${product.id}_${index}`} className={styles.cartItem}>
                      <div className={styles.imgContainer}>
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          style={{ objectFit:"contain" }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className={styles.titleContainer}>{product.title}</div>
                      <div className={styles.priceContainer}>{product.price}$</div>
                      <div className={styles.productControlsContainer}>
                        {
                          product.quantity > 1 && (
                            <button onClick={() =>  onQuantityMinusClick(product)}>
                              <Image
                                src="/minus-icon.svg"
                                width={20}
                                height={20}
                                alt="Minus icon"
                              />
                            </button>
                          )
                        }
                        <span>{product.quantity}</span>
                        <button onClick={() => onQuantityPlusClick(product)}>
                          <Image
                            src="/plus-icon.svg"
                            width={20}
                            height={20}
                            alt="Plus icon"
                          />
                        </button>
                      </div>
                      <div className={styles.trashContainer}>
                        <button onClick={() => onProductDelete(product)}>
                            <Image
                              src="/trash-icon.svg"
                              width={25}
                              height={25}
                              alt="Trash icon"
                            />
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            <div className={styles.totalContainer}>
              <h2>Total: <span><b>{`${total.toFixed(2)}$`}</b></span></h2>
            </div>
            </div>
          ) : (
            <h2>No items in your cart yet!</h2>
          )
        }
      </main>
    </div>
  );
}
