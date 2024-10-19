import { useEffect, useState } from 'react';

import Icon from '../../ui/Icon';

import styles from './index.module.scss';

interface ThemeToggleProps {
    onThemeChange: (newDarkTheme: boolean) => void;
    initialTheme: boolean;
}

const ThemeToggle = ({ onThemeChange, initialTheme }: ThemeToggleProps) => {
    const [darkTheme, setDarkTheme] = useState(initialTheme);

    useEffect(() => {
        document.body.setAttribute('data-theme', darkTheme ? 'dark' : 'light');
        localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
    }, [darkTheme]);

    const toggleTheme = () => {
        setDarkTheme(prev => {
            const newTheme = !prev;
            onThemeChange(newTheme);
            return newTheme;
        });
    };

    return (
        <div className={styles.toggleContainer}>
            <input
                type="checkbox"
                id="check"
                className={styles.toggle}
                checked={darkTheme}
                onChange={toggleTheme}
            />
            <Icon id={darkTheme ? 'sun' : 'moon'} className={styles.toggle__icon} />
        </div>
    );
};

export default ThemeToggle;
