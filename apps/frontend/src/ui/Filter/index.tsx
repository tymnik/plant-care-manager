import style from './index.module.scss';

interface FilterProps {
    categories: { label: string, key: string }[];
    onFilterChange: (selectedFilters: string[]) => void;
    selectedFilters: string[];
}

const Filter: React.FC<FilterProps> = ({ categories, onFilterChange, selectedFilters }) => {

    const handleCheckboxChange = (value: string) => {
        const isSelected = selectedFilters.includes(value);
        const updatedSelection = isSelected
            ? selectedFilters.filter((item) => item !== value)
            : [...selectedFilters, value];

        onFilterChange(updatedSelection); 
    };

    return (
        <div className={style.filterContainer}>
            {categories.map((category) => (
                <div key={category.key} className={style.filter}>
                    <input
                        id={`checkbox-${category.key}`}
                        type="checkbox"
                        value={category.key}
                        checked={selectedFilters.includes(category.key)} 
                        onChange={() => handleCheckboxChange(category.key)}
                        className={style.filter__checkbox}
                    />
                    <label
                        className={style.filter__label}
                        htmlFor={`checkbox-${category.key}`}
                    />
                    <p className={style.filter__name}> {category.label}</p>
                </div>
            ))}
        </div>
    );
};

export default Filter;
