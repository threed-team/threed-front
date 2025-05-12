// 이슈글 - 인기 게시글 카드 

import CardBox from "@components/_utiles/card/CardBox.component";
import styles from "./IssueCard.module.scss";

export default function IssuCardComponent() {
  return (
    <ul className={`${styles.card_container} ${styles.issue_card_container}`}>
      <CardBox
        imageSrc=""
        isNew={true}
        title="Excited to share my latest tech project! #codinglife"
        languages={['JAVA', 'SCSS']}
        writer="현대자동차"
        views={100}
        date="2023.11.06"
      />
    </ul>
  )
}