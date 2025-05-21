// 이슈글 - 인기 게시글 카드 

import Image from "next/image";
import { useEffect } from 'react';
import { useProd } from '@hooks/useCardPosts';
import usePageData from '@components/page/home/hooks/usePosts';
import CardBox from "@components/_utiles/card/CardBox.component";
import styles from "./IssueCard.module.scss";

interface HomeProps {
  type: 'company' | 'member';
  condition?: 'WEEK' | 'MONTH';
}
export default function IssuCardComponent({ type, condition }: HomeProps) {

  const { posts } = usePageData(type, condition ?? "WEEK");
  const { initAllProd, allProdList } = useProd();

  useEffect(() => {
    if (posts && posts.length > 0) {
      const converted = {
        elements: posts
      };
      initAllProd(converted);
    }
  }, [posts, initAllProd]);

  const issuData = allProdList.elements

  return (
    <ul className={`${styles.card_container} ${styles.issue_card_container}`}>
      {issuData && issuData.length > 0 ? (
        <div className={styles.card_list}>
          {issuData.slice(0, 5).map((item) => (
            < CardBox
              key={item.id}
              url={
                item.isCompany === true
                  ? `/post/view/${item.id}?type=company`
                  : item.isCompany === false
                    ? `/post/view/${item.id}?type=member`
                    : `/post/view/${item.id}`
              }
              imageSrc={item.thumbnailImageUrl ?? '/images/logo.png'}
              isNew={true}
              isHot={true}
              title={item.title}
              languages={item?.skills}
              writer={item.author?.name}
              writerImg={item.author?.imageUrl}
              views={item.viewCount}
              date={new Date(item.createdAt).toLocaleDateString("ko-KR")}
            />
          ))}
        </div>
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