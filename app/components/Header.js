import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={100} height={40} />
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/shop" className={styles.navLink}>SHOP</Link>
        <Link href="/skills" className={styles.navLink}>SKILLS</Link>
        <Link href="/stories" className={styles.navLink}>STORIES</Link>
        <Link href="/about" className={styles.navLink}>ABOUT</Link>
        <Link href="/contact" className={styles.navLink}>CONTACT US</Link>
      </nav>
      <div className={styles.actions}>
        <button className={styles.iconButton}>
          <Image src="/search.svg" alt="Search" width={20} height={20} />
        </button>
        <button className={styles.iconButton}>
          <Image src="/wishlist.svg" alt="Wishlist" width={20} height={20} />
        </button>
        <button className={styles.iconButton}>
          <Image src="/cart.svg" alt="Cart" width={20} height={20} />
        </button>
        <button className={styles.iconButton}>
          <Image src="/user.svg" alt="User" width={20} height={20} />
        </button>
        <select className={styles.language}>
          <option value="en">ENG</option>
        </select>
      </div>
    </header>
  );
} 