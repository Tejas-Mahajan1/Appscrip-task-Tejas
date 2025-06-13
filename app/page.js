import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import styles from './page.module.css';

async function getProducts() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export const metadata = {
  title: 'Discover Our Products - Your Premium Shopping Destination',
  description: 'Explore our curated collection of high-quality products. Find the perfect items for every occasion with our extensive range of customizable options.',
  openGraph: {
    title: 'Discover Our Products - Your Premium Shopping Destination',
    description: 'Explore our curated collection of high-quality products. Find the perfect items for every occasion with our extensive range of customizable options.',
    images: ['/og-image.jpg'],
  },
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Discover Our Products',
    description: 'Explore our curated collection of high-quality products.',
  },
};

export default async function Home() {
  const products = await getProducts();

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>DISCOVER OUR PRODUCTS</h1>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
            scelerisque. Dolor integer scelerisque nibh amet mi ut elementum dolor.
          </p>
        </section>

        <ProductGrid products={products} />
      </main>
    </div>
  );
}
