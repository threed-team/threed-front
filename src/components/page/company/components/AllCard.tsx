// 검색창 및 스킬/분야 필터 버튼 영역
import {useState} from "react";

import styles from "./AllCard.module.scss"
import CardBox from "@components/_utiles/card/CardBox.component";
import Pagination from "@components/_utiles/pagination/pagination.component";

export default function AllCardcomponent() {

    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div>
            <ul className={styles.all_card_container}>
                <CardBox
                    imageSrc="/images/logo.png"
                    isNew={true}
                    title="Excited to share my latest tech project! #codinglife"
                    languages={['JAVA', 'SCSS']}
                    writer="현대자동차"
                    views={100}
                    date="2023.11.06"
                />
            </ul>
            
            <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    )
}