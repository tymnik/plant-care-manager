import { Link } from 'react-router-dom'

import { advantages, choiceItems } from '../../mock'
import { ROUTES } from '../../constants'
import leafIcon from '../../assets/welcome-page-images/leaf.svg'

import style from './index.module.scss'

const WelcomePageContent = () => {
    return (
        <section className={style.wpc}>
            <ul className={style.wpc_advantages}>
                {advantages.map((text, index) => (
                    <li key={index} className={style.wpc_advantages__item}>
                        <img src={leafIcon} className={style.wpc_advantages__item__icon} />
                        <p className={style.wpc_advantages__item__text}>{text}</p>
                    </li>
                ))}
            </ul>
            <h2 className={style.wpc__heading}>Why Choose Us</h2>
            <ul className={style.wpc_choiceList}>
                {choiceItems.map((item, index) => (
                    <li key={index} className={style.wpc_choiceList__item}>
                        <div className={style.wpc_choiceList__item__order}>
                            <p className={style.wpc_choiceList__item__order__number}>{item.order}</p>
                        </div>
                        <p className={style.wpc_choiceList__item__text}>{item.text}</p>
                    </li>
                ))}
            </ul>
            <h2 className={style.wpc__heading}>Get Started Now!</h2>
            <div className={style.wpc_nav}>
                <Link to={ROUTES.SIGN_UP} className={style.wpc_nav__signButton}>Sign Up</Link>
                <span className={style.wpc_nav__text}>or</span>
                <Link to={ROUTES.LOGIN} className={style.wpc_nav__loginButton}>Log In</Link>
            </div>
        </section >
    )
}

export default WelcomePageContent