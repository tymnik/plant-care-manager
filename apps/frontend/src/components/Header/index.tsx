import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '../../constants/routes'
import Icon from '../../ui/Icon'
import ThemeToggle from '../ThemeToggle'

import style from './index.module.scss'


const Header = () => {
    const [darkTheme, setDarkTheme] = useState(false);

    const handleThemeChange = (newDarkTheme: boolean) => {
        setDarkTheme(newDarkTheme);
    };

    return (
        <div className={style.headerWrapper}>
            <div className={style.header}>
                <div className={style.header__menuWrapper}>
                    <Link to={ROUTES.WELCOME}><Icon id="logo" className={style.header__logo} /></Link>
                    <ul className={style.header__menu}>
                        <li className={style.header__menu__item}> <Link to={ROUTES.ENCYCLOPEDIA}>Encyclopedia</Link></li>
                        <li className={style.header__menu__item}> <Link to={ROUTES.DASHBOARD}>Own Collection</Link></li>
                    </ul>
                </div>
                <div className={style.header__settingsWrapper}>
                    <Link to={ROUTES.USER_SETTINGS}><Icon id="user-settings" className={style.header__icon} /></Link>
                    <ThemeToggle onThemeChange={handleThemeChange} />
                </div>
            </div>
        </div>
    )
}

export default Header