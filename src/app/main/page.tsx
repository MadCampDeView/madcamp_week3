// main/page.tsx
import Carousel from '@/components/Carousel';
import styles from '@/styles/Main.module.css';
import { TransitionProvider } from '@/components/TransitionContext';

const Main = () => {
  return (
    <TransitionProvider>
      <div className={styles.container}>
        <h1 className={styles.title}>Carousel Title</h1>
        <div className={styles.carouselWrapper}>
          <Carousel />
        </div>
        <h2 className={styles.subtitle}>Carousel Subtitle</h2>
      </div>
    </TransitionProvider>
  );
};

export default Main;
