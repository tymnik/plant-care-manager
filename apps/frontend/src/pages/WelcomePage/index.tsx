import WelcomePageContent from '../../components/WelcomePageContent'

import style from './index.module.scss'

const WelcomePage = () => {
  return (
    <>
      <section className={style.wp_hero} >
        <h1 className={style.wp_hero__heading}>Welcome to <br /><span className={style.wp_hero__headingOrange}>Plant Care Manager</span></h1>
        <p className={style.wp_hero__text}>Your Personal Assistant for Plant Care</p>
      </section>
      <div className={style.wpContainer}>
        <WelcomePageContent />
        <p className={style.wp_text}>&#169; 2024 Plant Care Manager. All rights reserved.</p>
      </div>
     
    </>
  )
}

export default WelcomePage