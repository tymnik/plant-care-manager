import { useState, useEffect } from 'react';

import Button from '../Button';
import Input from '../Input';
import Icon from '../Icon';

import style from './index.module.scss'

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    onClose: () => void;
    debounceDelay?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", onSearch, onClose, debounceDelay = 300 }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [debouncedValue, setDebouncedValue] = useState<string>(inputValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, debounceDelay);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, debounceDelay]);

    useEffect(() => {
        onSearch(debouncedValue);
    }, [debouncedValue, onSearch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSearchSubmit = () => {
        onSearch(inputValue);
        onClose();
    };

    return (
        <div className={style.searchBar}>
            <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                className={style.searchBar__input}
            />
            <Button
                type="button"
                variant='icon'
                onClick={handleSearchSubmit}
                className={style.searchButton}
                icon={<Icon id='search' className={style.searchButton__icon} />}
            />
        </div>
    );
};

export default SearchBar;
