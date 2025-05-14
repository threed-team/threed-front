import { useState } from "react";
import styles from "./AllCard.module.scss"
// import CardBox from "@components/_utiles/card/CardBox.component";
import Pagination from "@components/_utiles/pagination/pagination.component";

export default function AllCardcomponent({ data }) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div>
            <ul className={styles.bookmark_card_container}>
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <p key={item.id}>{item.title}</p>
                        // 또는 실제 CardBox 컴포넌트
                        // <CardBox
                        //     key={item.id}
                        //     imageSrc="/images/logo.png"
                        //     isNew={true}
                        //     title={item.title}
                        //     languages={['JAVA', 'SCSS']}
                        //     writer={`작성자: ${item.userId}`}
                        //     views={100}
                        //     date="2023.11.06"
                        // />
                    ))
                ) : (
                    <p>데이터가 없습니다.</p>
                )}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}
