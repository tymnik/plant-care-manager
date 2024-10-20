import { useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch } from '../../../hooks';
import { ROUTES } from '../../../constants'
import { SignUpPropsType, signupSchema } from '../../../schemas'
import { signup } from '../../../store/user/thunks';
import Input from '../../../ui/Input'
import Button from '../../../ui/Button'
import Icon from '../../../ui/Icon';

import style from './index.module.scss'

const SignUpForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpPropsType>({
    resolver: yupResolver(signupSchema),
  });
  
  const onSubmit: SubmitHandler<SignUpPropsType> = async (data) => {
    await dispatch(signup(data)).unwrap();

    navigate(ROUTES.DASHBOARD);
    reset();
  };

  return (
    <section className={style.formWrapper}>
      <form className={style.su_form} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Input placeholder='First Name' {...formRegister('firstName')}
          error={errors.firstName?.message} />
        <Input placeholder='Last Name' {...formRegister('lastName')} error={errors.lastName?.message} />
        <Input placeholder='Email'{...formRegister('email')} error={errors.email?.message} />
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
        <Link to={ROUTES.LOGIN} className={style.su_footer__link}>login</Link>
      </div>
    </section>
  )
}

export default SignUpForm