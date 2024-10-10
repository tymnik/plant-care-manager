import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements, Route
} from 'react-router-dom';

import Layout from './components/Layout';
import { ROUTES } from './constants';

// const AddPlantPage = lazy(() => import('./pages/AddPlantPage'));
// const CareSchedulePage = lazy(() => import('./pages/CareSchedulePage'));
// const DashboardPage = lazy(() => import('./pages/DashboardPage'));
// const DetailsPage = lazy(() => import('./pages/DetailsPage'));
const EncyclopediaPage = lazy(() => import('./pages/EncyclopediaPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignUpPage = lazy(() => import('./pages/SignUpPage'))
const UserSettingsPage = lazy(() => import('./pages/UserSettingsPage'));
const WelcomePage = lazy(() => import('./pages/WelcomePage'))

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path={ROUTES.WELCOME} element={<Layout />} >
          <Route path={ROUTES.WELCOME} element={<WelcomePage />} />
          <Route path={ROUTES.ENCYCLOPEDIA} element={<EncyclopediaPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
          {/* <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.ADD_PLANT} element={<AddPlantPage />} />
          <Route path={ROUTES.DETAILS} element={<DetailsPage />} />
          <Route path={ROUTES.ENCYCLOPEDIA} element={<EncyclopediaPage />} />
          <Route path={ROUTES.CARE_SCHEDULE} element={<CareSchedulePage />} /> */}
          <Route path={ROUTES.USER_SETTINGS} element={<UserSettingsPage />} />
        </Route>
      </Route>
    ))

  return router;
}

export default App