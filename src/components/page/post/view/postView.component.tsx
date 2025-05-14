import styles from './postView.module.scss';
import ListMainLeft from './components/listMainLeft.component';
import ListMainRight from './components/listMainRight.component';

export default function ViewComponent({
    title = 'Excited to share my latest tech project! #codinglife',
}) {
    return (
        <main className={styles.inner}>
            <h2 className={styles.main_h2}>{title}</h2>
            <ul className={styles.write_list}>
                <li>
                    <ListMainLeft
                        title={title}
                        text="명상의 힘은 마음을 가라앉히고 내면의 평화를 찾는 방법을 제공합니다. 정기적인 명상은 스트레스를 줄이고 집중력을 향상시키는 데 도움이 됩니다. 다양한 명상 기법 중에서도 호흡 명상과 마음 챙김 명상이 특히 효과적입니다. 또한, 명상은 자기 인식을 높이고 감정 조절 능력을 향상시켜 전반적인 정신 건강에 긍정적인 영향을 미칩니다. 일상 속에서 꾸준히 명상을 실천하면 심리적 안정과 행복을 증진할 수 있습니다.명상의 힘은 마음을 가라앉히고 내면의 평화를 찾는 방법을 제공합니다. 정기적인 명상은 스트레스를 줄이고 집중력을 향상시키는 데 도움이 됩니다. 다양한 명상 기법 중에서도 호흡 명상과 마음 챙김 명상이 특히 효과적입니다. 또한, 명상은 자기 인식을 높이고 감정 조절 능력을 향상시켜 전반적인 정신 건강에 긍정적인 영향을 미칩니다. 일상 속에서 꾸준히 명상을 실천하면 심리적 안정과 행복을 증진할 수 있습니다."
                        date="2025년 04월 30일"
                        link="#"
                        imageSrc="/images/logo.png"
                    />
                </li>
                <li>
                    <ListMainRight write="현대자동차" views={200} hearts={200} />
                </li>
            </ul>
        </main>
    );
}
