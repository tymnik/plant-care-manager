import { useState, useRef } from 'react';

import Button from '../../ui/Button';
import Icon from '../../ui/Icon';
import SearchBar from '../../ui/SearchBar';
import Filter from '../../ui/Filter';
import { filterCategories } from '../../mock';
import useClickOutside from '../../hooks/useClickOutside';

import style from './index.module.scss';

interface SideMenuProps {
    onSearch: (query: string) => void;
    onRefresh: () => void;
    onFilterChange: (filters: string[]) => void;
    selectedFilters: string[];
}

const SideMenu: React.FC<SideMenuProps> = ({ onSearch, onRefresh, onFilterChange, selectedFilters }) => {
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const searchRef = useRef<HTMLDivElement | null>(null);
    const filterRef = useRef<HTMLLIElement | null>(null);

    const toggleSearchBar = () => {
        setShowSearchBar(prev => !prev);
    };

    const closeSearchBar = () => {
        setShowSearchBar(false);
    };

    useClickOutside(searchRef, closeSearchBar);

    const toggleFilters = () => {
        setShowFilters(prev => !prev);
    };

    const closeFilters = () => {
        setShowFilters(false);
    };

    useClickOutside(filterRef, closeFilters);

    return (
        <aside className={style.epc_asideMenu}>
            <ul className={style.epc_asideMenu__list}>
                <li className={style.epc_asideMenu__list__item}>
                    {showSearchBar ? (
                        <div ref={searchRef} className={style.searchWrapper}>
                            <SearchBar
                                placeholder="Search plants..."
                                onSearch={onSearch}
                                debounceDelay={500}
                                onClose={closeSearchBar}
                            />
                        </div>
                    ) : (
                        <Button
                            type="button"
                            variant='icon'
                            onClick={toggleSearchBar}
                            icon={<Icon id='search' className={style.epc_asideMenu__list__item__icon} />}
                        />
                    )}
                </li>
                <li className={style.epc_asideMenu__list__item}>
                    <Button
                        type="button"
                        variant='icon'
                        onClick={onRefresh}
                        icon={<Icon id='refresh' className={style.epc_asideMenu__list__item__icon} />}
                    />
                </li>
                <li className={style.epc_asideMenu__list__item} ref={filterRef}>
                    {showFilters && (
                        <div className={style.filtersWrapper}>
                            <Filter
                                categories={filterCategories}
                                onFilterChange={onFilterChange}
                                selectedFilters={selectedFilters}
                            />
                        </div>
                    )}
                    <Button
                        type="button"
                        variant='icon'
                        onClick={toggleFilters}
                        icon={<Icon id='filter' className={style.epc_asideMenu__list__item__icon} />}
                    />
                </li>
            </ul>
        </aside>
    );
};

export default SideMenu;
