import { Link } from 'react-router-dom'

import { ROUTES } from '../../../constants'
import Input from '../../../ui/Input'
import Button from '../../../ui/Button'

import style from './index.module.scss'

const SignUpForm = () => {
  return (
    <section className={style.formWrapper}>
      <form className={style.su_form}>
        <Input placeholder='First Name' />
        <Input placeholder='Last Name' />
        <Input placeholder='Email' />
        <Input placeholder='Password' />
        <Button type="submit" variant='primary'>Submit</Button>
      </form>
      <div className={style.su_footer}>
        <p className={style.su_footer__text}>or</p>
        <Link to={ROUTES.LOGIN} className={style.su_footer__link}>login</Link>
      </div>
    </section>
  )
}

export default SignUpForm