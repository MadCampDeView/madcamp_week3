// main/page.tsx
import Carousel from '@/components/Carousel';
import styles from '@/styles/Main.module.css';
import { TransitionProvider } from '@/components/TransitionContext';
import Link from 'next/link';

const Main = () => {
  return (
    <TransitionProvider>
      <div className={styles.container}>
        {/* <h1 className={styles.title}>Recommended Cocktails</h1> */}
        <div className={styles.carouselWrapper}>
          <Carousel />
        </div>
        <Link href="/cocktails">
          <button className={styles.button}>Go to Cocktails</button>
        </Link>
      </div>
    </TransitionProvider>
  );
};

export default Main;
