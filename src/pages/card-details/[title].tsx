import { useRouter } from 'next/router';
import styles from '@/styles/CardDetail.module.css';
import { useEffect } from 'react';

const CardDetailsPage = () => {
  const router = useRouter();
  const { title, color } = router.query;

  // Set a default color if not provided
  const bgColor = typeof color === 'string' ? color : '#7DF9FF';

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  return (
    <div className={styles.container} style={{ '--bgColor': bgColor } as React.CSSProperties}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>This is a detailed page for {title}.</p>
    </div>
  );
};

export default CardDetailsPage;
