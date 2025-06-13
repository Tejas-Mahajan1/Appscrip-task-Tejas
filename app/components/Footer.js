'use client';
import styles from './Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className={styles.footer}>
      <div className={styles.topRow}>
        <div className={styles.subscribeCol}>
          <div className={styles.subscribeTitle}>BE THE FIRST TO KNOW</div>
          <div className={styles.subscribeDesc}>Sign up for updates from mettā muse.</div>
          <form className={styles.subscribeForm} onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your e-mail..."
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={styles.emailInput}
            />
            <button className={styles.subscribeBtn}>SUBSCRIBE</button>
          </form>
        </div>
        <div className={styles.contactCol}>
          <div className={styles.contactTitle}>CONTACT US</div>
          <div className={styles.contactText}>+44 221 133 5360</div>
          <div className={styles.contactText}>customercare@mettamuse.com</div>
          <div className={styles.currencyBlock}>
            <div className={styles.currencyTitle}>CURRENCY</div>
            <div className={styles.currencyRow}>
              <Image src="/USA.png" alt="USD" width={24} height={24} />
              <span className={styles.currencyText}>USD</span>
            </div>
            <div className={styles.currencyNote}>
              Transactions will be completed in Euros and a currency reference is available on hover.
            </div>
          </div>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.bottomRow}>
        <div className={styles.bottomCol}>
          <div className={styles.bottomHeading}>mettā muse</div>
          <ul className={styles.linkList}>
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Stories</Link></li>
            <li><Link href="#">Artisans</Link></li>
            <li><Link href="#">Boutiques</Link></li>
            <li><Link href="#">Contact Us</Link></li>
            <li><Link href="#">EU Compliances Docs</Link></li>
          </ul>
        </div>
        <div className={styles.bottomCol}>
          <div className={styles.bottomHeading}>QUICK LINKS</div>
          <ul className={styles.linkList}>
            <li><Link href="#">Orders & Shipping</Link></li>
            <li><Link href="#">Join/Login as a Seller</Link></li>
            <li><Link href="#">Payment & Pricing</Link></li>
            <li><Link href="#">Return & Refunds</Link></li>
            <li><Link href="#">FAQs</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div className={styles.bottomCol}>
          <div className={styles.bottomHeading}>FOLLOW US</div>
          <div className={styles.socialRow}>
            <Link href="#"><Image src="/insta.png" alt="Instagram" width={32} height={32} /></Link>
            <Link href="#"><Image src="/linked.png" alt="LinkedIn" width={32} height={32} /></Link>
          </div>
          <div className={styles.acceptsBlock}>
            <div className={styles.acceptsHeading}>mettā muse ACCEPTS</div>
            <div className={styles.paymentsRow}>
              <Image src="/gpay.png" alt="Google Pay" width={56} height={36} />
              <Image src="/master.png" alt="Mastercard" width={56} height={36} />
              <Image src="/paypal.png" alt="PayPal" width={56} height={36} />
              <Image src="/amex.png" alt="Amex" width={56} height={36} />
              <Image src="/apple-pay.png" alt="Apple Pay" width={56} height={36} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        Copyright © 2023 mettamuse. All rights reserved.
      </div>
    </footer>
  );
}