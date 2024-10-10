import { Suspense } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants';
import Icon from '../../ui/Icon';
import Button from '../../ui/Button';
import Loader from '../Loader';
import Header from '../Header';

import style from './index.module.scss';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const authorizationPaths = [ROUTES.SIGN_UP, ROUTES.LOGIN];
  const isCustomLayout = authorizationPaths.includes(location.pathname);

  return (
    <>
      <Suspense fallback={<Loader />}>
        {isCustomLayout ? (
          <div className={style.customContainer}>
            <Link to={ROUTES.WELCOME}>
              <Icon id="logo" className={style.logo} />
            </Link>
            <Outlet />
            <Button
              type="button"
              onClick={() => navigate(-1)}
              variant="ghost"
              icon={<Icon id="angle-left-circle" className={style.homeButton} />}
            >
              Go back
            </Button>
          </div>
        ) : (
          <>
            <Header />
            <Outlet />
          </>
        )}
      </Suspense>
    </>
  );
};

export default Layout;
