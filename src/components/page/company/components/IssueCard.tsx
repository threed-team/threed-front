// 이슈글 - 인기 게시글 카드 

import Image from "next/image";
import CardBox from "@components/_utiles/card/CardBox.component";
import styles from "./IssueCard.module.scss";

interface Post {
  id: number;
  title: string;
  thumbnailImageUrl: string;
  field: string[];
  viewCount: number;
  author: {
    name: string;
    imageUrl: string;
  };
  skills: string[];
  createdAt: string;
}
interface PostListProps {
  data: Post[];
}

export default function IssuCardComponent(data: PostListProps) {

  const currentItems = Array.isArray(data)


  return (
    <ul className={`${styles.card_container} ${styles.issue_card_container}`}>
      {currentItems && currentItems.length > 0 ? (
        currentItems.map((item) => (
          <CardBox
            key={item.id}
            url={`/post/view/${item.id}`}
            imageSrc={item.thumbnailImageUrl}
            isNew={true}
            isHot={true}
            title={item.title}
            languages={item?.skills}
            writer={item.author?.name}
            writerImg={item.author?.imageUrl}
            views={item.viewCount}
            date={new Date(item.createdAt).toLocaleDateString("ko-KR")}
          />
        ))
      ) : (
        <div className={styles.card_no_Data}>
          <Image
            src={'/images/ico_warning.png'}
            width={50}
            height={50}
            alt="warning"
          />
          <p className={styles.warning_text}>데이터가 없습니다</p>
        </div>
      )}
    </ul>
  )
}