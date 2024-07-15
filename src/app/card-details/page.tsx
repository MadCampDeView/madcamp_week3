'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '@/styles/CardDetail.module.css';
import InteractiveDescription from '@/components/InteractiveDescription';

const CardDetailsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  const title = name ? decodeURIComponent(name) : 'Title. Title.';
  const description = 'This is the front content.';
  const additionalContent = 'This is the back content.';

  return (
    <div className={styles.container}>
      <div className={styles.imageContentWrapper}>
        <div className={styles.imageContainer}>
          <img src="/images/image.png" alt="Cocktail" className={styles.image} />
        </div>
        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>
              {name ? decodeURIComponent(name as string) : 'Title. Title.'}
            </h1>
          </div>
          <InteractiveDescription
            description={description}
            additionalContent={additionalContent}
            color="#7DF9FF"
          />
        </div>
      </div>
    </div>
  );
};

export default CardDetailsPage;
