import Link from 'next/link'

import styles from './nav.module.css';

export type Category = string;

export type NavProps = {
  categories: Category[]
}

export default async function Nav({ categories }: NavProps) {
  return (
    <div className={styles.nav}>
      <nav>
        <h2>Categories:</h2>
        <ul>
          {
            categories.map((category: Category, index: number) => 
              <li key={`${category}_${index}`}>
                <Link href={`/category/${category}`}>{category}</Link>
              </li>
            )
          }
        </ul>
      </nav>
    </div>
  );
}
