'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/intro.module.css';

const IntroPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      router.push('/main');
    }, 3000); // 3 seconds before navigating to /main

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <h1>Cocktail</h1>
        </div>
      ) : null}
    </div>
  );
};

export default IntroPage;
