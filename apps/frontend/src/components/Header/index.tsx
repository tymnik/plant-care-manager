import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

import Icon from '../../ui/Icon';
import ThemeToggle from '../ThemeToggle';
import MobileMenu from './MobileMenu';

import style from './index.module.scss';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [darkTheme, setDarkTheme] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });
    const bodyRef = useRef(document.body);

    useEffect(() => {
        bodyRef.current.style.overflow = isMenuOpen ? 'hidden' : 'auto';

        return () => {
            bodyRef.current.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const handleThemeChange = (newDarkTheme: boolean) => {
        setDarkTheme(newDarkTheme);
    };

    const closeMenu = () => setIsMenuOpen(false);
    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    return (
        <>
            <header className={style.headerWrapper}>
                <div className={style.header}>
                    <div className={style.header__menuWrapper}>
                        <Link to={ROUTES.WELCOME} onClick={closeMenu}>
                            <Icon id="logo" className={style.header__logo} />
                        </Link>
                        <ul className={style.header__menu}>
                            <li className={style.header__menu__item}>
                                <NavLink to={ROUTES.ENCYCLOPEDIA}>Encyclopedia</NavLink>
                            </li>
                            <li className={style.header__menu__item}>
                                <NavLink to={ROUTES.DASHBOARD}>Own Collection</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className={style.header__settingsWrapper}>
                        <NavLink to={ROUTES.USER_SETTINGS} onClick={closeMenu}>
                            <Icon id="user-settings" className={style.header__icon} />
                        </NavLink>
                        <ThemeToggle onThemeChange={handleThemeChange} initialTheme={darkTheme} />
                        <Icon id="menu" className={style.header__menuButton} onClick={toggleMenu} />
                    </div>
                </div>
            </header>
            {isMenuOpen && <MobileMenu closeMenu={closeMenu} />}
        </>
    );
};

export default Header;
