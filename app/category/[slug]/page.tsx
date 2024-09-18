import Products from '../../components/products/products';

import styles from './page.module.css';

type CategoryProps = {
  params: {
    slug: string
  }
}

export default async function Page({ params: { slug }}: CategoryProps ) {
  const API_URL = process.env.API_URL;
  const data = await fetch(`${API_URL}/products/category/${slug}`)
  const products = await data.json();

  return (
    <div className={styles.categoryContainer}>
      <header>
        <h1>Category: <b>{decodeURIComponent(slug)}</b> </h1>
        <h3>Amount of products in this category: <b>{products.length}</b></h3>
        <h3>Products:</h3>
      </header>
      <Products products={products} />
    </div>
  )
}