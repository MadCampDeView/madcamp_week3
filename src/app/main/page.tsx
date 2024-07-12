import React from 'react';
import styles from '../../styles/MainPage.module.css';
import InteractiveCard from '../../components/InteractiveCard'; // Adjust the path as necessary

const MainPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerItem}></div>
        <div className={styles.headerTitle}>추천 프로젝트</div>
        <div className={styles.headerProfile}>프로필</div>
      </div>
      <div className={styles.content}>
        <InteractiveCard className={styles.sidePanel} hitboxClass={styles.sideHitbox} />
        <InteractiveCard className={styles.mainPanel} hitboxClass={styles.mainHitbox} />
        <InteractiveCard className={styles.sidePanel} hitboxClass={styles.sideHitbox} />
      </div>
    </div>
  );
};

export default MainPage;
