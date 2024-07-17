'use client';

import styles from '../styles/cocktails.module.css';
import CocktailCard from '@/components/CocktailCard';

type Cocktail = {
  name: string;
  description: string;
  recipe: {
    ingredients: string[];
    steps: string[];
  };
  color: string;
  recommended: boolean;
  glass_path: string;
};

const CocktailPage: React.FC<{ cocktails: Cocktail[]; pageIndex: number }> = ({
  cocktails,
  pageIndex,
}) => {
  const getImagePath = (index: number) => {
    switch (index) {
      case 0:
        return '/images/Classic Cocktails.png';
      case 1:
        return '/images/Tropical Cocktails.png';
      case 2:
        return '/images/Modern Cocktails.png';
      case 3:
        return '/images/Additional Recommended Cocktails.png';
      default:
        return '';
    }
  };

  return (
    <div
      className={`${styles.page} ${
        pageIndex === 0
          ? styles.page1
          : pageIndex === 1
          ? styles.page2
          : pageIndex === 2
          ? styles.page3
          : styles.page4
      }`}
    >
      {pageIndex === 0 && (
        <div className={styles.verticalTextContainer}>
          <div className={styles.verticalTextContent}>
            <div className={styles.verticalText}>Cocktails&nbsp;</div>
            <div className={styles.verticalText}>Cocktails&nbsp;</div>
            <div className={styles.verticalText}>Cocktails&nbsp;</div>
            <div className={styles.verticalText}>Cocktails&nbsp;</div>
          </div>
        </div>
      )}
      <ul className={styles.listWrapper}>
        <li className={styles.dummyContainer}>
          <img
            src={getImagePath(pageIndex)}
            className={styles.scale_in_center}
            alt="dummy"
          />
        </li>
        {cocktails.map((cocktail, index) => (
          <CocktailCard key={index} cocktail={cocktail} />
        ))}
      </ul>
    </div>
  );
};

export default CocktailPage;