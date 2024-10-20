import { useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch } from '../../../hooks';
import { ROUTES } from '../../../constants'
import { LoginPropsType, loginSchema } from '../../../schemas'
import { login } from '../../../store/user/thunks';
import Input from '../../../ui/Input'
import Button from '../../../ui/Button'
import Icon from '../../../ui/Icon';

import style from '../SignUpForm/index.module.scss'

const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginPropsType>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginPropsType> = async (data) => {
    await dispatch(login(data)).unwrap();

    navigate(ROUTES.DASHBOARD);
    reset();
  };

  return (
    <section className={style.formWrapper}>
      <form className={style.su_form} onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder='Email' {...formRegister('email')} error={errors.email?.message} />
        <Input placeholder='Password' {...formRegister('password')} error={errors.password?.message} type={isShowPassword ? 'text' : 'password'} icon={
          <Icon
            id={isShowPassword ? 'eye-closed' : 'eye-open'}
            onClick={() => {
              setIsShowPassword((p) => !p);
            }}
            className={style.su_form__eyeIcon} />
        } />
        <Button type="submit" variant='primary'>Submit</Button>
      </form>
      <div className={style.su_footer}>
        <p className={style.su_footer__text}>or</p>
        <Link to={ROUTES.SIGN_UP} className={style.su_footer__link}>sign up</Link>
      </div>
    </section>
  )
}

export default LoginForm