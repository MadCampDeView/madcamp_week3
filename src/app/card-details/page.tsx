'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '@/styles/CardDetail.module.css';
import InteractiveTitle from '@/components/InteractiveTitle';
import InteractiveDescription from '@/components/InteractiveDescription';
import ThreeDCocktailGlass from '@/components/ThreeDCocktailGlass'; // Import the 3D model component

const CardDetailsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  const title = name ? decodeURIComponent(name) : 'Title 1';

  const [cocktailData, setCocktailData] = useState<any | null>(null);

  useEffect(() => {
    const fetchCocktailData = async () => {
      try {
        const response = await fetch('/data/cocktails.json');
        const data = await response.json();

        // Find the cocktail data based on the title
        for (const category of data) {
          for (const cocktail of category.cocktails) {
            if (cocktail.name === title) {
              setCocktailData({
                family: category.category,
                description: cocktail.description,
                ingredients: cocktail.recipe.ingredients,
                recipe: cocktail.recipe.steps,
                glassPath: cocktail.glass_path
              });
              return;
            }
          }
        }
      } catch (error) {
        console.error('Error fetching cocktail data:', error);
      }
    };

    fetchCocktailData();
  }, [title]);

  if (!cocktailData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.container}`} style={{ backgroundColor: '#212529' }}>
      <div className={styles.cocktailContainer}>
        {/* Render the 3D model using the glass path from the cocktail data */}
        <ThreeDCocktailGlass modelPath={cocktailData.glassPath} />
      </div>
      <div className={`${styles.content}`}>
        <div className={styles.titleWrapper}>
          <InteractiveTitle
            title={title}
          />
        </div>
        <div className={styles.descriptionWrapper}>
          <InteractiveDescription
            cocktailFamily={cocktailData.family}
            cocktailDescr={cocktailData.description}
            ingredients={cocktailData.ingredients}
            recipeDescr={cocktailData.recipe}
          />
        </div>
      </div>
    </div>
  );
};

export default CardDetailsPage;
