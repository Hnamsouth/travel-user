import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// no lazy loading for auth pages to avoid flickering
const AuthLayout = React.lazy(() => import('@app/components/layouts/AuthLayout/AuthLayout'));
import LoginPage from '@app/pages/LoginPage';
import SignUpPage from '@app/pages/SignUpPage';
import ForgotPasswordPage from '@app/pages/ForgotPasswordPage';
import NewPasswordPage from '@app/pages/NewPasswordPage';
import LockPage from '@app/pages/LockPage';

import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import ProfileLayout from '@app/components/profile/ProfileLayout';
import RequireAuth from '@app/components/router/RequireAuth';
import { withLoading } from '@app/hocs/withLoading.hoc';


import Vehicle from '../Travel/Home/Vehicle';
import Schedule from '../Travel/Home/Schedule';
import FindTicket from '../Travel/Home/FindTicket';
import YourProfile from '../Travel/Home/YourProfile';
import VovolAC from '../Travel/Home/Vehicles/VovolAC';
import Express from '../Travel/Home/Vehicles/Express';
import VovolnonAC from '../Travel/Home/Vehicles/VovolnonAC';
import Luxury from '../Travel/Home/Vehicles/Luxury';

const PersonalInfoPage = React.lazy(() => import('@app/pages/PersonalInfoPage'));
const SecuritySettingsPage = React.lazy(() => import('@app/pages/SecuritySettingsPage'));
const NotificationsPage = React.lazy(() => import('@app/pages/NotificationsPage'));
const PaymentsPage = React.lazy(() => import('@app/pages/PaymentsPage'));

const Logout = React.lazy(() => import('./Logout'));
const HomePage = React.lazy(() => import('@app/pages/Travel/HomePage'));
const PaymentHistoryPage = React.lazy(() => import('@app/pages/Travel/UserProfile/PaymentHistoryPage'));


export const NFT_DASHBOARD_PATH = '/';
export const MEDICAL_DASHBOARD_PATH = '/medical-dashboard';

const PersonalInfo = withLoading(PersonalInfoPage);
const SecuritySettings = withLoading(SecuritySettingsPage);
const Notifications = withLoading(NotificationsPage);
const Payments = withLoading(PaymentsPage);

const AuthLayoutFallback = withLoading(AuthLayout);
const LogoutFallback = withLoading(Logout);
const Payment = withLoading(PaymentHistoryPage);

const Home = withLoading(HomePage);

export const AppRouter: React.FC = () => {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/checkout/:id' element={<Payment />} />
          
          <Route path="vehicle" element={<Vehicle />}>
            {/* <Route path="express" element={<Express />} /> */}
            <Route path="vovolAC" element={<VovolAC />} />
            <Route path="vovolnonAC" element={<VovolnonAC />} />
            <Route path="luxury" element={<Luxury />} />
          </Route>
          <Route path="schedule" element={<Schedule />} />
          <Route path="findticket" element={<FindTicket />} />
          <Route path="yourprofile" element={<YourProfile />} />
          <Route path="express" element={<Express />} />
        </Route>


        <Route path="/user" element={protectedLayout}>
          <Route path="profile" element={<ProfileLayout />}>
            <Route path="personal-info" element={<PersonalInfo />} />
            <Route path="security-settings" element={<SecuritySettings />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
          <Route path="checkout/:id" element={<Payment />} />
        </Route>
        <Route path="/auth" element={<AuthLayoutFallback />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route
            path="lock"
            element={
              <RequireAuth>
                <LockPage />
              </RequireAuth>
            }
          />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="new-password" element={<NewPasswordPage />} />
        </Route>
        <Route path="/logout" element={<LogoutFallback />} />
      </Routes>
    </BrowserRouter>
  );
};
