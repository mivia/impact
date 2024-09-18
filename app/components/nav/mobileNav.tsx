'use client'

import { useState } from 'react';

import Link from 'next/link'
import Image from 'next/image';

import Cart from '../cart/cart';

import styles from './mobileNav.module.css';

import type { NavProps, Category } from './nav';

export default function MobileNav({ categories }: NavProps) {
  const [isFolded, setIsFolded] = useState(true);

  return (
    <div className={styles.nav}>
      <nav>
        <button onClick={() => setIsFolded(!isFolded)}>
          <Image
            src="/burger-icon.svg"
            width={35}
            height={35}
            alt="Mobile icon"
          />
        </button>
        {
          !isFolded ? (
            <ul>
              {
                categories.map((category: Category, index: number) => 
                  <li key={`${category}_${index}`}>
                    <Link href={`/category/${category}`}>{category}</Link>
                  </li>
                )
              }
              <li className={styles.cartLinkContainer}>
                <Link href={'/cart'}>
                  Cart
                  <Cart width={30} height={30} />
                </Link>
              </li>
            </ul> 
          ) : null
        }
      </nav>
    </div>
  );
}
