import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectIsLoggedIn } from '../src/store/user/selectors';

import { ROUTES } from '../src/constants';

interface PrivateRouteProps {
    children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return isLoggedIn ? children : <Navigate to={ROUTES.LOGIN} />;
}
