import Products from "./components/products/products";

export default async function Home() {
  const API_URL = process.env.API_URL;
  const data = await fetch(`${API_URL}/products`)
  const products = await data.json();

  return (
    <Products products={products} />
  );
}
