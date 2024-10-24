import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPlantsThunk } from '../../store/plant/thunks';
import { wikiGuide, abc, plantsData } from '../../mock'

import style from './index.module.scss'
import { AppDispatch } from '../../store/store';
import { selectPlants } from '../../store/plant/selectors';

const EncyclopediaPageContent = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    const plants = useSelector(selectPlants);
    
    useEffect(() => {
        dispatch(fetchPlantsThunk());
    }, [dispatch]);
    const handleTextShown = (index: number) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <>
            <section className={style.epc_guideWrapper}>
                <div className={style.epc_guide}>
                    <h2 className={style.epc_guide__title}>How to Use the Plant Encyclopedia</h2>
                    <ul className={style.guideList}>
                        {wikiGuide.map((item, index) => (
                            <li key={index} className={style.guideList__item}>
                                <h3 className={style.guideList__item__heading} onClick={() => handleTextShown(index)}>{item.heading}</h3>
                                {expandedIndex === index && <p className={style.guideList__item__description}>{item.description}</p>}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section className={style.epc_alphabeticalSearch}>
                <ul className={style.epc_alphabeticalSearch__navList}>
                    {abc.map((letter, index) => (
                        <li key={index} className={style.epc_alphabeticalSearch__navList__item}>
                            <a href={`#section-${letter}`} className={style.epc_alphabeticalSearch__link}>{letter}</a>
                        </li>
                    ))}
                </ul>
            </section>
            {abc.map((letter, index) => (
                <section key={index} id={`section-${letter}`} className={style.epc_letterSection}>
                    <h2 className={style.epc_letterSection__title}>{letter}</h2>
                    <ul className={style.epc_plantList}>
                        {/* {plantsData
                            .filter((plant) => plant.name[0].toUpperCase() === letter)
                            .map((plant, plantIndex) => (
                                <li key={plantIndex} className={style.epc_plantCard}>
                                    <img src={plant.image} alt={plant.name} className={style.epc_plantCard__image} />
                                    <h3 className={style.epc_plantCard__name}>{plant.name}</h3>
                                    <p className={style.epc_plantCard__description}>{plant.description}</p>
                                </li>
                            ))} */}
                        {plants
                            .filter((plant) => plant.name[0].toUpperCase() === letter)
                            .map((plant, plantIndex) => (
                                <li key={plantIndex} className={style.epc_plantCard}>
                                    <img src={plant.images[0]} alt={plant.name} className={style.epc_plantCard__image} />
                                    <h3 className={style.epc_plantCard__name}>{plant.name}</h3>
                                    <p className={style.epc_plantCard__description}>{plant.description}</p>
                                </li>
                            ))}

                    </ul>
                </section>
            ))}
        </>
    )
}

export default EncyclopediaPageContent