import type { Product as ProductType} from  '../product/product'
import Product from '../product/product';

import styles from './products.module.css';

type ProductsProps = {
  products: ProductType[]
}

export default async function Products({ products }: ProductsProps ) {
  return (
    <div className={styles.productsContainer}>
      {
        products.map((product: ProductType, index: number) => (
          <Product key={`${product.id}_${index}`} product={product} />
        ))
      }
    </div>
  )
}