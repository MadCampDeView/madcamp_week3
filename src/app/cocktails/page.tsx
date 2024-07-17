'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import styles from '@/styles/Cocktails.module.css';
import { checkIsInViewport } from '@/utils/viewport';
import CocktailPage from '@/components/CocktailPage';

type Ingredient = {
  name: string;
  amount: string;
};

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

type Category = {
  category: string;
  cocktails: Cocktail[];
};

const CocktailList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const outerContainerRef = useRef<HTMLDivElement | null>(null);
  const rectanglesRef = useRef<HTMLDivElement[]>([]);
  const [showContent, setShowContent] = useState(false);
  const scrollAmount = 75; // Adjust scroll amount as needed

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/cocktails.json');
      const data: Category[] = await response.json();
      setCategories(data); // Load all categories
    };
    fetchData();

    const handleWheel = (event: WheelEvent) => {
      if (containerRef.current) {
        event.preventDefault(); // Prevent default vertical scrolling
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        containerRef.current.scrollLeft +=
          event.deltaY > 0 ? scrollAmount : -scrollAmount;
      }
    };

    const currentContainer = containerRef.current;
    currentContainer?.addEventListener('wheel', handleWheel, {
      passive: false,
    });

    return () => {
      currentContainer?.removeEventListener('wheel', handleWheel);
    };
  }, [scrollAmount]);

  const setRectanglesRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      rectanglesRef.current.push(node);
    }
  }, []);

  const handleScroll = useCallback(() => {
    rectanglesRef.current.forEach((rectangle) => {
      if (checkIsInViewport(rectangle)) {
        rectangle.classList.add(styles.visible);
      }
    });

    // Check if dummy image is in viewport and add animation class
    if (containerRef.current) {
      const dummyImage = containerRef.current.querySelector(
        `.${styles.dummyContainer} img`
      );
      if (dummyImage && checkIsInViewport(dummyImage as HTMLImageElement)) {
        dummyImage.classList.add(styles.scale_in_center);
      }
    }
  }, []);

  useEffect(() => {
    const handleScrollEvent = () => {
      handleScroll();
    };
    containerRef.current?.addEventListener('scroll', handleScrollEvent);
    return () => {
      containerRef.current?.removeEventListener('scroll', handleScrollEvent);
    };
  }, [handleScroll]);

  return (
    <div>
      <div
        ref={outerContainerRef}
        className={`${styles.outerContainer} ${showContent ? 'show' : ''}`}
      >
        <div ref={containerRef} className={styles.scrollContainer}>
          <div className={styles.pageContent}>
            <div className={styles.textContainer}>
              <div className={styles.topBox}>
                <p className={`${styles.fadeIn} ${styles.redHatDisplayFont}`}>
                  Explore the timeless elegance of traditional cocktails.
                </p>
              </div>
              <div className={styles.bottomBox}>
                <p className={`${styles.fadeIn} ${styles.redHatDisplayFont}`}>
                  Discover the innovative flavors of contemporary mixology.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.container}>
            {categories.map((category, index) => (
              <CocktailPage
                key={index}
                cocktails={category.cocktails}
                pageIndex={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailList;