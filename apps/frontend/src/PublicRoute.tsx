import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../src/hooks';
import { selectIsLoggedIn } from '../src/store/user/selectors';

import { ROUTES } from '../src/constants';

interface PublicRouteProps {
    children: ReactNode;
    restricted?: boolean;
    path?: string;
}

export default function PublicRoute({
    children,
    restricted,
    path = ROUTES.WELCOME,
}: PublicRouteProps) {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    if (isLoggedIn && restricted) {
        return (
            <Navigate to={path} state={{ fromPage: window.location.pathname }} />
        );
    }

    return <>{children}</>;
}
