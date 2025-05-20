// "use client";

import Image from "next/image";
import { useState } from "react";
import CardBox from "@components/_utiles/card/CardBox.component";
import Pagination from "@components/_utiles/pagination/pagination.component";
import styles from "./AllCard.module.scss";

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
    isCompany: boolean;
}

interface PostListProps {
    data: Post[];
    itemsPerPage?: number;
}

export default function AllCardcomponent({
    data,
    itemsPerPage = 20,
}: PostListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Array.isArray(data)
        ? data.slice(indexOfFirstItem, indexOfLastItem)
        : [];
    const items = Array.isArray(data) ? data.length : 0;

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    console.log(currentItems)

    return (
        <>
            <div className={styles.bookmark_card_container}>
                <ul className={styles.card_list}>
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
                                type={item.isCompany}
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
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(items / itemsPerPage)}
                onPageChange={paginate}
            />
        </>
    );
}
