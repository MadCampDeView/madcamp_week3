'use client';

import Link from 'next/link';
import styles from '../styles/cocktails.module.css';

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

const CocktailCard: React.FC<{ cocktail: Cocktail }> = ({ cocktail }) => {
  return (
    <li className={styles.list}>
      <Link href={`/card-details?name=${encodeURIComponent(cocktail.name)}`}>
        <div className={styles.card}>
          <div className={styles.cardInner}>
            <div className={`${styles.cardFace} ${styles.front}`}>
              <div
                className={`${styles.rectangle} ${styles[cocktail.color]}`}
              ></div>
            </div>
            <div className={`${styles.cardFace} ${styles.back}`}>
              <img
                src={`/images/${cocktail.name}.png`}
                className={styles.cocktailImage}
                alt={cocktail.name}
              />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default CocktailCard;