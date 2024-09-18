'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import type { Category } from '../nav/nav';
import MobileNav from '../nav/mobileNav';

import Cart from '../cart/cart';

import styles from './header.module.css';   

type HeaderProps = {
  categories: Category[]
}

export default function Header({ categories }: HeaderProps ) {
  const pathname = usePathname();

  return (
    <header>
      <nav>
        <div className={styles.headerContainer}>
          {
            pathname !== '/' ? (
              <Link href="/">
                <h3><b>Go to main page</b></h3>
              </Link>
            ) : null
          }
          <div className={styles.cartContainer}>
            <Cart />
          </div>
          <div className={styles.mobileNavContainer}>
            <MobileNav categories={categories} />
          </div>
        </div>
      </nav>
    </header>
  )
}


