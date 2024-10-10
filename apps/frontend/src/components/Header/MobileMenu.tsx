import { NavLink } from 'react-router-dom'

import { ROUTES } from '../../constants'

import style from './index.module.scss'

interface MobileMenuProps {
    closeMenu: () => void;
}

const MobileMenu = ({ closeMenu }: MobileMenuProps) => {
    return (
        <div className={style.mobMenu_wrapper}>
            <ul className={style.mobMenu}>
                <li className={style.mobMenu__item} onClick={closeMenu}> <NavLink to={ROUTES.ENCYCLOPEDIA}>Encyclopedia</NavLink></li>
                <li className={style.mobMenu__item} onClick={closeMenu}> <NavLink to={ROUTES.DASHBOARD}>Own Collection</NavLink></li>
            </ul>
        </div>
    )
}

export default MobileMenu