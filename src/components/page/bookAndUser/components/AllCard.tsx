import { useState } from "react";
import styles from "./AllCard.module.scss"
import CardBox from "@components/_utiles/card/CardBox.component";
import Pagination from "@components/_utiles/pagination/pagination.component";

interface PostListProps {
    data
    itemsPerPage?: number;
}

export default function AllCardcomponent({ data, itemsPerPage = 20 }: PostListProps) {

    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage; // 20
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 0
    const currentItems = Array.isArray(data) ? data.slice(indexOfFirstItem, indexOfLastItem) : []; // (0, 20)
    const items = Array.isArray(data) ? data.length : [];
    console.log(items) //200

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className={styles.bookmark_card_container}>
            <ul className={styles.card_list}>
                {currentItems && currentItems.length > 0 ? (
                    currentItems.map((item) => (
                        <CardBox
                            key={item.id}
                            imageSrc="/images/logo.png"
                            isNew={true}
                            title={item.title}
                            languages={['JAVA', 'SCSS']}
                            writer={`작성자: 홍길동`}
                            views={100}
                            date="2023.11.06"
                        />
                    ))
                ) : (
                    <p>데이터가 없습니다.</p>
                )}
            </ul>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(Number(items) / itemsPerPage)}
                onPageChange={paginate}
            />
        </div>
    );
};