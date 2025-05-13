// 이 파일은 '/home' 경로의 페이지 컴포넌트를 렌더링합니다.
// 실제 UI는 components/page/home 폴더에 있는 컴포넌트로 구성됩니다.

import GnbComponent from "@components/sementic/header/components/gnb.components";
import UserBtnComponent from "@components/sementic/header/components/userBtn.components";

export default function HomePage() {
  return <GnbComponent /> ;
  return <UserBtnComponent /> ;
}

