'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '@/styles/CardDetail.module.css';
import InteractiveDescription from '@/components/InteractiveDescription';
import ThreeDCocktailGlass from '@/components/ThreeDCocktailGlass'; // Import the 3D model component

const CardDetailsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  const title1 = name ? decodeURIComponent(name) : 'Title 1';
  const title2 = 'Title 2';

  const [currentTitle, setCurrentTitle] = useState(title1);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);

    const interval = setInterval(() => {
      setCurrentTitle(prevTitle => (prevTitle === title1 ? title2 : title1));
    }, 4000); // Change title every 4 seconds

    return () => clearInterval(interval);
  }, [title1, title2]);

  return (
    <div className={`${styles.container} ${animate ? styles.animateContainer : ''}`}>
      <div className={styles.imageContentWrapper}>
        <div className={`${styles.cocktailContainer} ${animate ? styles.animateCocktail : ''}`}>
          {/* Replace the image with the 3D model */}
          <ThreeDCocktailGlass />
        </div>
        <div className={`${styles.content} ${animate ? styles.animateContent : ''}`}>
          <div className={styles.titleWrapper}>
            <h1 className={`${styles.title} ${animate ? styles.animateTitle : ''}`}>
              {currentTitle}
            </h1>
          </div>
          <InteractiveDescription
            description="This is the front content."
            additionalContent="This is the back content."
            color="#7DF9FF"
            className={animate ? styles.animateDescription : ''}
          />
        </div>
      </div>
    </div>
  );
};

export default CardDetailsPage;
