import style from './index.module.scss'

const WelcomePage = () => {
  return (
    <>
      <div className={style.wp_hero} >
          <h1 className={style.wp_hero__heading}>Welcome to <br /><span className={style.wp_hero__headingOrange}>Plant Care Manager</span></h1>
          <p className={style.wp_hero__text}>Your Personal Assistant for Plant Care</p>
      </div>
      <div className={style.wpContainer}>

      </div>
    </>
  )
}

export default WelcomePage