// 이 파일은 '/home' 경로의 페이지 컴포넌트를 렌더링합니다.
// 실제 UI는 components/page/home 폴더에 있는 컴포넌트로 구성됩니다.

import GnbComponent from "@components/sementic/header/components/gnb.components";
import UserBtnComponent from "@components/sementic/header/components/userBtn.components";
import styles from "./header.module.scss";
import Image from "next/image";

export default function headerPageComponent() {
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={`${styles.center_area} ${styles.inner}`}>
          <a href="/main" className={styles.logo}>
            <Image 
            src="/images/main_logo.png" 
            width={100} 
            height={100} 
            alt="메인 로고" 
            />

          </a>
          <nav className={styles.gnb}>
            <GnbComponent />
            <UserBtnComponent />
          </nav>
        </div>
      </div>
    </header>
  );
}
