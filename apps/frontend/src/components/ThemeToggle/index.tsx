import { useState, useEffect } from 'react';

import styles from './index.module.scss';


interface ThemeToggleProps {
    onThemeChange: (newDarkTheme: boolean) => void;
}

const ThemeToggle = ({ onThemeChange }: ThemeToggleProps) => {
    const savedTheme = localStorage.getItem('theme');
    const [darkTheme, setDarkTheme] = useState(savedTheme === 'dark');

    useEffect(() => {
        const currentTheme = savedTheme || 'light';
        document.body.setAttribute('data-theme', currentTheme);
        setDarkTheme(currentTheme === 'dark');
    }, [savedTheme]);

    const toggleTheme = () => {
        const newDarkTheme = !darkTheme;
        setDarkTheme(newDarkTheme);
        onThemeChange(newDarkTheme);
        document.body.setAttribute('data-theme', newDarkTheme ? 'dark' : 'light');
        localStorage.setItem('theme', newDarkTheme ? 'dark' : 'light');
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
        </div>
    );
};

export default ThemeToggle;
