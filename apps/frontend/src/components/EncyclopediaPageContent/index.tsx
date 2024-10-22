import { wikiGuide } from '../../mock'

import style from './index.module.scss'

const EncyclopediaPageContent = () => {
    return (
        <>
            <section className={style.epc_guide}>
                <h2 className={style.epc_guide__title}>How to Use the Plant Encyclopedia:</h2>
                <ul className={style.guideList}>
                    {wikiGuide.map((item, index) => (
                        <li key={index} className={style.guideList__item}>
                            <h3 className={style.guideList__item__heading}>{item.heading}</h3>
                            <p className={style.guideList__item__description}>{item.description}</p>
                        </li>
                    ))}
                </ul>
                <p className={style.epc_guide__text}>Explore, learn, and enjoy your journey through the diverse and fascinating world of plants!</p>
            </section>
        </>
    )
}

export default EncyclopediaPageContent