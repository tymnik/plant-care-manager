import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPlantsThunk } from '../../store/plant/thunks';
import { AppDispatch } from '../../store/store';
import { selectPlants } from '../../store/plant/selectors';
import { Plant } from '../../types';
import { wikiGuide, abc } from '../../mock';
import SideMenu from './SideMenu';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';

import style from './index.module.scss';

const EncyclopediaPageContent = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [query, setQuery] = useState<string>('');
    const [showAsideMenu, setShowAsideMenu] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();
    const plants = useSelector(selectPlants);

    useEffect(() => {
        dispatch(fetchPlantsThunk());
    }, [dispatch]);

    const handleTextShown = (index: number) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleScroll = () => {
        const isScrolledPastAlphabet = window.scrollY > 100;
        setShowAsideMenu(isScrolledPastAlphabet);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const filteredPlants = selectedFilters.length
        ? plants.filter((plant) => {
            return selectedFilters.every((filterKey) => {
                if (filterKey === 'outdoor') {
                    return !plant.indoor;
                }
                return plant[filterKey as keyof Plant];
            });
        })
        : plants;

    const plantsToDisplay = query
        ? filteredPlants.filter((plant) =>
            plant.name.toLowerCase().includes(query.toLowerCase())
        )
        : filteredPlants;

    const handleFilterChange = (filters: string[]) => {
        setSelectedFilters(filters);
    };

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);
    };

    const handleRefresh = () => {
        setQuery('');
        setSelectedFilters([]);
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

            {abc.map((letter, index) => {
                const plantsInSection = plantsToDisplay.filter(
                    (plant) => plant.name[0].toUpperCase() === letter
                );

                if (plantsInSection.length === 0) return null;

                return (
                    <section key={index} id={`section-${letter}`} className={style.epc_letterSection}>
                        <h2 className={style.epc_letterSection__title}>{letter}</h2>
                        <ul className={style.epc_plantList}>
                            {plantsInSection.map((plant, plantIndex) => (
                                <li key={plantIndex} className={style.epc_plantList__plantCard}>
                                    <img src={plant.images[0]} alt={plant.name} className={style.epc_plantList__plantCard__image} />
                                    <div className={style.epc_plantList__plantCard__info}>
                                        <div className={style.epc_plantList__plantCard__info__wrapper}>
                                            <h3 className={style.epc_plantList__plantCard__info__name}>{plant.name}</h3>
                                            <Button type="button" variant="icon" icon={<Icon id={'add-to-favorite'} className={style.epc_plantList__plantCard__info__heart} />} />
                                        </div>
                                        <div className={style.epc_plantList__plantCard__info__hidden}>
                                            <div>
                                                <p>Other names: <span>{plant.otherNames}</span></p>
                                                <p>Growth rate: <span>{plant.growthRate}</span></p>
                                                <p>Care level: <span>{plant.careLevel}</span></p>
                                                <p>Rare level: <span>{plant.rareLevel}</span></p>
                                            </div>
                                            <Button type='button' variant='ghost' className={style.epc_plantList__plantCard__info__hidden__cardButton}>More details</Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                );
            })}

            {showAsideMenu && (
                <SideMenu
                    onSearch={handleSearch}
                    onRefresh={handleRefresh}
                    onFilterChange={handleFilterChange}
                    selectedFilters={selectedFilters}
                />
            )}
        </>
    );
};

export default EncyclopediaPageContent;
